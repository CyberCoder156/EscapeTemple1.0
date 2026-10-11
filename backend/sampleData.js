// ============================================================
// backend/sampleData.js: Complete Offline Fallback Dataset
// ============================================================
// Contains full configuration for all playable levels across all subjects:
// - Verified subject associations
// - Level-specific items & keys
// - Dedicated room objects per level with varied key hiding spots
// - Academic questions for every single level
// - Exact level exit requirements
// ============================================================

const sampleSubjects = [
  { id: 1, name: 'Mathematics', description: 'Unravel ancient geometric equations, algebra riddles, and sacred temple geometry.' },
  { id: 2, name: 'Computer Science', description: 'Decode algorithmic glyphs, binary chambers, and computational logic puzzles.' },
  { id: 3, name: 'Physics', description: 'Master kinetic pendulums, gravity mechanics, and ancient optical reflections.' },
  { id: 4, name: 'Chemistry', description: 'Brew elemental mixtures, balance sacred equations, and decode alchemical reactions.' },
  { id: 5, name: 'General Knowledge', description: 'Test ancient world history, geographic wonders, and lost civilization lore.' }
];

const sampleLevels = [
  { id: 1, subject_id: 1, level_number: 1, name: 'The Forgotten Entrance', description: 'The first gateway into the sunken mathematics tomb. Examine the rug and solve the gate cipher.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 2, subject_id: 1, level_number: 2, name: 'The Hall of Whispers', description: 'A corridor echoing with algebraic riddles and hidden levers.', difficulty: 'Easy', room_background: '/images/temple/temple_room_2.png' },
  { id: 3, subject_id: 1, level_number: 3, name: 'The Hidden Chamber', description: 'A deeper vault containing complex equation pillars.', difficulty: 'Medium', room_background: '/images/temple/temple_room_3.png' },
  { id: 4, subject_id: 1, level_number: 4, name: 'The Lost Treasury', description: 'A gold-paved sanctuary locked behind prime number seals.', difficulty: 'Medium', room_background: '/images/temple/temple_room_4.png' },
  { id: 5, subject_id: 1, level_number: 5, name: "The Guardian's Sanctuary", description: 'The inner sanctum guarded by the grand temple sphinx.', difficulty: 'Hard', room_background: '/images/temple/temple_room_5.png' },
  { id: 6, subject_id: 2, level_number: 1, name: 'The Binary Vault', description: 'Decode the logic gates etched into the obsidian walls.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 7, subject_id: 2, level_number: 2, name: 'The Algorithm Crypt', description: 'Trace the path through ancient recursive maze tunnels.', difficulty: 'Medium', room_background: '/images/temple/temple_room_2.png' },
  { id: 8, subject_id: 3, level_number: 1, name: 'The Gravity Sanctum', description: 'Balance floating stone monoliths using gravitational laws.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 9, subject_id: 4, level_number: 1, name: 'The Alchemist Laboratory', description: 'Mix glowing vials to neutralize the acidic door lock.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 10, subject_id: 5, level_number: 1, name: 'The Archive of Antiquity', description: 'Answer questions of past civilizations to lift the stone seal.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' }
];

const sampleItems = [
  // Level 1 Items
  { id: 1, name: 'Golden Key', item_type: 'key', description: 'A heavy golden key engraved with the temple guardian emblem.', image_path: '/images/objects/key_gold.png' },
  { id: 2, name: 'Ancient Papyrus Clue', item_type: 'clue', description: 'A torn parchment displaying the equation: 3x + 15 = 45.', image_path: '/images/objects/scroll_clue.png' },
  { id: 3, name: 'Ruby Gemstone', item_type: 'relic', description: 'A glowing crimson gem discovered inside the reinforced wooden chest.', image_path: '/images/objects/ruby_gem.png' },
  { id: 4, name: 'Stone Hieroglyph Fragment', item_type: 'clue', description: 'A carved stone tablet inscribed with ancient temple instructions.', image_path: '/images/objects/stone_tablet.png' },

  // Level 2 Items
  { id: 201, name: 'Silver Whisper Key', item_type: 'key', description: 'An engraved silver key inscribed with ancient mathematical symbols.', image_path: '/images/objects/key_gold.png' },
  { id: 202, name: 'Whispering Scroll Clue', item_type: 'clue', description: 'A scroll fragment describing the square root of 144.', image_path: '/images/objects/scroll_clue.png' },

  // Level 3 Items
  { id: 301, name: 'Bronze Vault Key', item_type: 'key', description: 'A heavy bronze key etched with geometric triangles.', image_path: '/images/objects/key_gold.png' },
  { id: 302, name: 'Triangular Papyrus Clue', item_type: 'clue', description: 'A blueprint of a right triangle with sides 6, 8, 10.', image_path: '/images/objects/scroll_clue.png' },

  // Level 4 Items
  { id: 401, name: 'Prime Treasury Key', item_type: 'key', description: 'A radiant golden key bearing the sequence of first prime numbers.', image_path: '/images/objects/key_gold.png' },
  { id: 402, name: 'Golden Ingot Relic', item_type: 'relic', description: 'A solid gold bar stamped with the ancient pharaoh seal.', image_path: '/images/objects/ruby_gem.png' },

  // Level 5 Items
  { id: 501, name: 'Sphinx Sanctuary Key', item_type: 'key', description: 'A mystical obsidian key crowned with the crest of the guardian sphinx.', image_path: '/images/objects/key_gold.png' },
  { id: 502, name: 'Sacred Scarab Relic', item_type: 'relic', description: 'A carved lapis lazuli scarab emblem.', image_path: '/images/objects/ruby_gem.png' },

  // Level 6 Items (CS 1)
  { id: 601, name: 'Crystal Logic Key', item_type: 'key', description: 'A translucent crystal key engraved with binary patterns 0101.', image_path: '/images/objects/key_gold.png' },
  { id: 602, name: 'Punched Card Clue', item_type: 'clue', description: 'An ancient perforated parchment representing boolean logic.', image_path: '/images/objects/scroll_clue.png' },

  // Level 7 Items (CS 2)
  { id: 701, name: 'Obsidian Node Key', item_type: 'key', description: 'A dark obsidian key shaped like a graph vertex and branching edges.', image_path: '/images/objects/key_gold.png' },
  { id: 702, name: 'Cipher Parchment Clue', item_type: 'clue', description: 'A diagram of recursive binary tree traversal.', image_path: '/images/objects/scroll_clue.png' },

  // Level 8 Items (Physics 1)
  { id: 801, name: 'Pendulum Fulcrum Key', item_type: 'key', description: 'A brass key balanced with a precision counterweight.', image_path: '/images/objects/key_gold.png' },
  { id: 802, name: 'Prism Crystal Relic', item_type: 'relic', description: 'A triangular prism that separates torch light into rainbow bands.', image_path: '/images/objects/ruby_gem.png' },

  // Level 9 Items (Chemistry 1)
  { id: 901, name: 'Alchemical Catalyst Key', item_type: 'key', description: 'An iridescent elemental key resistant to extreme acids.', image_path: '/images/objects/key_gold.png' },
  { id: 902, name: 'Glowing Amber Flask Relic', item_type: 'relic', description: 'A sealed glass phial containing an ancient luminous elixir.', image_path: '/images/objects/ruby_gem.png' },

  // Level 10 Items (GK 1)
  { id: 1001, name: 'Pharaoh Papyrus Key', item_type: 'key', description: 'An ancient ceremonial key preserved from the Library of Alexandria.', image_path: '/images/objects/key_gold.png' },
  { id: 1002, name: 'Alexandria Cartouche Relic', item_type: 'relic', description: 'A royal cartouche bearing ancient hieroglyphic inscriptions.', image_path: '/images/objects/ruby_gem.png' }
];

// Helper to construct 8 standard room objects for a level with customized key hiding
function makeRoomObjects(levelId, keyItemId, hidingObjType, clueItemId = null, clueObjType = null, relicItemId = null) {
  const baseObjects = [
    { type: 'rug', name: 'Patterned Floor Rug', x: 48.00, y: 78.00, anim: 'lift', desc: 'A weathered woven rug with temple motifs.' },
    { type: 'vase', name: 'Ancient Clay Urn', x: 18.00, y: 68.00, anim: 'shake', desc: 'A decorative clay urn dusted with centuries of sand.' },
    { type: 'chest', name: 'Reinforced Wooden Chest', x: 78.00, y: 72.00, anim: 'open', desc: 'A sturdy cedar chest locked with a heavy padlock.' },
    { type: 'table', name: 'Carved Stone Altar Table', x: 50.00, y: 56.00, anim: 'inspect', desc: 'An ancient stone offering table holding an inscribed parchment.' },
    { type: 'curtains', name: 'Hanging Velvet Tapestry', x: 25.00, y: 32.00, anim: 'part', desc: 'Faded red curtains covering an ancient stone carving.' },
    { type: 'statue', name: 'Guardian Falcon Statue', x: 82.00, y: 36.00, anim: 'rotate', desc: 'A granite statue of a temple falcon with glowing ruby eyes.' },
    { type: 'symbol', name: 'Lapis Wall Symbol', x: 50.00, y: 22.00, anim: 'glow', desc: 'A mystical blue glyph carved above the doorway.' },
    { type: 'door', name: 'Massive Stone Exit Door', x: 50.00, y: 42.00, anim: 'unlock', desc: 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.' }
  ];

  return baseObjects.map((bo, idx) => {
    const objId = (levelId * 10) + (idx + 1);
    let hiddenId = null;
    let requiredId = null;
    let requiredName = null;
    let isRequired = (bo.type === 'door');
    let desc = bo.desc;

    if (bo.type === hidingObjType) {
      hiddenId = keyItemId;
      isRequired = true;
      desc += ' Something is carefully concealed here!';
    } else if (bo.type === clueObjType && clueItemId) {
      hiddenId = clueItemId;
      desc += ' A secret clue is tucked inside.';
    } else if (bo.type === 'chest' && relicItemId) {
      hiddenId = relicItemId;
      requiredId = keyItemId;
      requiredName = 'Chamber Key';
      isRequired = true;
    }

    return {
      id: objId,
      level_id: levelId,
      object_name: bo.name,
      object_type: bo.type,
      position_x: bo.x,
      position_y: bo.y,
      image_path: `/images/objects/${bo.type === 'door' ? 'exit_door' : bo.type === 'curtains' ? 'curtain' : bo.type === 'symbol' ? 'symbol' : bo.type === 'vase' ? 'urn' : bo.type}.png`,
      animation_type: bo.anim,
      description: desc,
      hidden_item_id: hiddenId,
      required_item_id: requiredId,
      required_item_name: requiredName,
      is_required: isRequired ? 1 : 0
    };
  });
}

// 8 Dedicated Room Objects per level (80 total objects) with varied hiding spots
const sampleObjects = [
  ...makeRoomObjects(1, 1, 'rug', 2, 'vase', 3),            // Level 1: Key under Rug
  ...makeRoomObjects(2, 201, 'vase', 202, 'table', null),   // Level 2: Key in Clay Urn (Vase)
  ...makeRoomObjects(3, 301, 'curtains', 302, 'table', null), // Level 3: Key behind Velvet Tapestry (Curtains)
  ...makeRoomObjects(4, 401, 'table', null, null, 402),     // Level 4: Key inside Altar Table
  ...makeRoomObjects(5, 501, 'statue', null, null, 502),    // Level 5: Key behind Falcon Statue
  ...makeRoomObjects(6, 601, 'symbol', 602, 'table', null), // Level 6: Key behind Lapis Symbol
  ...makeRoomObjects(7, 701, 'vase', 702, 'curtains', null), // Level 7: Key in Clay Urn (Vase)
  ...makeRoomObjects(8, 801, 'curtains', null, null, 802),  // Level 8: Key behind Velvet Tapestry (Curtains)
  ...makeRoomObjects(9, 901, 'table', null, null, 902),     // Level 9: Key in Altar Table
  ...makeRoomObjects(10, 1001, 'statue', null, null, 1002)  // Level 10: Key behind Falcon Statue
];

// 20 Academic Questions (2 for each playable level)
const sampleQuestions = [
  // Level 1: Mathematics - Easy (The Forgotten Entrance)
  { id: 1, level_id: 1, question_text: 'To unseal the first chamber, solve the equation: If 3x + 15 = 45, what is the value of x?', question_type: 'multiple_choice', option_a: '8', option_b: '10', option_c: '12', option_d: '15', correct_answer: '10', hint: 'Subtract 15 from both sides first, then divide by 3.', explanation: '3x + 15 = 45 -> 3x = 30 -> x = 10.', points: 10 },
  { id: 2, level_id: 1, question_text: 'What is the ancient Greek mathematical symbol representing the ratio of a circle circumference to its diameter?', question_type: 'text', correct_answer: 'pi', hint: 'Represented by the Greek letter π, spelled with two letters in English.', explanation: 'Pi (π) is the constant ratio of circumference to diameter, approximately 3.14159.', points: 15 },

  // Level 2: Mathematics - Easy (The Hall of Whispers)
  { id: 3, level_id: 2, question_text: 'In the Hall of Whispers, calculate: What is the square root of 144?', question_type: 'multiple_choice', option_a: '10', option_b: '11', option_c: '12', option_d: '14', correct_answer: '12', hint: 'Think of what number multiplied by itself equals 144.', explanation: '12 * 12 = 144.', points: 10 },
  { id: 8, level_id: 2, question_text: 'If an ancient temple corridor has 5 columns on each side, how many columns are there in total?', question_type: 'multiple_choice', option_a: '8', option_b: '10', option_c: '12', option_d: '15', correct_answer: '10', hint: 'Add 5 plus 5.', explanation: '5 columns on left + 5 on right = 10 total columns.', points: 10 },

  // Level 3: Mathematics - Medium (The Hidden Chamber)
  { id: 9, level_id: 3, question_text: 'A right-angled triangle on the chamber floor has legs of length 6 and 8. What is the length of the hypotenuse?', question_type: 'multiple_choice', option_a: '9', option_b: '10', option_c: '12', option_d: '14', correct_answer: '10', hint: 'Apply Pythagorean theorem: 6^2 + 8^2 = 36 + 64 = 100.', explanation: 'Square root of 100 is 10.', points: 15 },
  { id: 10, level_id: 3, question_text: 'Solve for y in the chamber cipher: If 2y - 7 = 19, what is the value of y?', question_type: 'multiple_choice', option_a: '11', option_b: '12', option_c: '13', option_d: '14', correct_answer: '13', hint: 'Add 7 to both sides, then divide by 2.', explanation: '2y = 26 -> y = 13.', points: 15 },

  // Level 4: Mathematics - Medium (The Lost Treasury)
  { id: 11, level_id: 4, question_text: 'Which of the following numbers inscribed on the treasury vault is a prime number?', question_type: 'multiple_choice', option_a: '21', option_b: '27', option_c: '29', option_d: '33', correct_answer: '29', hint: 'A prime number has only two factors: 1 and itself.', explanation: '29 has no divisors other than 1 and 29.', points: 15 },
  { id: 12, level_id: 4, question_text: 'What is the sum of the interior angles of any triangle carved into the stone tablets?', question_type: 'multiple_choice', option_a: '90°', option_b: '180°', option_c: '270°', option_d: '360°', correct_answer: '180°', hint: 'The angles always add up to a straight line angle.', explanation: 'All Euclidean triangles have interior angles summing to 180 degrees.', points: 15 },

  // Level 5: Mathematics - Hard (The Guardian Sanctuary)
  { id: 13, level_id: 5, question_text: 'The Sphinx poses a geometric challenge: What is the area of a circle with radius 7 meters? (Use π = 22/7 and Area = π * r^2)', question_type: 'multiple_choice', option_a: '144', option_b: '154', option_c: '168', option_d: '196', correct_answer: '154', hint: '(22/7) * 7 * 7 = 22 * 7.', explanation: '22 * 7 = 154 square meters.', points: 20 },
  { id: 14, level_id: 5, question_text: 'Solve the quadratic equation x^2 - 9 = 0 for its positive root.', question_type: 'text', correct_answer: '3', hint: 'What positive number multiplied by itself equals 9?', explanation: 'x^2 = 9 -> x = 3.', points: 20 },

  // Level 6: Computer Science - Easy (The Binary Vault)
  { id: 4, level_id: 6, question_text: 'Which computer science data structure operates on a Last-In, First-Out (LIFO) principle?', question_type: 'multiple_choice', option_a: 'Queue', option_b: 'Stack', option_c: 'Linked List', option_d: 'Array', correct_answer: 'Stack', hint: 'Think of a stack of dinner plates in a cafeteria.', explanation: 'A Stack pushes and pops items from the top (LIFO).', points: 10 },
  { id: 15, level_id: 6, question_text: 'Convert the 4-bit binary sequence 1010 into its decimal (base-10) equivalent.', question_type: 'multiple_choice', option_a: '8', option_b: '10', option_c: '12', option_d: '14', correct_answer: '10', hint: '8 + 0 + 2 + 0 = 10.', explanation: 'Binary 1010 = 1*(8) + 0*(4) + 1*(2) + 0*(1) = 10 in decimal.', points: 10 },

  // Level 7: Computer Science - Medium (The Algorithm Crypt)
  { id: 16, level_id: 7, question_text: 'What is the worst-case time complexity of Binary Search on a sorted array of n elements?', question_type: 'multiple_choice', option_a: 'O(1)', option_b: 'O(log n)', option_c: 'O(n)', option_d: 'O(n^2)', correct_answer: 'O(log n)', hint: 'Each comparison cuts the search space in half.', explanation: 'Binary search halves the search space each step: O(log n).', points: 15 },
  { id: 17, level_id: 7, question_text: 'What algorithmic paradigm divides a problem into independent subproblems, solves them recursively, and combines the results (e.g., Merge Sort)?', question_type: 'multiple_choice', option_a: 'Greedy Algorithm', option_b: 'Dynamic Programming', option_c: 'Divide and Conquer', option_d: 'Backtracking', correct_answer: 'Divide and Conquer', hint: 'First divide, then conquer, then combine.', explanation: 'Merge sort and Quick sort are classic Divide and Conquer algorithms.', points: 15 },

  // Level 8: Physics - Easy (The Gravity Sanctum)
  { id: 5, level_id: 8, question_text: 'What is the approximate standard acceleration due to Earth gravity on the surface?', question_type: 'multiple_choice', option_a: '9.8 m/s²', option_b: '5.5 m/s²', option_c: '12.3 m/s²', option_d: '1.6 m/s²', correct_answer: '9.8 m/s²', hint: 'It is close to 10 m/s², specifically between 9 and 10.', explanation: 'Standard gravitational acceleration g is approximately 9.80665 m/s².', points: 10 },
  { id: 18, level_id: 8, question_text: 'According to Newton Second Law of Motion, what is the formula for force (F) given mass (m) and acceleration (a)?', question_type: 'multiple_choice', option_a: 'F = m / a', option_b: 'F = m * a', option_c: 'F = m + a', option_d: 'F = 0.5 * m * a^2', correct_answer: 'F = m * a', hint: 'Force equals mass times acceleration.', explanation: 'Newton second law is famously expressed as F = m * a.', points: 10 },

  // Level 9: Chemistry - Easy (The Alchemist Laboratory)
  { id: 6, level_id: 9, question_text: 'What is the chemical formula for pure water?', question_type: 'multiple_choice', option_a: 'CO2', option_b: 'NaCl', option_c: 'H2O', option_d: 'CH4', correct_answer: 'H2O', hint: 'It consists of two Hydrogen atoms and one Oxygen atom.', explanation: 'H2O is two Hydrogen atoms bonded to one Oxygen atom.', points: 10 },
  { id: 19, level_id: 9, question_text: 'On the standard pH scale, what pH value represents a completely neutral solution at 25°C?', question_type: 'multiple_choice', option_a: '0', option_b: '7', option_c: '10', option_d: '14', correct_answer: '7', hint: 'Pure water has this neutral pH value right in the middle of 0 to 14.', explanation: 'A pH of 7 is neutral; values below 7 are acidic, and values above 7 are basic.', points: 10 },

  // Level 10: General Knowledge - Easy (The Archive of Antiquity)
  { id: 7, level_id: 10, question_text: 'Which ancient wonder of the world stood in the harbor of Alexandria, Egypt?', question_type: 'multiple_choice', option_a: 'Colossus of Rhodes', option_b: 'Lighthouse of Alexandria', option_c: 'Hanging Gardens of Babylon', option_d: 'Statue of Zeus at Olympia', correct_answer: 'Lighthouse of Alexandria', hint: 'It guided sailors with a giant mirrored beacon.', explanation: 'The Pharos of Alexandria was the famous ancient lighthouse.', points: 10 },
  { id: 20, level_id: 10, question_text: 'Which great river flowed through ancient Egypt, enabling its civilization to flourish in the desert?', question_type: 'multiple_choice', option_a: 'Amazon River', option_b: 'Nile River', option_c: 'Yangtze River', option_d: 'Danube River', correct_answer: 'Nile River', hint: 'Known as the longest river in Africa.', explanation: 'The annual flooding of the Nile River provided fertile soil for Egyptian agriculture.', points: 10 }
];

// Level Exit Requirements for all 10 playable levels
const sampleRequirements = [
  { id: 1, level_id: 1, requirement_type: 'item_collected', requirement_value: '1', description: 'Collect the Golden Key hidden under the floor rug.' },
  { id: 2, level_id: 1, requirement_type: 'question_answered', requirement_value: '1', description: 'Correctly solve the equation puzzle on the temple scroll.' },

  { id: 3, level_id: 2, requirement_type: 'item_collected', requirement_value: '201', description: 'Collect the Silver Whisper Key hidden inside the ancient clay urn.' },
  { id: 4, level_id: 2, requirement_type: 'question_answered', requirement_value: '3', description: 'Correctly solve the square root cipher.' },

  { id: 5, level_id: 3, requirement_type: 'item_collected', requirement_value: '301', description: 'Collect the Bronze Vault Key hidden behind the hanging velvet tapestry.' },
  { id: 6, level_id: 3, requirement_type: 'question_answered', requirement_value: '9', description: 'Correctly solve the Pythagorean geometry riddle.' },

  { id: 7, level_id: 4, requirement_type: 'item_collected', requirement_value: '401', description: 'Collect the Prime Treasury Key hidden inside the carved stone altar table.' },
  { id: 8, level_id: 4, requirement_type: 'question_answered', requirement_value: '11', description: 'Correctly solve the prime number treasury lock.' },

  { id: 9, level_id: 5, requirement_type: 'item_collected', requirement_value: '501', description: 'Collect the Sphinx Sanctuary Key hidden behind the guardian falcon statue.' },
  { id: 10, level_id: 5, requirement_type: 'question_answered', requirement_value: '13', description: 'Correctly solve the Sphinx circle area challenge.' },

  { id: 11, level_id: 6, requirement_type: 'item_collected', requirement_value: '601', description: 'Collect the Crystal Logic Key hidden behind the lapis wall symbol.' },
  { id: 12, level_id: 6, requirement_type: 'question_answered', requirement_value: '4', description: 'Correctly solve the data structures riddle.' },

  { id: 13, level_id: 7, requirement_type: 'item_collected', requirement_value: '701', description: 'Collect the Obsidian Node Key hidden inside the ancient clay urn.' },
  { id: 14, level_id: 7, requirement_type: 'question_answered', requirement_value: '16', description: 'Correctly solve the binary search complexity cipher.' },

  { id: 15, level_id: 8, requirement_type: 'item_collected', requirement_value: '801', description: 'Collect the Pendulum Fulcrum Key hidden behind the hanging velvet tapestry.' },
  { id: 16, level_id: 8, requirement_type: 'question_answered', requirement_value: '5', description: 'Correctly solve the gravitational acceleration question.' },

  { id: 17, level_id: 9, requirement_type: 'item_collected', requirement_value: '901', description: 'Collect the Alchemical Catalyst Key hidden inside the carved stone altar table.' },
  { id: 18, level_id: 9, requirement_type: 'question_answered', requirement_value: '6', description: 'Correctly solve the pure water chemical formula question.' },

  { id: 19, level_id: 10, requirement_type: 'item_collected', requirement_value: '1001', description: 'Collect the Pharaoh Papyrus Key hidden behind the guardian falcon statue.' },
  { id: 20, level_id: 10, requirement_type: 'question_answered', requirement_value: '7', description: 'Correctly solve the ancient wonder of the world question.' }
];

// In-memory runtime state for offline mode
const offlinePlayerProgress = {};
const offlinePlayerInventory = {};
const offlinePlayerAnswers = {};
const offlineQuestionSessions = {};
const offlineEliminatedLevels = {};

module.exports = {
  sampleSubjects,
  sampleLevels,
  sampleItems,
  sampleObjects,
  sampleQuestions,
  sampleRequirements,
  offlinePlayerProgress,
  offlinePlayerInventory,
  offlinePlayerAnswers,
  offlineQuestionSessions,
  offlineEliminatedLevels
};
