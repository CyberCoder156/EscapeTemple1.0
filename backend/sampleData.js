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
  { id: 11, subject_id: 2, level_number: 3, name: 'The Network Nexus', description: 'Traverse optical conduits and route packets through protocol gates.', difficulty: 'Medium', room_background: '/images/temple/temple_room_3.png' },
  { id: 12, subject_id: 2, level_number: 4, name: 'The Database Vault', description: 'Navigate relational tables, decode primary keys, and balance transactional ledger vaults.', difficulty: 'Medium', room_background: '/images/temple/temple_room_4.png' },
  { id: 13, subject_id: 2, level_number: 5, name: "The Cyber Guardian's Sanctum", description: 'The apex computational sanctum where Alan Turing mechanical automaton guards the final gate.', difficulty: 'Hard', room_background: '/images/temple/temple_room_5.png' },
  // Subject 3: Physics (Levels 1 - 5)
  { id: 8, subject_id: 3, level_number: 1, name: 'The Gravity Sanctum', description: 'Balance floating stone monoliths using gravitational laws.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 14, subject_id: 3, level_number: 2, name: 'The Optics Hall', description: 'Decode light refraction, mirror angles, and the sacred spectrum prism.', difficulty: 'Easy', room_background: '/images/temple/temple_room_2.png' },
  { id: 15, subject_id: 3, level_number: 3, name: 'The Thermodynamics Vault', description: 'Balance heat transfer cycles and master the conservation of thermal energy.', difficulty: 'Medium', room_background: '/images/temple/temple_room_3.png' },
  { id: 16, subject_id: 3, level_number: 4, name: 'The Electromagnetism Crypt', description: 'Navigate magnetic field flux lines, charge potentials, and inductive temple coils.', difficulty: 'Medium', room_background: '/images/temple/temple_room_4.png' },
  { id: 17, subject_id: 3, level_number: 5, name: 'The Quantum Chamber of Titans', description: 'Unravel wave-particle duality and the fundamental limits of physical observation.', difficulty: 'Hard', room_background: '/images/temple/temple_room_5.png' },

  // Subject 4: Chemistry (Levels 1 - 5)
  { id: 9, subject_id: 4, level_number: 1, name: 'The Alchemist Laboratory', description: 'Mix glowing vials to neutralize the acidic door lock.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 18, subject_id: 4, level_number: 2, name: 'The Periodic Vault', description: 'Examine noble gas alcoves, valence shells, and the periodic table of elements.', difficulty: 'Easy', room_background: '/images/temple/temple_room_2.png' },
  { id: 19, subject_id: 4, level_number: 3, name: 'The Crystal Lattice Sanctum', description: 'Investigate ionic and covalent crystal structures bound by chemical bonds.', difficulty: 'Medium', room_background: '/images/temple/temple_room_3.png' },
  { id: 20, subject_id: 4, level_number: 4, name: 'The Reaction Crucible', description: 'Balance stoichiometry equations and regulate exothermic energy transformations.', difficulty: 'Medium', room_background: '/images/temple/temple_room_4.png' },
  { id: 21, subject_id: 4, level_number: 5, name: "The Great Alchemist's Apex", description: 'The sanctum of universal solvents, Avogadro constants, and entropy equilibrium.', difficulty: 'Hard', room_background: '/images/temple/temple_room_5.png' },

  // Subject 5: General Knowledge (Levels 1 - 5)
  { id: 10, subject_id: 5, level_number: 1, name: 'The Archive of Antiquity', description: 'Answer questions of past civilizations to lift the stone seal.', difficulty: 'Easy', room_background: '/images/temple/temple_room_1.png' },
  { id: 22, subject_id: 5, level_number: 2, name: 'The Hall of Empires', description: 'Examine ancient capitals, trade crossroads, and founding chronicles.', difficulty: 'Easy', room_background: '/images/temple/temple_room_2.png' },
  { id: 23, subject_id: 5, level_number: 3, name: 'The Geographic Vault', description: 'Map world oceans, towering peaks, and continental dividing lines.', difficulty: 'Medium', room_background: '/images/temple/temple_room_3.png' },
  { id: 24, subject_id: 5, level_number: 4, name: 'The Lost Monoliths', description: 'Uncover megalithic astronomical alignments and forgotten architectural wonders.', difficulty: 'Medium', room_background: '/images/temple/temple_room_4.png' },
  { id: 25, subject_id: 5, level_number: 5, name: 'The Apex of Civilizations', description: 'The grand summit celebrating universal human heritage, philosophy, and ancient discovery.', difficulty: 'Hard', room_background: '/images/temple/temple_room_5.png' }
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

  // Level 11 Items (CS 3)
  { id: 1101, name: 'Ethernet Cipher Key', item_type: 'key', description: 'A glowing optical key embedded with a braided copper core.', image_path: '/images/objects/key_gold.png' },
  { id: 1102, name: 'Packet Header Clue', item_type: 'clue', description: 'A tablet deciphering IPv4 header fields and subnet masks.', image_path: '/images/objects/scroll_clue.png' },

  // Level 12 Items (CS 4)
  { id: 1201, name: 'Relational Schema Key', item_type: 'key', description: 'A heavy brass key shaped like a foreign key linking ancient schemas.', image_path: '/images/objects/key_gold.png' },
  { id: 1202, name: 'Golden Ledger Relic', item_type: 'relic', description: 'A sacred golden record detailing transactional integrity and ACID properties.', image_path: '/images/objects/ruby_gem.png' },

  // Level 13 Items (CS 5)
  { id: 1301, name: 'Turing Master Key', item_type: 'key', description: 'A master automaton key inscribed with finite state transition tables.', image_path: '/images/objects/key_gold.png' },
  { id: 1302, name: 'Lapis Automaton Core', item_type: 'relic', description: 'A humming computational matrix stone capable of universal computation.', image_path: '/images/objects/ruby_gem.png' },

  // Level 8 Items (Physics 1)
  { id: 801, name: 'Pendulum Fulcrum Key', item_type: 'key', description: 'A brass key balanced with a precision counterweight.', image_path: '/images/objects/key_gold.png' },
  { id: 802, name: 'Prism Crystal Relic', item_type: 'relic', description: 'A triangular prism that separates torch light into rainbow bands.', image_path: '/images/objects/ruby_gem.png' },

  // Level 9 Items (Chemistry 1)
  { id: 901, name: 'Alchemical Catalyst Key', item_type: 'key', description: 'An iridescent elemental key resistant to extreme acids.', image_path: '/images/objects/key_gold.png' },
  { id: 902, name: 'Glowing Amber Flask Relic', item_type: 'relic', description: 'A sealed glass phial containing an ancient luminous elixir.', image_path: '/images/objects/ruby_gem.png' },

  // Level 10 Items (GK 1)
  { id: 1001, name: 'Pharaoh Papyrus Key', item_type: 'key', description: 'An ancient ceremonial key preserved from the Library of Alexandria.', image_path: '/images/objects/key_gold.png' },
  { id: 1002, name: 'Alexandria Cartouche Relic', item_type: 'relic', description: 'A royal cartouche bearing ancient hieroglyphic inscriptions.', image_path: '/images/objects/ruby_gem.png' },

  // Level 14 Items (Physics 2)
  { id: 1401, name: 'Refraction Prism Key', item_type: 'key', description: 'A precision cut crystal key that bends torch light into radiant spectra.', image_path: '/images/objects/key_gold.png' },
  { id: 1402, name: 'Snell Law Scroll', item_type: 'clue', description: 'A diagram illustrating light passing from air into glass.', image_path: '/images/objects/scroll_clue.png' },

  // Level 15 Items (Physics 3)
  { id: 1501, name: 'Thermal Equilibrium Key', item_type: 'key', description: 'A bi-metallic key that aligns its teeth when reaching thermal equilibrium.', image_path: '/images/objects/key_gold.png' },
  { id: 1502, name: 'Carnot Cycle Chart', item_type: 'clue', description: 'An ancient pressure-volume thermodynamic diagram.', image_path: '/images/objects/scroll_clue.png' },

  // Level 16 Items (Physics 4)
  { id: 1601, name: 'Magnetic Lodestone Key', item_type: 'key', description: 'A magnetized iron key attracted toward hidden magnetic nodes.', image_path: '/images/objects/key_gold.png' },
  { id: 1602, name: 'Faraday Induction Relic', item_type: 'relic', description: 'A coiled copper talisman that sparks with induced electric current.', image_path: '/images/objects/ruby_gem.png' },

  // Level 17 Items (Physics 5)
  { id: 1701, name: 'Schrödinger Flux Key', item_type: 'key', description: 'A quantum superposition key existing simultaneously in open and closed states.', image_path: '/images/objects/key_gold.png' },
  { id: 1702, name: 'Planck Quantum Relic', item_type: 'relic', description: 'A pulsating dark-crystal relic emitting discrete packets of electromagnetic energy.', image_path: '/images/objects/ruby_gem.png' },

  // Level 18 Items (Chemistry 2)
  { id: 1801, name: 'Noble Gas Key', item_type: 'key', description: 'A glowing neon-infused glass key with a full outer valence shell.', image_path: '/images/objects/key_gold.png' },
  { id: 1802, name: 'Mendeleev Periodic Scroll', item_type: 'clue', description: 'An ancient manuscript arranging elements by atomic number.', image_path: '/images/objects/scroll_clue.png' },

  // Level 19 Items (Chemistry 3)
  { id: 1901, name: 'Ionic Bond Key', item_type: 'key', description: 'A crystalline salt key forged through electrostatic attraction between ions.', image_path: '/images/objects/key_gold.png' },
  { id: 1902, name: 'Electronegativity Chart', item_type: 'clue', description: 'A stone tablet detailing Pauling scale electronegativities.', image_path: '/images/objects/scroll_clue.png' },

  // Level 20 Items (Chemistry 4)
  { id: 2001, name: 'Catalytic Convergent Key', item_type: 'key', description: 'A platinum-coated key that lowers activation energy to open ancient seals.', image_path: '/images/objects/key_gold.png' },
  { id: 2002, name: 'Philosopher Crucible Relic', item_type: 'relic', description: 'An ancient alchemical vessel that never tarnishes under extreme oxidation.', image_path: '/images/objects/ruby_gem.png' },

  // Level 21 Items (Chemistry 5)
  { id: 2101, name: 'Avogadro Master Key', item_type: 'key', description: 'A key inscribed with 6.022 x 10^23, representing one mole of sacred atoms.', image_path: '/images/objects/key_gold.png' },
  { id: 2102, name: 'Elixir of Transmutation Relic', item_type: 'relic', description: 'An ancient golden amphora containing glowing quintessence.', image_path: '/images/objects/ruby_gem.png' },

  // Level 22 Items (GK 2)
  { id: 2201, name: 'Mesopotamian Cuneiform Key', item_type: 'key', description: 'A clay tablet key engraved with ancient Babylonian cuneiform script.', image_path: '/images/objects/key_gold.png' },
  { id: 2202, name: 'Silk Road Map Clue', item_type: 'clue', description: 'A parchment documenting merchant caravan routes across ancient Eurasia.', image_path: '/images/objects/scroll_clue.png' },

  // Level 23 Items (GK 3)
  { id: 2301, name: 'Astrolabe Meridian Key', item_type: 'key', description: 'A brass navigational key engraved with celestial latitude coordinates.', image_path: '/images/objects/key_gold.png' },
  { id: 2302, name: 'Tectonic Plates Chart', item_type: 'clue', description: 'A carved stone globe highlighting continental boundaries.', image_path: '/images/objects/scroll_clue.png' },

  // Level 24 Items (GK 4)
  { id: 2401, name: 'Megalith Sun Key', item_type: 'key', description: 'A sandstone key aligned with the summer solstice dawn.', image_path: '/images/objects/key_gold.png' },
  { id: 2402, name: 'Rosetta Inscription Relic', item_type: 'relic', description: 'A tri-lingual granite stele translating Egyptian hieroglyphs, Demotic, and Ancient Greek.', image_path: '/images/objects/ruby_gem.png' },

  // Level 25 Items (GK 5)
  { id: 2501, name: 'Crown of Alexandria Key', item_type: 'key', description: 'A radiant gilded laurel key symbolizing the pinnacle of classical world wisdom.', image_path: '/images/objects/key_gold.png' },
  { id: 2502, name: 'Antikythera Mechanism Relic', item_type: 'relic', description: 'An ancient Greek geared analog computer calculating celestial cycles.', image_path: '/images/objects/ruby_gem.png' }
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
  ...makeRoomObjects(10, 1001, 'statue', null, null, 1002), // Level 10: Key behind Falcon Statue
  ...makeRoomObjects(11, 1101, 'curtains', 1102, 'table', null), // Level 11 (CS 3): Key behind Velvet Tapestry
  ...makeRoomObjects(12, 1201, 'table', null, null, 1202),       // Level 12 (CS 4): Key inside Altar Table
  ...makeRoomObjects(13, 1301, 'statue', null, null, 1302),      // Level 13 (CS 5): Key behind Falcon Statue

  // Physics Levels 2 - 5
  ...makeRoomObjects(14, 1401, 'vase', 1402, 'table', null),       // Level 14 (Physics 2): Key in Clay Urn
  ...makeRoomObjects(15, 1501, 'curtains', 1502, 'table', null),   // Level 15 (Physics 3): Key behind Velvet Tapestry
  ...makeRoomObjects(16, 1601, 'table', null, null, 1602),         // Level 16 (Physics 4): Key inside Altar Table
  ...makeRoomObjects(17, 1701, 'statue', null, null, 1702),        // Level 17 (Physics 5): Key behind Falcon Statue

  // Chemistry Levels 2 - 5
  ...makeRoomObjects(18, 1801, 'rug', 1802, 'table', null),        // Level 18 (Chemistry 2): Key under Rug
  ...makeRoomObjects(19, 1901, 'vase', 1902, 'curtains', null),    // Level 19 (Chemistry 3): Key in Clay Urn
  ...makeRoomObjects(20, 2001, 'curtains', null, null, 2002),      // Level 20 (Chemistry 4): Key behind Velvet Tapestry
  ...makeRoomObjects(21, 2101, 'statue', null, null, 2102),        // Level 21 (Chemistry 5): Key behind Falcon Statue

  // General Knowledge Levels 2 - 5
  ...makeRoomObjects(22, 2201, 'table', 2202, 'curtains', null),   // Level 22 (GK 2): Key inside Altar Table
  ...makeRoomObjects(23, 2301, 'curtains', 2302, 'table', null),   // Level 23 (GK 3): Key behind Velvet Tapestry
  ...makeRoomObjects(24, 2401, 'rug', null, null, 2402),           // Level 24 (GK 4): Key under Rug
  ...makeRoomObjects(25, 2501, 'statue', null, null, 2502)         // Level 25 (GK 5): Key behind Falcon Statue
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

  // Level 11: Computer Science - Medium (The Network Nexus)
  { id: 21, level_id: 11, question_text: 'Which networking layer in the standard 7-layer OSI model is responsible for end-to-end communication, reliability, flow control, and port numbers (e.g., TCP and UDP)?', question_type: 'multiple_choice', option_a: 'Physical Layer', option_b: 'Data Link Layer', option_c: 'Network Layer', option_d: 'Transport Layer', correct_answer: 'Transport Layer', hint: 'Think of the layer that transports segments between hosts using TCP or UDP.', explanation: 'The Transport Layer (Layer 4) handles host-to-host communication, port addressing, and reliability.', points: 15 },
  { id: 22, level_id: 11, question_text: 'In computer networking, what standard port number is designated for secure web browsing over HTTPS?', question_type: 'multiple_choice', option_a: '21', option_b: '80', option_c: '443', option_d: '8080', correct_answer: '443', hint: 'Standard HTTP uses port 80, while encrypted HTTPS uses this port.', explanation: 'Port 443 is the standard default port for HTTPS encrypted traffic (SSL/TLS).', points: 15 },

  // Level 12: Computer Science - Medium (The Database Vault)
  { id: 23, level_id: 12, question_text: 'In relational database design (RDBMS), which SQL keyword is used to eliminate duplicate rows from the returned query result set?', question_type: 'multiple_choice', option_a: 'UNIQUE', option_b: 'DISTINCT', option_c: 'FILTER', option_d: 'GROUP BY', correct_answer: 'DISTINCT', hint: 'SELECT ______ column_name FROM table_name.', explanation: 'The SELECT DISTINCT statement is used to return only unique, distinct values.', points: 15 },
  { id: 24, level_id: 12, question_text: 'In database transaction management, what does the letter "A" stand for in the ACID properties acronym?', question_type: 'multiple_choice', option_a: 'Atomicity', option_b: 'Availability', option_c: 'Authentication', option_d: 'Asynchronous', correct_answer: 'Atomicity', hint: 'Transactions are "all or nothing", indivisible like an atom.', explanation: 'Atomicity ensures that all statements in a transaction either execute completely or roll back entirely.', points: 15 },

  // Level 13: Computer Science - Hard (The Cyber Guardian Sanctum)
  { id: 25, level_id: 13, question_text: 'In theoretical computer science, which mathematical model of computation defines an abstract machine with an infinite tape and a read/write head?', question_type: 'multiple_choice', option_a: 'Finite State Machine', option_b: 'Turing Machine', option_c: 'Pushdown Automaton', option_d: 'Markov Chain', correct_answer: 'Turing Machine', hint: 'Named after the British mathematician Alan Turing, considered the father of computer science.', explanation: 'A Turing Machine is a fundamental theoretical model that formalizes the concept of an algorithm and universal computation.', points: 20 },
  { id: 26, level_id: 13, question_text: 'In computational complexity theory, what Millennium Prize Problem asks whether every problem whose solution can be quickly verified by a computer can also be quickly solved by one?', question_type: 'multiple_choice', option_a: 'P versus NP', option_b: 'Halting Problem', option_c: 'Collatz Conjecture', option_d: 'Traveling Salesperson Problem', correct_answer: 'P versus NP', hint: 'It compares polynomial time solvable problems (P) with polynomial time verifiable problems (NP).', explanation: 'The P versus NP problem asks whether P = NP, one of the most prominent unsolved problems in computer science.', points: 20 },

  // Level 8: Physics - Easy (The Gravity Sanctum)
  { id: 5, level_id: 8, question_text: 'What is the approximate standard acceleration due to Earth gravity on the surface?', question_type: 'multiple_choice', option_a: '9.8 m/s²', option_b: '5.5 m/s²', option_c: '12.3 m/s²', option_d: '1.6 m/s²', correct_answer: '9.8 m/s²', hint: 'It is close to 10 m/s², specifically between 9 and 10.', explanation: 'Standard gravitational acceleration g is approximately 9.80665 m/s².', points: 10 },
  { id: 18, level_id: 8, question_text: 'According to Newton Second Law of Motion, what is the formula for force (F) given mass (m) and acceleration (a)?', question_type: 'multiple_choice', option_a: 'F = m / a', option_b: 'F = m * a', option_c: 'F = m + a', option_d: 'F = 0.5 * m * a^2', correct_answer: 'F = m * a', hint: 'Force equals mass times acceleration.', explanation: 'Newton second law is famously expressed as F = m * a.', points: 10 },

  // Level 9: Chemistry - Easy (The Alchemist Laboratory)
  { id: 6, level_id: 9, question_text: 'What is the chemical formula for pure water?', question_type: 'multiple_choice', option_a: 'CO2', option_b: 'NaCl', option_c: 'H2O', option_d: 'CH4', correct_answer: 'H2O', hint: 'It consists of two Hydrogen atoms and one Oxygen atom.', explanation: 'H2O is two Hydrogen atoms bonded to one Oxygen atom.', points: 10 },
  { id: 19, level_id: 9, question_text: 'On the standard pH scale, what pH value represents a completely neutral solution at 25°C?', question_type: 'multiple_choice', option_a: '0', option_b: '7', option_c: '10', option_d: '14', correct_answer: '7', hint: 'Pure water has this neutral pH value right in the middle of 0 to 14.', explanation: 'A pH of 7 is neutral; values below 7 are acidic, and values above 7 are basic.', points: 10 },

  // Level 10: General Knowledge - Easy (The Archive of Antiquity)
  { id: 7, level_id: 10, question_text: 'Which ancient wonder of the world stood in the harbor of Alexandria, Egypt?', question_type: 'multiple_choice', option_a: 'Colossus of Rhodes', option_b: 'Lighthouse of Alexandria', option_c: 'Hanging Gardens of Babylon', option_d: 'Statue of Zeus at Olympia', correct_answer: 'Lighthouse of Alexandria', hint: 'It guided sailors with a giant mirrored beacon.', explanation: 'The Pharos of Alexandria was the famous ancient lighthouse.', points: 10 },
  { id: 20, level_id: 10, question_text: 'Which great river flowed through ancient Egypt, enabling its civilization to flourish in the desert?', question_type: 'multiple_choice', option_a: 'Amazon River', option_b: 'Nile River', option_c: 'Yangtze River', option_d: 'Danube River', correct_answer: 'Nile River', hint: 'Known as the longest river in Africa.', explanation: 'The annual flooding of the Nile River provided fertile soil for Egyptian agriculture.', points: 10 },

  // Level 14: Physics - Easy (The Optics Hall)
  { id: 27, level_id: 14, question_text: 'What optical phenomenon describes the bending of light as it passes from one medium to another (e.g., from air into water)?', question_type: 'multiple_choice', option_a: 'Reflection', option_b: 'Refraction', option_c: 'Diffraction', option_d: 'Polarization', correct_answer: 'Refraction', hint: 'Think of how a straw appears bent when placed in a glass of water.', explanation: 'Refraction is the change in direction of a wave passing from one medium to another caused by its change in speed.', points: 10 },
  { id: 28, level_id: 14, question_text: 'What is the approximate speed of light in a vacuum, rounded to standard metric units?', question_type: 'multiple_choice', option_a: '300,000 km/s', option_b: '150,000 km/s', option_c: '1,000,000 km/s', option_d: '30,000 km/s', correct_answer: '300,000 km/s', hint: 'Approximately 3 times 10 to the power of 8 meters per second.', explanation: 'The speed of light in a vacuum (c) is approximately 299,792 kilometers per second (~300,000 km/s).', points: 10 },

  // Level 15: Physics - Medium (The Thermodynamics Vault)
  { id: 29, level_id: 15, question_text: 'What fundamental physical temperature represents Absolute Zero on the Celsius scale, where all classical molecular motion ceases?', question_type: 'multiple_choice', option_a: '0°C', option_b: '-100°C', option_c: '-273.15°C', option_d: '-459.67°C', correct_answer: '-273.15°C', hint: '0 Kelvin corresponds to this negative Celsius value.', explanation: 'Absolute zero (0 K) equals -273.15°C, the theoretical temperature at which entropy reaches its minimum.', points: 15 },
  { id: 30, level_id: 15, question_text: 'Which law of thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another?', question_type: 'multiple_choice', option_a: 'Zeroth Law', option_b: 'First Law', option_c: 'Second Law', option_d: 'Third Law', correct_answer: 'First Law', hint: 'Also known as the Law of Conservation of Energy.', explanation: 'The First Law of Thermodynamics establishes the conservation of energy: ΔU = Q - W.', points: 15 },

  // Level 16: Physics - Medium (The Electromagnetism Crypt)
  { id: 31, level_id: 16, question_text: 'According to Ohm Law, what is the formula relating Voltage (V), Current (I), and Resistance (R)?', question_type: 'multiple_choice', option_a: 'V = I / R', option_b: 'V = I * R', option_c: 'V = I + R', option_d: 'V = R / I', correct_answer: 'V = I * R', hint: 'Voltage equals current multiplied by resistance.', explanation: 'Ohm Law states that electric potential difference V equals current I multiplied by resistance R (V = I * R).', points: 15 },
  { id: 32, level_id: 16, question_text: 'What standard SI unit of measurement is used to quantify magnetic flux density?', question_type: 'multiple_choice', option_a: 'Tesla', option_b: 'Joule', option_c: 'Watt', option_d: 'Volt', correct_answer: 'Tesla', hint: 'Named after the pioneering electrical engineer Nikola Tesla.', explanation: 'The Tesla (T) is the SI unit of magnetic field strength and magnetic flux density.', points: 15 },

  // Level 17: Physics - Hard (The Quantum Chamber of Titans)
  { id: 33, level_id: 17, question_text: 'Which quantum physics principle states that one cannot simultaneously measure both the exact position and momentum of a particle?', question_type: 'multiple_choice', option_a: 'Heisenberg Uncertainty Principle', option_b: 'Pauli Exclusion Principle', option_c: 'Photoelectric Effect', option_d: 'Doppler Effect', correct_answer: 'Heisenberg Uncertainty Principle', hint: 'Formulated by German physicist Werner Heisenberg in 1927.', explanation: 'Heisenberg Uncertainty Principle states that Δx * Δp >= ħ/2, setting a fundamental limit on simultaneous measurement.', points: 20 },
  { id: 34, level_id: 17, question_text: 'In Einstein famous mass-energy equivalence equation E = mc^2, what physical constant does the letter "c" represent?', question_type: 'multiple_choice', option_a: 'Speed of Sound', option_b: 'Speed of Light', option_c: 'Coulomb Constant', option_d: 'Centripetal Force', correct_answer: 'Speed of Light', hint: 'The maximum speed at which all energy and matter in the universe can travel.', explanation: 'In E = mc^2, c is the speed of light in a vacuum (~3 * 10^8 m/s).', points: 20 },

  // Level 18: Chemistry - Easy (The Periodic Vault)
  { id: 35, level_id: 18, question_text: 'What is the lightest and most abundant chemical element in the universe, having atomic number 1?', question_type: 'multiple_choice', option_a: 'Helium', option_b: 'Hydrogen', option_c: 'Oxygen', option_d: 'Carbon', correct_answer: 'Hydrogen', hint: 'Symbol H, consisting of a single proton and electron.', explanation: 'Hydrogen (H) has atomic number 1 and constitutes approximately 75% of the baryonic mass of the universe.', points: 10 },
  { id: 36, level_id: 18, question_text: 'Which group of chemical elements on the periodic table are odorless, colorless, and largely inert due to full valence shells?', question_type: 'multiple_choice', option_a: 'Alkali Metals', option_b: 'Halogens', option_c: 'Noble Gases', option_d: 'Transition Metals', correct_answer: 'Noble Gases', hint: 'Includes Helium, Neon, Argon, Krypton, and Xenon.', explanation: 'Noble Gases (Group 18) possess complete valence electron shells, making them exceptionally stable and unreactive.', points: 10 },

  // Level 19: Chemistry - Medium (The Crystal Lattice Sanctum)
  { id: 37, level_id: 19, question_text: 'What type of chemical bond is formed when atoms share one or more pairs of valence electrons?', question_type: 'multiple_choice', option_a: 'Ionic Bond', option_b: 'Covalent Bond', option_c: 'Hydrogen Bond', option_d: 'Metallic Bond', correct_answer: 'Covalent Bond', hint: 'Think of molecular bonds like the bonds between hydrogen and oxygen in water.', explanation: 'A covalent bond involves the sharing of electron pairs between atoms.', points: 15 },
  { id: 38, level_id: 19, question_text: 'What is the common chemical name for ordinary table salt, with formula NaCl?', question_type: 'multiple_choice', option_a: 'Potassium Chloride', option_b: 'Sodium Chloride', option_c: 'Calcium Carbonate', option_d: 'Sodium Bicarbonate', correct_answer: 'Sodium Chloride', hint: 'Composed of Sodium (Na) and Chlorine (Cl) ions.', explanation: 'Sodium chloride (NaCl) is an ionic compound commonly known as table salt.', points: 15 },

  // Level 20: Chemistry - Medium (The Reaction Crucible)
  { id: 39, level_id: 20, question_text: 'What substance speeds up the rate of a chemical reaction without undergoing any permanent chemical change itself?', question_type: 'multiple_choice', option_a: 'Reactant', option_b: 'Inhibitor', option_c: 'Catalyst', option_d: 'Solvent', correct_answer: 'Catalyst', hint: 'It lowers the activation energy of the reaction.', explanation: 'A catalyst accelerates chemical reactions without being consumed in the overall process.', points: 15 },
  { id: 40, level_id: 20, question_text: 'In chemistry, what term describes a reaction that releases thermal energy (heat) into its surroundings?', question_type: 'multiple_choice', option_a: 'Endothermic', option_b: 'Exothermic', option_c: 'Isothermal', option_d: 'Adiabatic', correct_answer: 'Exothermic', hint: 'Think of combustion or campfire warmth ("exo" meaning outside).', explanation: 'Exothermic reactions release energy, usually in the form of heat or light, to their surroundings.', points: 15 },

  // Level 21: Chemistry - Hard (The Great Alchemist Apex)
  { id: 41, level_id: 21, question_text: 'What fundamental constant represents the number of constituent particles (atoms or molecules) in one mole of a substance?', question_type: 'multiple_choice', option_a: 'Planck Constant', option_b: 'Avogadro Number', option_c: 'Boltzmann Constant', option_d: 'Faraday Constant', correct_answer: 'Avogadro Number', hint: 'Approximately equal to 6.022 * 10^23 particles per mole.', explanation: 'Avogadro number (N_A ≈ 6.02214076 * 10^23 mol^-1) defines the number of units in one mole of substance.', points: 20 },
  { id: 42, level_id: 21, question_text: 'What allotrope of pure elemental carbon is arranged in an extraordinarily rigid tetrahedral lattice, making it the hardest natural mineral?', question_type: 'multiple_choice', option_a: 'Graphite', option_b: 'Graphene', option_c: 'Diamond', option_d: 'Fullerene', correct_answer: 'Diamond', hint: 'A precious gemstone famed for its brilliance and hardness.', explanation: 'Diamond is an allotrope of carbon where each carbon atom is covalently bonded to four others in a tetrahedral lattice.', points: 20 },

  // Level 22: General Knowledge - Easy (The Hall of Empires)
  { id: 43, level_id: 22, question_text: 'Which ancient civilization developed cuneiform script, considered one of the earliest systems of writing in human history?', question_type: 'multiple_choice', option_a: 'Mesopotamia', option_b: 'Ancient Greece', option_c: 'Mayan Empire', option_d: 'Inca Empire', correct_answer: 'Mesopotamia', hint: 'Located in the fertile crescent between the Tigris and Euphrates rivers.', explanation: 'Cuneiform writing was developed by the ancient Sumerians of Mesopotamia around 3400 BCE.', points: 10 },
  { id: 44, level_id: 22, question_text: 'What famous historic network of trade routes connected East Asia and the Mediterranean for centuries?', question_type: 'multiple_choice', option_a: 'Amber Road', option_b: 'Silk Road', option_c: 'Spice Route', option_d: 'Incense Route', correct_answer: 'Silk Road', hint: 'Named after the luxurious Chinese fabric carried along its paths.', explanation: 'The Silk Road was an ancient network of Eurasian trade routes active from the Han dynasty until the Ottoman boycott.', points: 10 },

  // Level 23: General Knowledge - Medium (The Geographic Vault)
  { id: 45, level_id: 23, question_text: 'What is the highest mountain peak above sea level on Earth, located in the Himalayas?', question_type: 'multiple_choice', option_a: 'K2', option_b: 'Mount Kilimanjaro', option_c: 'Mount Everest', option_d: 'Denali', correct_answer: 'Mount Everest', hint: 'Rises to an elevation of 8,848.86 meters on the border of Nepal and China.', explanation: 'Mount Everest is Earth highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.', points: 15 },
  { id: 46, level_id: 23, question_text: 'What is the deepest known oceanic trench on Earth, plunging nearly 11,000 meters in the western Pacific Ocean?', question_type: 'multiple_choice', option_a: 'Java Trench', option_b: 'Puerto Rico Trench', option_c: 'Mariana Trench', option_d: 'Tonga Trench', correct_answer: 'Mariana Trench', hint: 'Its lowest point is known as Challenger Deep.', explanation: 'The Mariana Trench in the western Pacific Ocean contains the deepest known point on Earth, the Challenger Deep (~10,994 m).', points: 15 },

  // Level 24: General Knowledge - Medium (The Lost Monoliths)
  { id: 47, level_id: 24, question_text: 'Which ancient Mesoamerican civilization constructed the iconic step-pyramid El Castillo at Chichen Itza in the Yucatan Peninsula?', question_type: 'multiple_choice', option_a: 'Aztec', option_b: 'Maya', option_c: 'Inca', option_d: 'Olmec', correct_answer: 'Maya', hint: 'Known for their advanced astronomical calendar and hieroglyphic script.', explanation: 'El Castillo (Temple of Kukulcan) was built by the Maya civilization between the 8th and 12th centuries CE.', points: 15 },
  { id: 48, level_id: 24, question_text: 'What historic artifact discovered in 1799 provided the crucial bilingual key to deciphering ancient Egyptian hieroglyphs?', question_type: 'multiple_choice', option_a: 'Dead Sea Scrolls', option_b: 'Rosetta Stone', option_c: 'Code of Hammurabi', option_d: 'Phaistos Disc', correct_answer: 'Rosetta Stone', hint: 'A granodiorite stele bearing decrees inscribed in three distinct scripts.', explanation: 'The Rosetta Stone contained inscriptions in Hieroglyphic, Demotic, and Ancient Greek, unlocking the translation of hieroglyphs.', points: 15 },

  // Level 25: General Knowledge - Hard (The Apex of Civilizations)
  { id: 49, level_id: 25, question_text: 'Which ancient Greek philosopher and polymath was the tutor of Alexander the Great and wrote foundational treatises on logic, physics, and ethics?', question_type: 'multiple_choice', option_a: 'Socrates', option_b: 'Plato', option_c: 'Aristotle', option_d: 'Epicurus', correct_answer: 'Aristotle', hint: 'Student of Plato and founder of the Lyceum in Athens.', explanation: 'Aristotle (384–322 BCE) tutored Alexander the Great and founded the Peripatetic school of philosophy.', points: 20 },
  { id: 50, level_id: 25, question_text: 'What ancient Greek mechanical artifact, salvaged from a shipwreck off the coast of Greece in 1901, is considered the world earliest known analog computer?', question_type: 'multiple_choice', option_a: 'Antikythera Mechanism', option_b: 'Archimedes Sphere', option_c: 'Heron Engine', option_d: 'Eratosthenes Armillary', correct_answer: 'Antikythera Mechanism', hint: 'A complex clockwork mechanism of bronze gears used to predict astronomical positions.', explanation: 'The Antikythera mechanism was an ancient Greek hand-powered orrery used to calculate and predict astronomical positions and eclipses.', points: 20 }
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

  { id: 21, level_id: 11, requirement_type: 'item_collected', requirement_value: '1101', description: 'Collect the Ethernet Cipher Key hidden behind the hanging velvet tapestry.' },
  { id: 22, level_id: 11, requirement_type: 'question_answered', requirement_value: '21', description: 'Correctly solve the OSI transport layer cipher.' },

  { id: 23, level_id: 12, requirement_type: 'item_collected', requirement_value: '1201', description: 'Collect the Relational Schema Key hidden inside the carved stone altar table.' },
  { id: 24, level_id: 12, requirement_type: 'question_answered', requirement_value: '23', description: 'Correctly solve the SQL DISTINCT query riddle.' },

  { id: 25, level_id: 13, requirement_type: 'item_collected', requirement_value: '1301', description: 'Collect the Turing Master Key hidden behind the guardian falcon statue.' },
  { id: 26, level_id: 13, requirement_type: 'question_answered', requirement_value: '25', description: 'Correctly solve the Turing Machine theoretical model challenge.' },

  { id: 15, level_id: 8, requirement_type: 'item_collected', requirement_value: '801', description: 'Collect the Pendulum Fulcrum Key hidden behind the hanging velvet tapestry.' },
  { id: 16, level_id: 8, requirement_type: 'question_answered', requirement_value: '5', description: 'Correctly solve the gravitational acceleration question.' },

  { id: 17, level_id: 9, requirement_type: 'item_collected', requirement_value: '901', description: 'Collect the Alchemical Catalyst Key hidden inside the carved stone altar table.' },
  { id: 18, level_id: 9, requirement_type: 'question_answered', requirement_value: '6', description: 'Correctly solve the pure water chemical formula question.' },

  { id: 19, level_id: 10, requirement_type: 'item_collected', requirement_value: '1001', description: 'Collect the Pharaoh Papyrus Key hidden behind the guardian falcon statue.' },
  { id: 20, level_id: 10, requirement_type: 'question_answered', requirement_value: '7', description: 'Correctly solve the ancient wonder of the world question.' },

  // Level 14 Requirements (Physics 2)
  { id: 27, level_id: 14, requirement_type: 'item_collected', requirement_value: '1401', description: 'Collect the Refraction Prism Key hidden inside the ancient clay urn.' },
  { id: 28, level_id: 14, requirement_type: 'question_answered', requirement_value: '27', description: 'Correctly solve the light refraction riddle.' },

  // Level 15 Requirements (Physics 3)
  { id: 29, level_id: 15, requirement_type: 'item_collected', requirement_value: '1501', description: 'Collect the Thermal Equilibrium Key hidden behind the hanging velvet tapestry.' },
  { id: 30, level_id: 15, requirement_type: 'question_answered', requirement_value: '29', description: 'Correctly solve the thermodynamics temperature challenge.' },

  // Level 16 Requirements (Physics 4)
  { id: 31, level_id: 16, requirement_type: 'item_collected', requirement_value: '1601', description: 'Collect the Magnetic Lodestone Key hidden inside the carved stone altar table.' },
  { id: 32, level_id: 16, requirement_type: 'question_answered', requirement_value: '31', description: 'Correctly solve the Ohm Law electrical cipher.' },

  // Level 17 Requirements (Physics 5)
  { id: 33, level_id: 17, requirement_type: 'item_collected', requirement_value: '1701', description: 'Collect the Schrödinger Flux Key hidden behind the guardian falcon statue.' },
  { id: 34, level_id: 17, requirement_type: 'question_answered', requirement_value: '33', description: 'Correctly solve the quantum uncertainty challenge.' },

  // Level 18 Requirements (Chemistry 2)
  { id: 35, level_id: 18, requirement_type: 'item_collected', requirement_value: '1801', description: 'Collect the Noble Gas Key hidden under the floor rug.' },
  { id: 36, level_id: 18, requirement_type: 'question_answered', requirement_value: '35', description: 'Correctly solve the hydrogen element riddle.' },

  // Level 19 Requirements (Chemistry 3)
  { id: 37, level_id: 19, requirement_type: 'item_collected', requirement_value: '1901', description: 'Collect the Ionic Bond Key hidden inside the ancient clay urn.' },
  { id: 38, level_id: 19, requirement_type: 'question_answered', requirement_value: '37', description: 'Correctly solve the chemical bonding question.' },

  // Level 20 Requirements (Chemistry 4)
  { id: 39, level_id: 20, requirement_type: 'item_collected', requirement_value: '2001', description: 'Collect the Catalytic Convergent Key hidden behind the hanging velvet tapestry.' },
  { id: 40, level_id: 20, requirement_type: 'question_answered', requirement_value: '39', description: 'Correctly solve the reaction catalyst riddle.' },

  // Level 21 Requirements (Chemistry 5)
  { id: 41, level_id: 21, requirement_type: 'item_collected', requirement_value: '2101', description: 'Collect the Avogadro Master Key hidden behind the guardian falcon statue.' },
  { id: 42, level_id: 21, requirement_type: 'question_answered', requirement_value: '41', description: 'Correctly solve the Avogadro constant calculation.' },

  // Level 22 Requirements (GK 2)
  { id: 43, level_id: 22, requirement_type: 'item_collected', requirement_value: '2201', description: 'Collect the Mesopotamian Cuneiform Key hidden inside the carved stone altar table.' },
  { id: 44, level_id: 22, requirement_type: 'question_answered', requirement_value: '43', description: 'Correctly answer the ancient writing system question.' },

  // Level 23 Requirements (GK 3)
  { id: 45, level_id: 23, requirement_type: 'item_collected', requirement_value: '2301', description: 'Collect the Astrolabe Meridian Key hidden behind the hanging velvet tapestry.' },
  { id: 46, level_id: 23, requirement_type: 'question_answered', requirement_value: '45', description: 'Correctly answer the highest mountain peak challenge.' },

  // Level 24 Requirements (GK 4)
  { id: 47, level_id: 24, requirement_type: 'item_collected', requirement_value: '2401', description: 'Collect the Megalith Sun Key hidden under the floor rug.' },
  { id: 48, level_id: 24, requirement_type: 'question_answered', requirement_value: '47', description: 'Correctly solve the Maya pyramid history question.' },

  // Level 25 Requirements (GK 5)
  { id: 49, level_id: 25, requirement_type: 'item_collected', requirement_value: '2501', description: 'Collect the Crown of Alexandria Key hidden behind the guardian falcon statue.' },
  { id: 50, level_id: 25, requirement_type: 'question_answered', requirement_value: '49', description: 'Correctly answer the classical philosopher question.' }
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
