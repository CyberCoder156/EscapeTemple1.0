// Script to verify all 6 gameplay bug fixes
const http = require('http');

function api(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('==================================================');
  console.log('ESCAPETEMPLE GAMEPLAY BUG FIXES VERIFICATION');
  console.log('==================================================\n');

  let passedCount = 0;
  let totalTests = 0;

  function assert(condition, testName, details = '') {
    totalTests++;
    if (condition) {
      console.log(`[PASS] ${testName}`);
      passedCount++;
    } else {
      console.error(`[FAIL] ${testName}`);
      if (details) console.error(`       Details: ${details}`);
    }
  }

  // --- TEST SUITE 1: BUG 1, 2, 5 - LEVEL VALIDATION ---
  console.log('--- TEST SUITE 1: Level Validation (Bugs 1, 2, 5) ---');
  const valRes = await api('GET', '/api/levels/validate-all');
  assert(valRes.status === 200, 'GET /api/levels/validate-all returns 200');
  assert(valRes.body.allValid === true, 'All playable levels pass comprehensive validation');
  assert(valRes.body.totalChecked === 10, 'All 10 playable levels inspected');
  assert(valRes.body.levels.every(l => l.valid), 'All 10 playable levels are valid with >= 1 question, key, and exit door');

  // Verify hiding spots are diverse
  const hidingTypes = valRes.body.levels.map(r => r.details.keyHidingObject.type);
  const uniqueHidingTypes = new Set(hidingTypes);
  assert(uniqueHidingTypes.size >= 4, `Key hiding spots are varied across levels (found ${uniqueHidingTypes.size} different object types: ${[...uniqueHidingTypes].join(', ')})`);

  // --- TEST SUITE 2: OBJECT SCOPING PER LEVEL ---
  console.log('\n--- TEST SUITE 2: Room Objects Per Level ---');
  const l1Objects = await api('GET', '/api/levels/1/objects');
  const l2Objects = await api('GET', '/api/levels/2/objects');
  assert(l1Objects.body.every(o => o.level_id === 1), 'Level 1 room objects belong exclusively to Level 1');
  assert(l2Objects.body.every(o => o.level_id === 2), 'Level 2 room objects belong exclusively to Level 2');
  assert(l1Objects.body.length === 8 && l2Objects.body.length === 8, 'Each room loads its 8 illustrated objects');

  // --- TEST SUITE 3: INITIAL LEVEL 1 STATE (BUG 4) ---
  console.log('\n--- TEST SUITE 3: Initial Level State (Bug 4) ---');
  const testPlayer = 'test-player-' + Date.now();
  const l1InitSession = await api('GET', `/api/levels/1/question-session?playerId=${testPlayer}`);
  assert(l1InitSession.body.keyDiscovered === false, 'Level 1 cipher starts locked (keyDiscovered = false)');
  assert(l1InitSession.body.isDoorVisible === false, 'Level 1 exit door is initially hidden');
  assert(l1InitSession.body.allQuestionsSolved === false, 'Level 1 questions are unsolved initially');

  const l1InitInv = await api('GET', `/api/players/${testPlayer}/inventory?levelId=1`);
  assert(l1InitInv.body.length === 0, 'Level 1 satchel starts empty');

  // --- TEST SUITE 4: KEY DISCOVERY (BUG 2) ---
  console.log('\n--- TEST SUITE 4: Key Discovery Mechanism (Bug 2) ---');
  const l1KeyObjId = valRes.body.levels[0].details.keyHidingObject.id;
  const l1Interact = await api('POST', `/api/levels/1/objects/${l1KeyObjId}/interact`, { playerId: testPlayer });
  assert(l1Interact.body.success === true && l1Interact.body.itemDiscovered !== null, `Interacting with hiding object ${l1KeyObjId} discovers key`);
  assert(l1Interact.body.itemDiscovered.item_type === 'key', 'Discovered item is a key');

  const l1KeySession = await api('GET', `/api/levels/1/question-session?playerId=${testPlayer}`);
  assert(l1KeySession.body.keyDiscovered === true, 'Question session activates after discovering key');
  assert(l1KeySession.body.remainingSeconds === 25, '25-second countdown timer starts fresh');
  assert(l1KeySession.body.extensionsLeft === 3, 'Player has 3 extensions available');

  // --- TEST SUITE 5: BUG 3 - LEVEL ADVANCEMENT & INVENTORY RESET ---
  console.log('\n--- TEST SUITE 5: Inventory Scoping & Level Transition (Bug 3) ---');
  // Check Level 2 session for testPlayer: testPlayer has Level 1 key, but NOT Level 2 key!
  const l2SessionBeforeKey = await api('GET', `/api/levels/2/question-session?playerId=${testPlayer}`);
  assert(l2SessionBeforeKey.body.keyDiscovered === false, 'Level 1 key does NOT satisfy Level 2 key requirement');
  assert(l2SessionBeforeKey.body.isDoorVisible === false, 'Level 2 exit door is hidden before Level 2 questions are solved');

  const l2Inv = await api('GET', `/api/players/${testPlayer}/inventory?levelId=2`);
  assert(l2Inv.body.length === 0, 'Level 2 active inventory is empty (Level 1 items not in Level 2 active satchel)');

  // All inventory still has Level 1 key (persistent record preserved)
  const allInv = await api('GET', `/api/players/${testPlayer}/inventory`);
  assert(allInv.body.some(i => i.level_id === 1), 'Persistent inventory preserves Level 1 key history');

  // Discover Level 2 key
  const l2KeyObjId = valRes.body.levels[1].details.keyHidingObject.id;
  const l2Interact = await api('POST', `/api/levels/2/objects/${l2KeyObjId}/interact`, { playerId: testPlayer });
  assert(l2Interact.body.success === true && l2Interact.body.itemDiscovered !== null, `Discovered Level 2 key from hiding object ${l2KeyObjId}`);
  assert(l2Interact.body.itemDiscovered.id === 201, 'Level 2 key is distinct (Silver Chamber Key 201)');

  const l2SessionAfterKey = await api('GET', `/api/levels/2/question-session?playerId=${testPlayer}`);
  assert(l2SessionAfterKey.body.keyDiscovered === true, 'Level 2 question session active after discovering Level 2 key');

  // --- TEST SUITE 6: ANSWERING QUESTIONS & UNLOCKING DOOR (BUGS 1, 6) ---
  console.log('\n--- TEST SUITE 6: Answering Questions & Authoritative Door Unlock (Bugs 1, 6) ---');
  const l2Questions = await api('GET', `/api/levels/2/questions`);
  assert(l2Questions.body.length >= 1, `Level 2 has ${l2Questions.body.length} academic questions`);

  const q1 = l2Questions.body[0];
  const q2 = l2Questions.body[1];

  // Try submitting answer with wrong answer
  const wrongAns = await api('POST', `/api/questions/${q1.id}/answer`, {
    playerId: testPlayer,
    levelId: 2,
    selectedOption: 'Z'
  });
  assert(wrongAns.body.isCorrect === false, 'Incorrect answer is rejected authoritatively');

  // Answer q1 correctly: "Square root of 144" -> Option C: 12
  const rightAns1 = await api('POST', `/api/questions/${q1.id}/answer`, {
    playerId: testPlayer,
    levelId: 2,
    selectedOption: 'C'
  });
  assert(rightAns1.body.isCorrect === true, 'Correct answer to Question 1 accepted');

  // Check session after q1: door should STILL be hidden because q2 is unsolved
  const l2SessionMid = await api('GET', `/api/levels/2/question-session?playerId=${testPlayer}`);
  assert(l2SessionMid.body.isDoorVisible === false, 'Door remains hidden while questions remain unsolved');
  assert(l2SessionMid.body.allQuestionsSolved === false, 'allQuestionsSolved is false after 1 of 2 questions');

  // Answer q2 correctly: "5 columns on each side" -> Option B: 10
  const rightAns2 = await api('POST', `/api/questions/${q2.id}/answer`, {
    playerId: testPlayer,
    levelId: 2,
    selectedOption: 'B'
  });
  assert(rightAns2.body.isCorrect === true, 'Correct answer to Question 2 accepted');

  // Check session after q2: all questions solved, door unlocked!
  const l2SessionFinal = await api('GET', `/api/levels/2/question-session?playerId=${testPlayer}`);
  assert(l2SessionFinal.body.allQuestionsSolved === true, 'All questions solved flag is true');
  assert(l2SessionFinal.body.isDoorVisible === true, 'Exit door is now visible!');

  // Complete level
  const compRes = await api('POST', `/api/players/${testPlayer}/levels/2/complete`, {
    finalScore: 100,
    timeRemaining: 18
  });
  assert(compRes.body.success === true, 'Level 2 completion verified authoritatively');

  // --- TEST SUITE 7: RESTART CHAMBER ---
  console.log('\n--- TEST SUITE 7: Chamber Restart Scoping ---');
  const restartRes = await api('POST', `/api/players/${testPlayer}/levels/2/restart`);
  assert(restartRes.body.success === true, 'Level 2 restarted successfully');

  const l2SessionAfterRestart = await api('GET', `/api/levels/2/question-session?playerId=${testPlayer}`);
  assert(l2SessionAfterRestart.body.keyDiscovered === false, 'Level 2 key reset upon restart');
  assert(l2SessionAfterRestart.body.isDoorVisible === false, 'Level 2 exit door hidden again upon restart');

  const l1InvAfterL2Restart = await api('GET', `/api/players/${testPlayer}/inventory?levelId=1`);
  assert(l1InvAfterL2Restart.body.length === 1, 'Level 1 inventory was NOT deleted when Level 2 was restarted');

  console.log('\n==================================================');
  console.log(`SUMMARY: ${passedCount} / ${totalTests} tests passed (${Math.round((passedCount / totalTests) * 100)}%)`);
  console.log('==================================================\n');

  if (passedCount === totalTests) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test suite failed:', err);
  process.exit(1);
});
