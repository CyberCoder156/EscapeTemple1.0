-- ============================================================
-- EscapeTemple: Complete Sample Data Seed Script
-- Description: Seeds initial subjects, items, levels, objects,
-- questions, and requirements for development and testing.
-- Uses ON DUPLICATE KEY UPDATE so it is completely idempotent.
-- ============================================================

USE escapetemple;

-- 1. SEED SUBJECTS
INSERT INTO subjects (id, name, description) VALUES
(1, 'Mathematics', 'Unravel ancient geometric equations, algebra riddles, and sacred temple geometry.'),
(2, 'Computer Science', 'Decode algorithmic glyphs, binary chambers, and computational logic puzzles.'),
(3, 'Physics', 'Master kinetic pendulums, gravity mechanics, and ancient optical reflections.'),
(4, 'Chemistry', 'Brew elemental mixtures, balance sacred equations, and decode alchemical reactions.'),
(5, 'General Knowledge', 'Test ancient world history, geographic wonders, and lost civilization lore.')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- 2. SEED ITEMS
INSERT INTO items (id, name, item_type, description, image_path) VALUES
(1, 'Golden Key', 'key', 'A heavy golden key engraved with the temple guardian emblem.', '/images/objects/key_gold.png'),
(2, 'Ancient Papyrus Clue', 'clue', 'A torn parchment displaying the equation: 3x + 15 = 45.', '/images/objects/scroll_clue.png'),
(3, 'Ruby Gemstone', 'relic', 'A glowing crimson gem discovered inside the reinforced wooden chest.', '/images/objects/ruby_gem.png'),
(4, 'Stone Hieroglyph Fragment', 'clue', 'A carved stone tablet inscribed with ancient temple instructions.', '/images/objects/stone_tablet.png'),

(201, 'Silver Whisper Key', 'key', 'An engraved silver key inscribed with ancient mathematical symbols.', '/images/objects/key_gold.png'),
(202, 'Whispering Scroll Clue', 'clue', 'A scroll fragment describing the square root of 144.', '/images/objects/scroll_clue.png'),

(301, 'Bronze Vault Key', 'key', 'A heavy bronze key etched with geometric triangles.', '/images/objects/key_gold.png'),
(302, 'Triangular Papyrus Clue', 'clue', 'A blueprint of a right triangle with sides 6, 8, 10.', '/images/objects/scroll_clue.png'),

(401, 'Prime Treasury Key', 'key', 'A radiant golden key bearing the sequence of first prime numbers.', '/images/objects/key_gold.png'),
(402, 'Golden Ingot Relic', 'relic', 'A solid gold bar stamped with the ancient pharaoh seal.', '/images/objects/ruby_gem.png'),

(501, 'Sphinx Sanctuary Key', 'key', 'A mystical obsidian key crowned with the crest of the guardian sphinx.', '/images/objects/key_gold.png'),
(502, 'Sacred Scarab Relic', 'relic', 'A carved lapis lazuli scarab emblem.', '/images/objects/ruby_gem.png'),

(601, 'Crystal Logic Key', 'key', 'A translucent crystal key engraved with binary patterns 0101.', '/images/objects/key_gold.png'),
(602, 'Punched Card Clue', 'clue', 'An ancient perforated parchment representing boolean logic.', '/images/objects/scroll_clue.png'),

(701, 'Obsidian Node Key', 'key', 'A dark obsidian key shaped like a graph vertex and branching edges.', '/images/objects/key_gold.png'),
(702, 'Cipher Parchment Clue', 'clue', 'A diagram of recursive binary tree traversal.', '/images/objects/scroll_clue.png'),

(1101, 'Ethernet Cipher Key', 'key', 'A glowing optical key embedded with a braided copper core.', '/images/objects/key_gold.png'),
(1102, 'Packet Header Clue', 'clue', 'A tablet deciphering IPv4 header fields and subnet masks.', '/images/objects/scroll_clue.png'),

(1201, 'Relational Schema Key', 'key', 'A heavy brass key shaped like a foreign key linking ancient schemas.', '/images/objects/key_gold.png'),
(1202, 'Golden Ledger Relic', 'relic', 'A sacred golden record detailing transactional integrity and ACID properties.', '/images/objects/ruby_gem.png'),

(1301, 'Turing Master Key', 'key', 'A master automaton key inscribed with finite state transition tables.', '/images/objects/key_gold.png'),
(1302, 'Lapis Automaton Core', 'relic', 'A humming computational matrix stone capable of universal computation.', '/images/objects/ruby_gem.png'),

(801, 'Pendulum Fulcrum Key', 'key', 'A brass key balanced with a precision counterweight.', '/images/objects/key_gold.png'),
(802, 'Prism Crystal Relic', 'relic', 'A triangular prism that separates torch light into rainbow bands.', '/images/objects/ruby_gem.png'),

(901, 'Alchemical Catalyst Key', 'key', 'An iridescent elemental key resistant to extreme acids.', '/images/objects/key_gold.png'),
(902, 'Glowing Amber Flask Relic', 'relic', 'A sealed glass phial containing an ancient luminous elixir.', '/images/objects/ruby_gem.png'),

(1001, 'Pharaoh Papyrus Key', 'key', 'An ancient ceremonial key preserved from the Library of Alexandria.', '/images/objects/key_gold.png'),
(1002, 'Alexandria Cartouche Relic', 'relic', 'A royal cartouche bearing ancient hieroglyphic inscriptions.', '/images/objects/ruby_gem.png'),

(1401, 'Refraction Prism Key', 'key', 'A precision cut crystal key that bends torch light into radiant spectra.', '/images/objects/key_gold.png'),
(1402, 'Snell Law Scroll', 'clue', 'A diagram illustrating light passing from air into glass.', '/images/objects/scroll_clue.png'),

(1501, 'Thermal Equilibrium Key', 'key', 'A bi-metallic key that aligns its teeth when reaching thermal equilibrium.', '/images/objects/key_gold.png'),
(1502, 'Carnot Cycle Chart', 'clue', 'An ancient pressure-volume thermodynamic diagram.', '/images/objects/scroll_clue.png'),

