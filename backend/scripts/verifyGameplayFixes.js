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
  assert(valRes.body.totalChecked === 25, `All ${valRes.body.totalChecked} playable levels inspected (expected 25)`);
  assert(valRes.body.levels.every(l => l.valid), `All ${valRes.body.totalChecked} playable levels are valid with >= 1 question, key, and exit door`);

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

  // --- TEST SUITE 8: COMPUTER SCIENCE 5-LEVEL DISCIPLINE VERIFICATION ---
  console.log('\n--- TEST SUITE 8: Computer Science 5-Level Discipline & Progression ---');
  const csLevelsRes = await api('GET', '/api/subjects/2/levels');
  assert(csLevelsRes.status === 200, 'GET /api/subjects/2/levels returns 200 OK');
  assert(csLevelsRes.body.length === 5, `Computer Science has exactly 5 levels (found: ${csLevelsRes.body.length})`);

  const expectedCsNames = [
    'The Binary Vault',
    'The Algorithm Crypt',
    'The Network Nexus',
    'The Database Vault',
    "The Cyber Guardian's Sanctum"
  ];

  csLevelsRes.body.forEach((lvl, idx) => {
    assert(lvl.level_number === idx + 1, `CS Level ${idx + 1} has correct level_number ${idx + 1}`);
    assert(lvl.name === expectedCsNames[idx], `CS Level ${idx + 1} name is "${expectedCsNames[idx]}"`);
  });

  // Verify room objects and questions for newly added CS levels (11, 12, 13)
  for (const csLvlId of [11, 12, 13]) {
    const objs = await api('GET', `/api/levels/${csLvlId}/objects`);
    assert(objs.body.length === 8, `CS Level ${csLvlId} loads all 8 room objects`);
    const qList = await api('GET', `/api/levels/${csLvlId}/questions`);
    assert(qList.body.length >= 2, `CS Level ${csLvlId} has at least 2 questions (found: ${qList.body.length})`);
  }

  // Test full sequential progression through Computer Science levels 1 -> 2 -> 3 -> 4 -> 5
  const csPlayer = 'cs-master-' + Date.now();
  const csProgressionChain = [
    { levelId: 6, keyObjId: 67, answers: [{ qId: 4, ans: 'Stack' }, { qId: 15, ans: '10' }], expectedNextId: 7 },
    { levelId: 7, keyObjId: 72, answers: [{ qId: 16, ans: 'O(log n)' }, { qId: 17, ans: 'Divide and Conquer' }], expectedNextId: 11 },
    { levelId: 11, keyObjId: 115, answers: [{ qId: 21, ans: 'Transport Layer' }, { qId: 22, ans: '443' }], expectedNextId: 12 },
    { levelId: 12, keyObjId: 124, answers: [{ qId: 23, ans: 'DISTINCT' }, { qId: 24, ans: 'Atomicity' }], expectedNextId: 13 },
    { levelId: 13, keyObjId: 136, answers: [{ qId: 25, ans: 'Turing Machine' }, { qId: 26, ans: 'P versus NP' }], expectedNextId: null }
  ];

  for (let step = 0; step < csProgressionChain.length; step++) {
    const stepData = csProgressionChain[step];
    const lvlNum = step + 1;

    // Start level
    const startRes = await api('POST', `/api/players/${csPlayer}/levels/${stepData.levelId}/start`);
    assert(startRes.body.success === true, `Player entered CS Level ${lvlNum} (id: ${stepData.levelId})`);

    // Discover key
    const keyRes = await api('POST', `/api/levels/${stepData.levelId}/objects/${stepData.keyObjId}/interact`, { playerId: csPlayer });
    assert(keyRes.body.success === true && keyRes.body.itemDiscovered?.item_type === 'key', `Player discovered key for CS Level ${lvlNum}`);

    // Answer questions
    for (const qItem of stepData.answers) {
      const ansRes = await api('POST', `/api/questions/${qItem.qId}/answer`, {
        playerId: csPlayer,
        levelId: stepData.levelId,
        selectedOption: qItem.ans
      });
      assert(ansRes.body.isCorrect === true || ansRes.body.correct === true, `Player solved Q${qItem.qId} correctly`);
    }

    // Verify exit door is visible
    const sessRes = await api('GET', `/api/levels/${stepData.levelId}/question-session?playerId=${csPlayer}`);
    assert(sessRes.body.isDoorVisible === true, `Exit door revealed for CS Level ${lvlNum}`);

    // Complete level
    const compRes = await api('POST', `/api/players/${csPlayer}/levels/${stepData.levelId}/complete`, {
      finalScore: 100,
      timeRemaining: 20
    });
    assert(compRes.body.success === true, `CS Level ${lvlNum} escaped successfully`);

    if (stepData.expectedNextId !== null) {
      assert(compRes.body.nextLevel && compRes.body.nextLevel.id === stepData.expectedNextId, `Next level unlocked: Level ID ${stepData.expectedNextId}`);
    } else {
      assert(!compRes.body.nextLevel, 'CS Level 5 is apex chamber: entire discipline completed!');
    }
  }

  // --- TEST SUITE 9: VERIFY ALL SUBJECTS HAVE EXACTLY 5 LEVELS & PROGRESSION ---
  console.log('\n--- TEST SUITE 9: All 5 Subjects Exactly 5 Levels & Progression ---');
  const subjectsRes = await api('GET', '/api/subjects');
  assert(subjectsRes.status === 200, 'GET /api/subjects returns 200 OK');
  assert(subjectsRes.body.length === 5, `EscapeTemple has 5 subjects (found: ${subjectsRes.body.length})`);

  for (const subj of subjectsRes.body) {
    const sLevelsRes = await api('GET', `/api/subjects/${subj.id}/levels`);
    assert(sLevelsRes.status === 200, `GET /api/subjects/${subj.id}/levels returns 200 OK`);
    assert(sLevelsRes.body.length === 5, `Subject "${subj.name}" (ID ${subj.id}) has exactly 5 levels (found: ${sLevelsRes.body.length})`);
    
    // Check level numbers 1 through 5
    sLevelsRes.body.forEach((lvl, idx) => {
      assert(lvl.level_number === idx + 1, `${subj.name} level ${idx + 1} has correct level_number ${idx + 1}`);
    });
  }

  // Verify all 12 newly added levels (14-25) have 8 objects and >= 2 questions
  for (let lId = 14; lId <= 25; lId++) {
    const objs = await api('GET', `/api/levels/${lId}/objects`);
    assert(objs.body.length === 8, `Level ${lId} loads all 8 room objects`);
    const qList = await api('GET', `/api/levels/${lId}/questions`);
    assert(qList.body.length >= 2, `Level ${lId} has at least 2 questions (found: ${qList.body.length})`);
  }

  // Helper function to test progression through a subject
  async function testSubjectProgression(subjectName, playerPrefix, chain) {
    const pId = playerPrefix + '-' + Date.now();
    for (let step = 0; step < chain.length; step++) {
      const stepData = chain[step];
      const lvlNum = step + 1;

      // Start level
      const startRes = await api('POST', `/api/players/${pId}/levels/${stepData.levelId}/start`);
      assert(startRes.body.success === true, `Player entered ${subjectName} Level ${lvlNum} (id: ${stepData.levelId})`);

      // Discover key
      const keyRes = await api('POST', `/api/levels/${stepData.levelId}/objects/${stepData.keyObjId}/interact`, { playerId: pId });
      assert(keyRes.body.success === true && keyRes.body.itemDiscovered?.item_type === 'key', `Player discovered key for ${subjectName} Level ${lvlNum}`);

      // Answer questions
      for (const qItem of stepData.answers) {
        const ansRes = await api('POST', `/api/questions/${qItem.qId}/answer`, {
          playerId: pId,
          levelId: stepData.levelId,
          selectedOption: qItem.ans
        });
        assert(ansRes.body.isCorrect === true || ansRes.body.correct === true, `Player solved Q${qItem.qId} correctly`);
      }

      // Verify exit door is visible
      const sessRes = await api('GET', `/api/levels/${stepData.levelId}/question-session?playerId=${pId}`);
      assert(sessRes.body.isDoorVisible === true, `Exit door revealed for ${subjectName} Level ${lvlNum}`);

      // Complete level
      const compRes = await api('POST', `/api/players/${pId}/levels/${stepData.levelId}/complete`, {
        finalScore: 100,
        timeRemaining: 20
      });
      assert(compRes.body.success === true, `${subjectName} Level ${lvlNum} escaped successfully`);

      if (stepData.expectedNextId !== null) {
        assert(compRes.body.nextLevel && compRes.body.nextLevel.id === stepData.expectedNextId, `Next level unlocked: Level ID ${stepData.expectedNextId}`);
      } else {
        assert(!compRes.body.nextLevel, `${subjectName} Level 5 is apex chamber: subject discipline completed!`);
      }
    }
  }

  // Test Physics progression
  await testSubjectProgression('Physics', 'phys-master', [
    { levelId: 8, keyObjId: 85, answers: [{ qId: 5, ans: '9.8 m/s²' }, { qId: 18, ans: 'F = m * a' }], expectedNextId: 14 },
    { levelId: 14, keyObjId: 142, answers: [{ qId: 27, ans: 'Refraction' }, { qId: 28, ans: '300,000 km/s' }], expectedNextId: 15 },
    { levelId: 15, keyObjId: 155, answers: [{ qId: 29, ans: '-273.15°C' }, { qId: 30, ans: 'First Law' }], expectedNextId: 16 },
    { levelId: 16, keyObjId: 164, answers: [{ qId: 31, ans: 'V = I * R' }, { qId: 32, ans: 'Tesla' }], expectedNextId: 17 },
    { levelId: 17, keyObjId: 176, answers: [{ qId: 33, ans: 'Heisenberg Uncertainty Principle' }, { qId: 34, ans: 'Speed of Light' }], expectedNextId: null }
  ]);

  // Test Chemistry progression
  await testSubjectProgression('Chemistry', 'chem-master', [
    { levelId: 9, keyObjId: 94, answers: [{ qId: 6, ans: 'H2O' }, { qId: 19, ans: '7' }], expectedNextId: 18 },
    { levelId: 18, keyObjId: 181, answers: [{ qId: 35, ans: 'Hydrogen' }, { qId: 36, ans: 'Noble Gases' }], expectedNextId: 19 },
    { levelId: 19, keyObjId: 192, answers: [{ qId: 37, ans: 'Covalent Bond' }, { qId: 38, ans: 'Sodium Chloride' }], expectedNextId: 20 },
    { levelId: 20, keyObjId: 205, answers: [{ qId: 39, ans: 'Catalyst' }, { qId: 40, ans: 'Exothermic' }], expectedNextId: 21 },
    { levelId: 21, keyObjId: 216, answers: [{ qId: 41, ans: 'Avogadro Number' }, { qId: 42, ans: 'Diamond' }], expectedNextId: null }
  ]);

  // Test General Knowledge progression
  await testSubjectProgression('General Knowledge', 'gk-master', [
    { levelId: 10, keyObjId: 106, answers: [{ qId: 7, ans: 'Lighthouse of Alexandria' }, { qId: 20, ans: 'Nile River' }], expectedNextId: 22 },
    { levelId: 22, keyObjId: 224, answers: [{ qId: 43, ans: 'Mesopotamia' }, { qId: 44, ans: 'Silk Road' }], expectedNextId: 23 },
    { levelId: 23, keyObjId: 235, answers: [{ qId: 45, ans: 'Mount Everest' }, { qId: 46, ans: 'Mariana Trench' }], expectedNextId: 24 },
    { levelId: 24, keyObjId: 241, answers: [{ qId: 47, ans: 'Maya' }, { qId: 48, ans: 'Rosetta Stone' }], expectedNextId: 25 },
    { levelId: 25, keyObjId: 256, answers: [{ qId: 49, ans: 'Aristotle' }, { qId: 50, ans: 'Antikythera Mechanism' }], expectedNextId: null }
  ]);

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