(1601, 'Magnetic Lodestone Key', 'key', 'A magnetized iron key attracted toward hidden magnetic nodes.', '/images/objects/key_gold.png'),
(1602, 'Faraday Induction Relic', 'relic', 'A coiled copper talisman that sparks with induced electric current.', '/images/objects/ruby_gem.png'),

(1701, 'Schrödinger Flux Key', 'key', 'A quantum superposition key existing simultaneously in open and closed states.', '/images/objects/key_gold.png'),
(1702, 'Planck Quantum Relic', 'relic', 'A pulsating dark-crystal relic emitting discrete packets of electromagnetic energy.', '/images/objects/ruby_gem.png'),

(1801, 'Noble Gas Key', 'key', 'A glowing neon-infused glass key with a full outer valence shell.', '/images/objects/key_gold.png'),
(1802, 'Mendeleev Periodic Scroll', 'clue', 'An ancient manuscript arranging elements by atomic number.', '/images/objects/scroll_clue.png'),

(1901, 'Ionic Bond Key', 'key', 'A crystalline salt key forged through electrostatic attraction between ions.', '/images/objects/key_gold.png'),
(1902, 'Electronegativity Chart', 'clue', 'A stone tablet detailing Pauling scale electronegativities.', '/images/objects/scroll_clue.png'),

(2001, 'Catalytic Convergent Key', 'key', 'A platinum-coated key that lowers activation energy to open ancient seals.', '/images/objects/key_gold.png'),
(2002, 'Philosopher Crucible Relic', 'relic', 'An ancient alchemical vessel that never tarnishes under extreme oxidation.', '/images/objects/ruby_gem.png'),

(2101, 'Avogadro Master Key', 'key', 'A key inscribed with 6.022 x 10^23, representing one mole of sacred atoms.', '/images/objects/key_gold.png'),
(2102, 'Elixir of Transmutation Relic', 'relic', 'An ancient golden amphora containing glowing quintessence.', '/images/objects/ruby_gem.png'),

(2201, 'Mesopotamian Cuneiform Key', 'key', 'A clay tablet key engraved with ancient Babylonian cuneiform script.', '/images/objects/key_gold.png'),
(2202, 'Silk Road Map Clue', 'clue', 'A parchment documenting merchant caravan routes across ancient Eurasia.', '/images/objects/scroll_clue.png'),

(2301, 'Astrolabe Meridian Key', 'key', 'A brass navigational key engraved with celestial latitude coordinates.', '/images/objects/key_gold.png'),
(2302, 'Tectonic Plates Chart', 'clue', 'A carved stone globe highlighting continental boundaries.', '/images/objects/scroll_clue.png'),

(2401, 'Megalith Sun Key', 'key', 'A sandstone key aligned with the summer solstice dawn.', '/images/objects/key_gold.png'),
(2402, 'Rosetta Inscription Relic', 'relic', 'A tri-lingual granite stele translating Egyptian hieroglyphs, Demotic, and Ancient Greek.', '/images/objects/ruby_gem.png'),

(2501, 'Crown of Alexandria Key', 'key', 'A radiant gilded laurel key symbolizing the pinnacle of classical world wisdom.', '/images/objects/key_gold.png'),
(2502, 'Antikythera Mechanism Relic', 'relic', 'An ancient Greek geared analog computer calculating celestial cycles.', '/images/objects/ruby_gem.png')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- 3. SEED LEVELS
INSERT INTO levels (id, subject_id, level_number, name, description, difficulty, room_background) VALUES
(1, 1, 1, 'The Forgotten Entrance', 'The first gateway into the sunken mathematics tomb. Examine the rug and solve the gate cipher.', 'Easy', '/images/temple/temple_room_1.png'),
(2, 1, 2, 'The Hall of Whispers', 'A corridor echoing with algebraic riddles and hidden levers.', 'Easy', '/images/temple/temple_room_2.png'),
(3, 1, 3, 'The Hidden Chamber', 'A deeper vault containing complex equation pillars.', 'Medium', '/images/temple/temple_room_3.png'),
(4, 1, 4, 'The Lost Treasury', 'A gold-paved sanctuary locked behind prime number seals.', 'Medium', '/images/temple/temple_room_4.png'),
(5, 1, 5, 'The Guardian''s Sanctuary', 'The inner sanctum guarded by the grand temple sphinx.', 'Hard', '/images/temple/temple_room_5.png'),
(6, 2, 1, 'The Binary Vault', 'Decode the logic gates etched into the obsidian walls.', 'Easy', '/images/temple/temple_room_1.png'),
(7, 2, 2, 'The Algorithm Crypt', 'Trace the path through ancient recursive maze tunnels.', 'Medium', '/images/temple/temple_room_2.png'),
(11, 2, 3, 'The Network Nexus', 'Traverse optical conduits and route packets through protocol gates.', 'Medium', '/images/temple/temple_room_3.png'),
(12, 2, 4, 'The Database Vault', 'Navigate relational tables, decode primary keys, and balance transactional ledger vaults.', 'Medium', '/images/temple/temple_room_4.png'),
(13, 2, 5, 'The Cyber Guardian''s Sanctum', 'The apex computational sanctum where Alan Turing mechanical automaton guards the final gate.', 'Hard', '/images/temple/temple_room_5.png'),
(8, 3, 1, 'The Gravity Sanctum', 'Balance floating stone monoliths using gravitational laws.', 'Easy', '/images/temple/temple_room_1.png'),
(14, 3, 2, 'The Optics Hall', 'Decode light refraction, mirror angles, and the sacred spectrum prism.', 'Easy', '/images/temple/temple_room_2.png'),
(15, 3, 3, 'The Thermodynamics Vault', 'Balance heat transfer cycles and master the conservation of thermal energy.', 'Medium', '/images/temple/temple_room_3.png'),
(16, 3, 4, 'The Electromagnetism Crypt', 'Navigate magnetic field flux lines, charge potentials, and inductive temple coils.', 'Medium', '/images/temple/temple_room_4.png'),
(17, 3, 5, 'The Quantum Chamber of Titans', 'Unravel wave-particle duality and the fundamental limits of physical observation.', 'Hard', '/images/temple/temple_room_5.png'),
(9, 4, 1, 'The Alchemist Laboratory', 'Mix glowing vials to neutralize the acidic door lock.', 'Easy', '/images/temple/temple_room_1.png'),
(18, 4, 2, 'The Periodic Vault', 'Examine noble gas alcoves, valence shells, and the periodic table of elements.', 'Easy', '/images/temple/temple_room_2.png'),
(19, 4, 3, 'The Crystal Lattice Sanctum', 'Investigate ionic and covalent crystal structures bound by chemical bonds.', 'Medium', '/images/temple/temple_room_3.png'),
(20, 4, 4, 'The Reaction Crucible', 'Balance stoichiometry equations and regulate exothermic energy transformations.', 'Medium', '/images/temple/temple_room_4.png'),
(21, 4, 5, 'The Great Alchemist''s Apex', 'The sanctum of universal solvents, Avogadro constants, and entropy equilibrium.', 'Hard', '/images/temple/temple_room_5.png'),
(10, 5, 1, 'The Archive of Antiquity', 'Answer questions of past civilizations to lift the stone seal.', 'Easy', '/images/temple/temple_room_1.png'),
(22, 5, 2, 'The Hall of Empires', 'Examine ancient capitals, trade crossroads, and founding chronicles.', 'Easy', '/images/temple/temple_room_2.png'),
(23, 5, 3, 'The Geographic Vault', 'Map world oceans, towering peaks, and continental dividing lines.', 'Medium', '/images/temple/temple_room_3.png'),
(24, 5, 4, 'The Lost Monoliths', 'Uncover megalithic astronomical alignments and forgotten architectural wonders.', 'Medium', '/images/temple/temple_room_4.png'),
(25, 5, 5, 'The Apex of Civilizations', 'The grand summit celebrating universal human heritage, philosophy, and ancient discovery.', 'Hard', '/images/temple/temple_room_5.png')
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- 4. SEED ROOM OBJECTS (Dedicated 8 objects per level)
INSERT INTO room_objects (id, level_id, object_name, object_type, position_x, position_y, image_path, animation_type, description, hidden_item_id, required_item_id, is_required) VALUES
-- Level 1 (Key under Rug)
(11, 1, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs. Something is bulging beneath it!', 1, NULL, TRUE),
(12, 1, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand. A secret clue is tucked inside.', 2, NULL, FALSE),
(13, 1, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 3, 1, TRUE),
(14, 1, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(15, 1, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(16, 1, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(17, 1, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(18, 1, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 2 (Key in Urn)
(21, 2, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(22, 2, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'An ancient clay urn echoing with faint whispering winds. Look inside!', 201, NULL, TRUE),
(23, 2, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(24, 2, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 202, NULL, FALSE),
(25, 2, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(26, 2, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(27, 2, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(28, 2, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 3 (Key behind Curtains)
(31, 3, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(32, 3, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(33, 3, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(34, 3, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 302, NULL, FALSE),
(35, 3, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'A heavy velvet tapestry covering an ancient wall alcove. Pull it aside!', 301, NULL, TRUE),
(36, 3, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(37, 3, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(38, 3, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 4 (Key in Table)
(41, 4, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(42, 4, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(43, 4, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 402, 401, TRUE),
(44, 4, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'A carved stone offering table. Inscribed drawers line the pedestal.', 401, NULL, TRUE),
(45, 4, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(46, 4, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(47, 4, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(48, 4, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 5 (Key behind Statue)
(51, 5, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(52, 5, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(53, 5, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 502, 501, TRUE),
(54, 5, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(55, 5, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(56, 5, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A monolithic granite falcon statue. Something gleams at its base!', 501, NULL, TRUE),
(57, 5, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(58, 5, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 6 (Key behind Symbol)
(61, 6, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(62, 6, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(63, 6, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(64, 6, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 602, NULL, FALSE),
(65, 6, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(66, 6, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(67, 6, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'An iridescent lapis glyph etched into the stone. Press against the crystal!', 601, NULL, TRUE),
(68, 6, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 7 (Key in Urn)
(71, 7, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(72, 7, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A weathered clay jar buried in centuries of labyrinth dust.', 701, NULL, TRUE),
(73, 7, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(74, 7, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(75, 7, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', 702, NULL, FALSE),
(76, 7, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(77, 7, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(78, 7, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 8 (Key behind Curtains)
(81, 8, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(82, 8, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(83, 8, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 802, 801, TRUE),
(84, 8, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(85, 8, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'A celestial pendulum curtain drifting with atmospheric currents.', 801, NULL, TRUE),
(86, 8, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(87, 8, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(88, 8, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 9 (Key in Table)
(91, 9, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(92, 9, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(93, 9, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 902, 901, TRUE),
(94, 9, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'A scorched alchemical lab table holding ancient crucible tongs.', 901, NULL, TRUE),
(95, 9, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(96, 9, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(97, 9, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(98, 9, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 10 (Key behind Statue)
(101, 10, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(102, 10, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(103, 10, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 1002, 1001, TRUE),
(104, 10, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(105, 10, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(106, 10, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A towering granite statue of the temple scribe.', 1001, NULL, TRUE),
(107, 10, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(108, 10, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 11 (Key behind Curtains)
(111, 11, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(112, 11, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(113, 11, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(114, 11, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 1102, NULL, FALSE),
(115, 11, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'A heavy velvet tapestry covering an ancient wall alcove. Pull it aside!', 1101, NULL, TRUE),
(116, 11, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(117, 11, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(118, 11, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 12 (Key in Table)
(121, 12, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(122, 12, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(123, 12, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 1202, 1201, TRUE),
(124, 12, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'A carved stone offering table. Inscribed drawers line the pedestal.', 1201, NULL, TRUE),
(125, 12, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(126, 12, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(127, 12, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(128, 12, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 13 (Key behind Statue)
(131, 13, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(132, 13, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(133, 13, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 1302, 1301, TRUE),
(134, 13, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(135, 13, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(136, 13, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A towering granite automaton falcon statue guarding the sanctum.', 1301, NULL, TRUE),
(137, 13, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(138, 13, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 14 (Key in Vase)
(141, 14, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(142, 14, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'An ancient clay urn echoing with faint optical resonances. Look inside!', 1401, NULL, TRUE),
(143, 14, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(144, 14, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 1402, NULL, FALSE),
(145, 14, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(146, 14, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(147, 14, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(148, 14, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 15 (Key behind Curtains)
(151, 15, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(152, 15, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(153, 15, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(154, 15, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 1502, NULL, FALSE),
(155, 15, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'A heavy thermal velvet tapestry radiating subtle warmth. Pull it aside!', 1501, NULL, TRUE),
(156, 15, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(157, 15, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(158, 15, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 16 (Key in Table)
(161, 16, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(162, 16, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(163, 16, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 1602, 1601, TRUE),
(164, 16, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'A magnetic stone altar table with carved inductive channels. Check the drawers!', 1601, NULL, TRUE),
(165, 16, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(166, 16, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(167, 16, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(168, 16, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 17 (Key behind Statue)
(171, 17, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(172, 17, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(173, 17, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 1702, 1701, TRUE),
(174, 17, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(175, 17, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(176, 17, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A monolithic quantum falcon statue vibrating in harmonic frequencies. Look behind it!', 1701, NULL, TRUE),
(177, 17, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(178, 17, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 18 (Key under Rug)
(181, 18, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with periodic motifs. Something is bulging beneath it!', 1801, NULL, TRUE),
(182, 18, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(183, 18, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(184, 18, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 1802, NULL, FALSE),
(185, 18, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(186, 18, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(187, 18, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(188, 18, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 19 (Key in Vase)
(191, 19, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(192, 19, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'An ancient ceramic amphora coated with salt crystals. Reach inside!', 1901, NULL, TRUE),
(193, 19, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(194, 19, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(195, 19, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', 1902, NULL, FALSE),
(196, 19, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(197, 19, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(198, 19, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 20 (Key behind Curtains)
(201, 20, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(202, 20, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(203, 20, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 2002, 2001, TRUE),
(204, 20, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(205, 20, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'A thick tapestry shielding an alcove of chemical vials. Part it!', 2001, NULL, TRUE),
(206, 20, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(207, 20, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(208, 20, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 21 (Key behind Statue)
(211, 21, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(212, 21, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(213, 21, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 2102, 2101, TRUE),
(214, 21, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(215, 21, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(216, 21, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A grand alchemical guardian statue flanked by sacred crucibles.', 2101, NULL, TRUE),
(217, 21, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(218, 21, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 22 (Key in Table)
(221, 22, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(222, 22, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(223, 22, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(224, 22, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'A stone scribe table holding cuneiform fragments. Examine the drawers!', 2201, NULL, TRUE),
(225, 22, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', 2202, NULL, FALSE),
(226, 22, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(227, 22, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(228, 22, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 23 (Key behind Curtains)
(231, 23, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(232, 23, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(233, 23, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', NULL, NULL, FALSE),
(234, 23, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', 2302, NULL, FALSE),
(235, 23, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'A world map tapestry showing ancient trade meridians. Pull it aside!', 2301, NULL, TRUE),
(236, 23, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(237, 23, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(238, 23, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 24 (Key under Rug)
(241, 24, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A massive woven carpet depicting celestial constellations. Lift it!', 2401, NULL, TRUE),
(242, 24, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(243, 24, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 2402, 2401, TRUE),
(244, 24, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(245, 24, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(246, 24, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A granite statue of a temple falcon with glowing ruby eyes.', NULL, NULL, FALSE),
(247, 24, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(248, 24, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE),

-- Level 25 (Key behind Statue)
(251, 25, 'Patterned Floor Rug', 'rug', 48.00, 78.00, '/images/objects/rug.png', 'lift', 'A weathered woven rug with temple motifs.', NULL, NULL, FALSE),
(252, 25, 'Ancient Clay Urn', 'vase', 18.00, 68.00, '/images/objects/urn.png', 'shake', 'A decorative clay urn dusted with centuries of sand.', NULL, NULL, FALSE),
(253, 25, 'Reinforced Wooden Chest', 'chest', 78.00, 72.00, '/images/objects/chest.png', 'open', 'A sturdy cedar chest locked with a heavy padlock.', 2502, 2501, TRUE),
(254, 25, 'Carved Stone Altar Table', 'table', 50.00, 56.00, '/images/objects/table.png', 'inspect', 'An ancient stone offering table holding an inscribed parchment.', NULL, NULL, FALSE),
(255, 25, 'Hanging Velvet Tapestry', 'curtains', 25.00, 32.00, '/images/objects/curtain.png', 'part', 'Faded red curtains covering an ancient stone carving.', NULL, NULL, FALSE),
(256, 25, 'Guardian Falcon Statue', 'statue', 82.00, 36.00, '/images/objects/statue.png', 'rotate', 'A crowning monolithic statue of the temple philosopher guardian.', 2501, NULL, TRUE),
(257, 25, 'Lapis Wall Symbol', 'symbol', 50.00, 22.00, '/images/objects/symbol.png', 'glow', 'A mystical blue glyph carved above the doorway.', NULL, NULL, FALSE),
(258, 25, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE)
ON DUPLICATE KEY UPDATE object_name=VALUES(object_name), description=VALUES(description), hidden_item_id=VALUES(hidden_item_id), required_item_id=VALUES(required_item_id);

-- 5. SEED QUESTIONS (2 for every level)
INSERT INTO questions (id, level_id, question_text, question_type, option_a, option_b, option_c, option_d, correct_answer, hint, explanation, points) VALUES
(1, 1, 'To unseal the first chamber, solve the equation: If 3x + 15 = 45, what is the value of x?', 'multiple_choice', '8', '10', '12', '15', '10', 'Subtract 15 from both sides first, then divide by 3.', '3x + 15 = 45 -> 3x = 30 -> x = 10.', 10),
(2, 1, 'What is the ancient Greek mathematical symbol representing the ratio of a circle circumference to its diameter?', 'text', NULL, NULL, NULL, NULL, 'pi', 'Represented by the Greek letter π, spelled with two letters in English.', 'Pi (π) is the constant ratio of circumference to diameter, approximately 3.14159.', 15),

(3, 2, 'In the Hall of Whispers, calculate: What is the square root of 144?', 'multiple_choice', '10', '11', '12', '14', '12', 'Think of what number multiplied by itself equals 144.', '12 * 12 = 144.', 10),
(8, 2, 'If an ancient temple corridor has 5 columns on each side, how many columns are there in total?', 'multiple_choice', '8', '10', '12', '15', '10', 'Add 5 plus 5.', '5 columns on left + 5 on right = 10 total columns.', 10),

(9, 3, 'A right-angled triangle on the chamber floor has legs of length 6 and 8. What is the length of the hypotenuse?', 'multiple_choice', '9', '10', '12', '14', '10', 'Apply Pythagorean theorem: 6^2 + 8^2 = 36 + 64 = 100.', 'Square root of 100 is 10.', 15),
(10, 3, 'Solve for y in the chamber cipher: If 2y - 7 = 19, what is the value of y?', 'multiple_choice', '11', '12', '13', '14', '13', 'Add 7 to both sides, then divide by 2.', '2y = 26 -> y = 13.', 15),

(11, 4, 'Which of the following numbers inscribed on the treasury vault is a prime number?', 'multiple_choice', '21', '27', '29', '33', '29', 'A prime number has only two factors: 1 and itself.', '29 has no divisors other than 1 and 29.', 15),
(12, 4, 'What is the sum of the interior angles of any triangle carved into the stone tablets?', 'multiple_choice', '90°', '180°', '270°', '360°', '180°', 'The angles always add up to a straight line angle.', 'All Euclidean triangles have interior angles summing to 180 degrees.', 15),

(13, 5, 'The Sphinx poses a geometric challenge: What is the area of a circle with radius 7 meters? (Use π = 22/7 and Area = π * r^2)', 'multiple_choice', '144', '154', '168', '196', '154', '(22/7) * 7 * 7 = 22 * 7.', '22 * 7 = 154 square meters.', 20),
(14, 5, 'Solve the quadratic equation x^2 - 9 = 0 for its positive root.', 'text', NULL, NULL, NULL, NULL, '3', 'What positive number multiplied by itself equals 9?', 'x^2 = 9 -> x = 3.', 20),

(4, 6, 'Which computer science data structure operates on a Last-In, First-Out (LIFO) principle?', 'multiple_choice', 'Queue', 'Stack', 'Linked List', 'Array', 'Stack', 'Think of a stack of dinner plates in a cafeteria.', 'A Stack pushes and pops items from the top (LIFO).', 10),
(15, 6, 'Convert the 4-bit binary sequence 1010 into its decimal (base-10) equivalent.', 'multiple_choice', '8', '10', '12', '14', '10', '8 + 0 + 2 + 0 = 10.', 'Binary 1010 = 1*(8) + 0*(4) + 1*(2) + 0*(1) = 10 in decimal.', 10),

(16, 7, 'What is the worst-case time complexity of Binary Search on a sorted array of n elements?', 'multiple_choice', 'O(1)', 'O(log n)', 'O(n)', 'O(n^2)', 'O(log n)', 'Each comparison cuts the search space in half.', 'Binary search halves the search space each step: O(log n).', 15),
(17, 7, 'What algorithmic paradigm divides a problem into independent subproblems, solves them recursively, and combines the results (e.g., Merge Sort)?', 'multiple_choice', 'Greedy Algorithm', 'Dynamic Programming', 'Divide and Conquer', 'Backtracking', 'Divide and Conquer', 'First divide, then conquer, then combine.', 'Merge sort and Quick sort are classic Divide and Conquer algorithms.', 15),

(21, 11, 'Which networking layer in the standard 7-layer OSI model is responsible for end-to-end communication, reliability, flow control, and port numbers (e.g., TCP and UDP)?', 'multiple_choice', 'Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer', 'Transport Layer', 'Think of the layer that transports segments between hosts using TCP or UDP.', 'The Transport Layer (Layer 4) handles host-to-host communication, port addressing, and reliability.', 15),
(22, 11, 'In computer networking, what standard port number is designated for secure web browsing over HTTPS?', 'multiple_choice', '21', '80', '443', '8080', '443', 'Standard HTTP uses port 80, while encrypted HTTPS uses this port.', 'Port 443 is the standard default port for HTTPS encrypted traffic (SSL/TLS).', 15),

(23, 12, 'In relational database design (RDBMS), which SQL keyword is used to eliminate duplicate rows from the returned query result set?', 'multiple_choice', 'UNIQUE', 'DISTINCT', 'FILTER', 'GROUP BY', 'DISTINCT', 'SELECT ______ column_name FROM table_name.', 'The SELECT DISTINCT statement is used to return only unique, distinct values.', 15),
(24, 12, 'In database transaction management, what does the letter "A" stand for in the ACID properties acronym?', 'multiple_choice', 'Atomicity', 'Availability', 'Authentication', 'Asynchronous', 'Atomicity', 'Transactions are "all or nothing", indivisible like an atom.', 'Atomicity ensures that all statements in a transaction either execute completely or roll back entirely.', 15),

(25, 13, 'In theoretical computer science, which mathematical model of computation defines an abstract machine with an infinite tape and a read/write head?', 'multiple_choice', 'Finite State Machine', 'Turing Machine', 'Pushdown Automaton', 'Markov Chain', 'Turing Machine', 'Named after the British mathematician Alan Turing, considered the father of computer science.', 'A Turing Machine is a fundamental theoretical model that formalizes the concept of an algorithm and universal computation.', 20),
(26, 13, 'In computational complexity theory, what Millennium Prize Problem asks whether every problem whose solution can be quickly verified by a computer can also be quickly solved by one?', 'multiple_choice', 'P versus NP', 'Halting Problem', 'Collatz Conjecture', 'Traveling Salesperson Problem', 'P versus NP', 'It compares polynomial time solvable problems (P) with polynomial time verifiable problems (NP).', 'The P versus NP problem asks whether P = NP, one of the most prominent unsolved problems in computer science.', 20),

(5, 8, 'What is the approximate standard acceleration due to Earth gravity on the surface?', 'multiple_choice', '9.8 m/s²', '5.5 m/s²', '12.3 m/s²', '1.6 m/s²', '9.8 m/s²', 'It is close to 10 m/s², specifically between 9 and 10.', 'Standard gravitational acceleration g is approximately 9.80665 m/s².', 10),
(18, 8, 'According to Newton Second Law of Motion, what is the formula for force (F) given mass (m) and acceleration (a)?', 'multiple_choice', 'F = m / a', 'F = m * a', 'F = m + a', 'F = 0.5 * m * a^2', 'F = m * a', 'Force equals mass times acceleration.', 'Newton second law is famously expressed as F = m * a.', 10),

(6, 9, 'What is the chemical formula for pure water?', 'multiple_choice', 'CO2', 'NaCl', 'H2O', 'CH4', 'H2O', 'It consists of two Hydrogen atoms and one Oxygen atom.', 'H2O is two Hydrogen atoms bonded to one Oxygen atom.', 10),
(19, 9, 'On the standard pH scale, what pH value represents a completely neutral solution at 25°C?', 'multiple_choice', '0', '7', '10', '14', '7', 'Pure water has this neutral pH value right in the middle of 0 to 14.', 'A pH of 7 is neutral; values below 7 are acidic, and values above 7 are basic.', 10),

(7, 10, 'Which ancient wonder of the world stood in the harbor of Alexandria, Egypt?', 'multiple_choice', 'Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens of Babylon', 'Statue of Zeus at Olympia', 'Lighthouse of Alexandria', 'It guided sailors with a giant mirrored beacon.', 'The Pharos of Alexandria was the famous ancient lighthouse.', 10),
(20, 10, 'Which great river flowed through ancient Egypt, enabling its civilization to flourish in the desert?', 'multiple_choice', 'Amazon River', 'Nile River', 'Yangtze River', 'Danube River', 'Nile River', 'Known as the longest river in Africa.', 'The annual flooding of the Nile River provided fertile soil for Egyptian agriculture.', 10),

(27, 14, 'What optical phenomenon describes the bending of light as it passes from one medium to another (e.g., from air into water)?', 'multiple_choice', 'Reflection', 'Refraction', 'Diffraction', 'Polarization', 'Refraction', 'Think of how a straw appears bent when placed in a glass of water.', 'Refraction is the change in direction of a wave passing from one medium to another caused by its change in speed.', 10),
(28, 14, 'What is the approximate speed of light in a vacuum, rounded to standard metric units?', 'multiple_choice', '300,000 km/s', '150,000 km/s', '1,000,000 km/s', '30,000 km/s', '300,000 km/s', 'Approximately 3 times 10 to the power of 8 meters per second.', 'The speed of light in a vacuum (c) is approximately 299,792 kilometers per second (~300,000 km/s).', 10),

(29, 15, 'What fundamental physical temperature represents Absolute Zero on the Celsius scale, where all classical molecular motion ceases?', 'multiple_choice', '0°C', '-100°C', '-273.15°C', '-459.67°C', '-273.15°C', '0 Kelvin corresponds to this negative Celsius value.', 'Absolute zero (0 K) equals -273.15°C, the theoretical temperature at which entropy reaches its minimum.', 15),
(30, 15, 'Which law of thermodynamics states that energy cannot be created or destroyed, only transformed from one form to another?', 'multiple_choice', 'Zeroth Law', 'First Law', 'Second Law', 'Third Law', 'First Law', 'Also known as the Law of Conservation of Energy.', 'The First Law of Thermodynamics establishes the conservation of energy: ΔU = Q - W.', 15),

(31, 16, 'According to Ohm Law, what is the formula relating Voltage (V), Current (I), and Resistance (R)?', 'multiple_choice', 'V = I / R', 'V = I * R', 'V = I + R', 'V = R / I', 'V = I * R', 'Voltage equals current multiplied by resistance.', 'Ohm Law states that electric potential difference V equals current I multiplied by resistance R (V = I * R).', 15),
(32, 16, 'What standard SI unit of measurement is used to quantify magnetic flux density?', 'multiple_choice', 'Tesla', 'Joule', 'Watt', 'Volt', 'Tesla', 'Named after the pioneering electrical engineer Nikola Tesla.', 'The Tesla (T) is the SI unit of magnetic field strength and magnetic flux density.', 15),

(33, 17, 'Which quantum physics principle states that one cannot simultaneously measure both the exact position and momentum of a particle?', 'multiple_choice', 'Heisenberg Uncertainty Principle', 'Pauli Exclusion Principle', 'Photoelectric Effect', 'Doppler Effect', 'Heisenberg Uncertainty Principle', 'Formulated by German physicist Werner Heisenberg in 1927.', 'Heisenberg Uncertainty Principle states that Δx * Δp >= ħ/2, setting a fundamental limit on simultaneous measurement.', 20),
(34, 17, 'In Einstein famous mass-energy equivalence equation E = mc^2, what physical constant does the letter "c" represent?', 'multiple_choice', 'Speed of Sound', 'Speed of Light', 'Coulomb Constant', 'Centripetal Force', 'Speed of Light', 'The maximum speed at which all energy and matter in the universe can travel.', 'In E = mc^2, c is the speed of light in a vacuum (~3 * 10^8 m/s).', 20),

(35, 18, 'What is the lightest and most abundant chemical element in the universe, having atomic number 1?', 'multiple_choice', 'Helium', 'Hydrogen', 'Oxygen', 'Carbon', 'Hydrogen', 'Symbol H, consisting of a single proton and electron.', 'Hydrogen (H) has atomic number 1 and constitutes approximately 75% of the baryonic mass of the universe.', 10),
(36, 18, 'Which group of chemical elements on the periodic table are odorless, colorless, and largely inert due to full valence shells?', 'multiple_choice', 'Alkali Metals', 'Halogens', 'Noble Gases', 'Transition Metals', 'Noble Gases', 'Includes Helium, Neon, Argon, Krypton, and Xenon.', 'Noble Gases (Group 18) possess complete valence electron shells, making them exceptionally stable and unreactive.', 10),

(37, 19, 'What type of chemical bond is formed when atoms share one or more pairs of valence electrons?', 'multiple_choice', 'Ionic Bond', 'Covalent Bond', 'Hydrogen Bond', 'Metallic Bond', 'Covalent Bond', 'Think of molecular bonds like the bonds between hydrogen and oxygen in water.', 'A covalent bond involves the sharing of electron pairs between atoms.', 15),
(38, 19, 'What is the common chemical name for ordinary table salt, with formula NaCl?', 'multiple_choice', 'Potassium Chloride', 'Sodium Chloride', 'Calcium Carbonate', 'Sodium Bicarbonate', 'Sodium Chloride', 'Composed of Sodium (Na) and Chlorine (Cl) ions.', 'Sodium chloride (NaCl) is an ionic compound commonly known as table salt.', 15),

(39, 20, 'What substance speeds up the rate of a chemical reaction without undergoing any permanent chemical change itself?', 'multiple_choice', 'Reactant', 'Inhibitor', 'Catalyst', 'Solvent', 'Catalyst', 'It lowers the activation energy of the reaction.', 'A catalyst accelerates chemical reactions without being consumed in the overall process.', 15),
(40, 20, 'In chemistry, what term describes a reaction that releases thermal energy (heat) into its surroundings?', 'multiple_choice', 'Endothermic', 'Exothermic', 'Isothermal', 'Adiabatic', 'Exothermic', 'Think of combustion or campfire warmth ("exo" meaning outside).', 'Exothermic reactions release energy, usually in the form of heat or light, to their surroundings.', 15),

(41, 21, 'What fundamental constant represents the number of constituent particles (atoms or molecules) in one mole of a substance?', 'multiple_choice', 'Planck Constant', 'Avogadro Number', 'Boltzmann Constant', 'Faraday Constant', 'Avogadro Number', 'Approximately equal to 6.022 * 10^23 particles per mole.', 'Avogadro number (N_A ≈ 6.02214076 * 10^23 mol^-1) defines the number of units in one mole of substance.', 20),
(42, 21, 'What allotrope of pure elemental carbon is arranged in an extraordinarily rigid tetrahedral lattice, making it the hardest natural mineral?', 'multiple_choice', 'Graphite', 'Graphene', 'Diamond', 'Fullerene', 'Diamond', 'A precious gemstone famed for its brilliance and hardness.', 'Diamond is an allotrope of carbon where each carbon atom is covalently bonded to four others in a tetrahedral lattice.', 20),

(43, 22, 'Which ancient civilization developed cuneiform script, considered one of the earliest systems of writing in human history?', 'multiple_choice', 'Mesopotamia', 'Ancient Greece', 'Mayan Empire', 'Inca Empire', 'Mesopotamia', 'Located in the fertile crescent between the Tigris and Euphrates rivers.', 'Cuneiform writing was developed by the ancient Sumerians of Mesopotamia around 3400 BCE.', 10),
(44, 22, 'What famous historic network of trade routes connected East Asia and the Mediterranean for centuries?', 'multiple_choice', 'Amber Road', 'Silk Road', 'Spice Route', 'Incense Route', 'Silk Road', 'Named after the luxurious Chinese fabric carried along its paths.', 'The Silk Road was an ancient network of Eurasian trade routes active from the Han dynasty until the Ottoman boycott.', 10),

(45, 23, 'What is the highest mountain peak above sea level on Earth, located in the Himalayas?', 'multiple_choice', 'K2', 'Mount Kilimanjaro', 'Mount Everest', 'Denali', 'Mount Everest', 'Rises to an elevation of 8,848.86 meters on the border of Nepal and China.', 'Mount Everest is Earth highest mountain above sea level, located in the Mahalangur Himal sub-range of the Himalayas.', 15),
(46, 23, 'What is the deepest known oceanic trench on Earth, plunging nearly 11,000 meters in the western Pacific Ocean?', 'multiple_choice', 'Java Trench', 'Puerto Rico Trench', 'Mariana Trench', 'Tonga Trench', 'Mariana Trench', 'Its lowest point is known as Challenger Deep.', 'The Mariana Trench in the western Pacific Ocean contains the deepest known point on Earth, the Challenger Deep (~10,994 m).', 15),

(47, 24, 'Which ancient Mesoamerican civilization constructed the iconic step-pyramid El Castillo at Chichen Itza in the Yucatan Peninsula?', 'multiple_choice', 'Aztec', 'Maya', 'Inca', 'Olmec', 'Maya', 'Known for their advanced astronomical calendar and hieroglyphic script.', 'El Castillo (Temple of Kukulcan) was built by the Maya civilization between the 8th and 12th centuries CE.', 15),
(48, 24, 'What historic artifact discovered in 1799 provided the crucial bilingual key to deciphering ancient Egyptian hieroglyphs?', 'multiple_choice', 'Dead Sea Scrolls', 'Rosetta Stone', 'Code of Hammurabi', 'Phaistos Disc', 'Rosetta Stone', 'A granodiorite stele bearing decrees inscribed in three distinct scripts.', 'The Rosetta Stone contained inscriptions in Hieroglyphic, Demotic, and Ancient Greek, unlocking the translation of hieroglyphs.', 15),

(49, 25, 'Which ancient Greek philosopher and polymath was the tutor of Alexander the Great and wrote foundational treatises on logic, physics, and ethics?', 'multiple_choice', 'Socrates', 'Plato', 'Aristotle', 'Epicurus', 'Aristotle', 'Student of Plato and founder of the Lyceum in Athens.', 'Aristotle (384–322 BCE) tutored Alexander the Great and founded the Peripatetic school of philosophy.', 20),
(50, 25, 'What ancient Greek mechanical artifact, salvaged from a shipwreck off the coast of Greece in 1901, is considered the world earliest known analog computer?', 'multiple_choice', 'Antikythera Mechanism', 'Archimedes Sphere', 'Heron Engine', 'Eratosthenes Armillary', 'Antikythera Mechanism', 'A complex clockwork mechanism of bronze gears used to predict astronomical positions.', 'The Antikythera mechanism was an ancient Greek hand-powered orrery used to calculate and predict astronomical positions and eclipses.', 20)
ON DUPLICATE KEY UPDATE question_text=VALUES(question_text), correct_answer=VALUES(correct_answer), hint=VALUES(hint), explanation=VALUES(explanation);

-- 6. SEED LEVEL REQUIREMENTS
INSERT INTO level_requirements (id, level_id, requirement_type, requirement_value, description) VALUES
(1, 1, 'item_collected', '1', 'Collect the Golden Key hidden under the floor rug.'),
(2, 1, 'question_answered', '1', 'Correctly solve the equation puzzle on the temple scroll.'),

(3, 2, 'item_collected', '201', 'Collect the Silver Whisper Key hidden inside the ancient clay urn.'),
(4, 2, 'question_answered', '3', 'Correctly solve the square root cipher.'),

(5, 3, 'item_collected', '301', 'Collect the Bronze Vault Key hidden behind the hanging velvet tapestry.'),
(6, 3, 'question_answered', '9', 'Correctly solve the Pythagorean geometry riddle.'),

(7, 4, 'item_collected', '401', 'Collect the Prime Treasury Key hidden inside the carved stone altar table.'),
(8, 4, 'question_answered', '11', 'Correctly solve the prime number treasury lock.'),

(9, 5, 'item_collected', '501', 'Collect the Sphinx Sanctuary Key hidden behind the guardian falcon statue.'),
(10, 5, 'question_answered', '13', 'Correctly solve the Sphinx circle area challenge.'),

(11, 6, 'item_collected', '601', 'Collect the Crystal Logic Key hidden behind the lapis wall symbol.'),
(12, 6, 'question_answered', '4', 'Correctly solve the data structures riddle.'),

(13, 7, 'item_collected', '701', 'Collect the Obsidian Node Key hidden inside the ancient clay urn.'),
(14, 7, 'question_answered', '16', 'Correctly solve the binary search complexity cipher.'),

(21, 11, 'item_collected', '1101', 'Collect the Ethernet Cipher Key hidden behind the hanging velvet tapestry.'),
(22, 11, 'question_answered', '21', 'Correctly solve the OSI transport layer cipher.'),

(23, 12, 'item_collected', '1201', 'Collect the Relational Schema Key hidden inside the carved stone altar table.'),
(24, 12, 'question_answered', '23', 'Correctly solve the SQL DISTINCT query riddle.'),

(25, 13, 'item_collected', '1301', 'Collect the Turing Master Key hidden behind the guardian falcon statue.'),
(26, 13, 'question_answered', '25', 'Correctly solve the Turing Machine theoretical model challenge.'),

(15, 8, 'item_collected', '801', 'Collect the Pendulum Fulcrum Key hidden behind the hanging velvet tapestry.'),
(16, 8, 'question_answered', '5', 'Correctly solve the gravitational acceleration question.'),

(17, 9, 'item_collected', '901', 'Collect the Alchemical Catalyst Key hidden inside the carved stone altar table.'),
(18, 9, 'question_answered', '6', 'Correctly solve the pure water chemical formula question.'),

(19, 10, 'item_collected', '1001', 'Collect the Pharaoh Papyrus Key hidden behind the guardian falcon statue.'),
(20, 10, 'question_answered', '7', 'Correctly solve the ancient wonder of the world question.'),

(27, 14, 'item_collected', '1401', 'Collect the Refraction Prism Key hidden inside the ancient clay urn.'),
(28, 14, 'question_answered', '27', 'Correctly solve the light refraction riddle.'),

(29, 15, 'item_collected', '1501', 'Collect the Thermal Equilibrium Key hidden behind the hanging velvet tapestry.'),
(30, 15, 'question_answered', '29', 'Correctly solve the thermodynamics temperature challenge.'),

(31, 16, 'item_collected', '1601', 'Collect the Magnetic Lodestone Key hidden inside the carved stone altar table.'),
(32, 16, 'question_answered', '31', 'Correctly solve the Ohm Law electrical cipher.'),

(33, 17, 'item_collected', '1701', 'Collect the Schrödinger Flux Key hidden behind the guardian falcon statue.'),
(34, 17, 'question_answered', '33', 'Correctly solve the quantum uncertainty challenge.'),

(35, 18, 'item_collected', '1801', 'Collect the Noble Gas Key hidden under the floor rug.'),
(36, 18, 'question_answered', '35', 'Correctly solve the hydrogen element riddle.'),

(37, 19, 'item_collected', '1901', 'Collect the Ionic Bond Key hidden inside the ancient clay urn.'),
(38, 19, 'question_answered', '37', 'Correctly solve the chemical bonding question.'),

(39, 20, 'item_collected', '2001', 'Collect the Catalytic Convergent Key hidden behind the hanging velvet tapestry.'),
(40, 20, 'question_answered', '39', 'Correctly solve the reaction catalyst riddle.'),

(41, 21, 'item_collected', '2101', 'Collect the Avogadro Master Key hidden behind the guardian falcon statue.'),
(42, 21, 'question_answered', '41', 'Correctly solve the Avogadro constant calculation.'),

(43, 22, 'item_collected', '2201', 'Collect the Mesopotamian Cuneiform Key hidden inside the carved stone altar table.'),
(44, 22, 'question_answered', '43', 'Correctly answer the ancient writing system question.'),

(45, 23, 'item_collected', '2301', 'Collect the Astrolabe Meridian Key hidden behind the hanging velvet tapestry.'),
(46, 23, 'question_answered', '45', 'Correctly answer the highest mountain peak challenge.'),

(47, 24, 'item_collected', '2401', 'Collect the Megalith Sun Key hidden under the floor rug.'),
(48, 24, 'question_answered', '47', 'Correctly solve the Maya pyramid history question.'),

(49, 25, 'item_collected', '2501', 'Collect the Crown of Alexandria Key hidden behind the guardian falcon statue.'),
(50, 25, 'question_answered', '49', 'Correctly answer the classical philosopher question.')
ON DUPLICATE KEY UPDATE description=VALUES(description), requirement_value=VALUES(requirement_value);
