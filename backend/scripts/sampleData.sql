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

(801, 'Pendulum Fulcrum Key', 'key', 'A brass key balanced with a precision counterweight.', '/images/objects/key_gold.png'),
(802, 'Prism Crystal Relic', 'relic', 'A triangular prism that separates torch light into rainbow bands.', '/images/objects/ruby_gem.png'),

(901, 'Alchemical Catalyst Key', 'key', 'An iridescent elemental key resistant to extreme acids.', '/images/objects/key_gold.png'),
(902, 'Glowing Amber Flask Relic', 'relic', 'A sealed glass phial containing an ancient luminous elixir.', '/images/objects/ruby_gem.png'),

(1001, 'Pharaoh Papyrus Key', 'key', 'An ancient ceremonial key preserved from the Library of Alexandria.', '/images/objects/key_gold.png'),
(1002, 'Alexandria Cartouche Relic', 'relic', 'A royal cartouche bearing ancient hieroglyphic inscriptions.', '/images/objects/ruby_gem.png')
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
(8, 3, 1, 'The Gravity Sanctum', 'Balance floating stone monoliths using gravitational laws.', 'Easy', '/images/temple/temple_room_1.png'),
(9, 4, 1, 'The Alchemist Laboratory', 'Mix glowing vials to neutralize the acidic door lock.', 'Easy', '/images/temple/temple_room_1.png'),
(10, 5, 1, 'The Archive of Antiquity', 'Answer questions of past civilizations to lift the stone seal.', 'Easy', '/images/temple/temple_room_1.png')
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
(108, 10, 'Massive Stone Exit Door', 'door', 50.00, 42.00, '/images/objects/exit_door.png', 'unlock', 'The massive gateway leading deeper into the temple. Sealed with an ancient lock.', NULL, NULL, TRUE)
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

(5, 8, 'What is the approximate standard acceleration due to Earth gravity on the surface?', 'multiple_choice', '9.8 m/s²', '5.5 m/s²', '12.3 m/s²', '1.6 m/s²', '9.8 m/s²', 'It is close to 10 m/s², specifically between 9 and 10.', 'Standard gravitational acceleration g is approximately 9.80665 m/s².', 10),
(18, 8, 'According to Newton Second Law of Motion, what is the formula for force (F) given mass (m) and acceleration (a)?', 'multiple_choice', 'F = m / a', 'F = m * a', 'F = m + a', 'F = 0.5 * m * a^2', 'F = m * a', 'Force equals mass times acceleration.', 'Newton second law is famously expressed as F = m * a.', 10),

(6, 9, 'What is the chemical formula for pure water?', 'multiple_choice', 'CO2', 'NaCl', 'H2O', 'CH4', 'H2O', 'It consists of two Hydrogen atoms and one Oxygen atom.', 'H2O is two Hydrogen atoms bonded to one Oxygen atom.', 10),
(19, 9, 'On the standard pH scale, what pH value represents a completely neutral solution at 25°C?', 'multiple_choice', '0', '7', '10', '14', '7', 'Pure water has this neutral pH value right in the middle of 0 to 14.', 'A pH of 7 is neutral; values below 7 are acidic, and values above 7 are basic.', 10),

(7, 10, 'Which ancient wonder of the world stood in the harbor of Alexandria, Egypt?', 'multiple_choice', 'Colossus of Rhodes', 'Lighthouse of Alexandria', 'Hanging Gardens of Babylon', 'Statue of Zeus at Olympia', 'Lighthouse of Alexandria', 'It guided sailors with a giant mirrored beacon.', 'The Pharos of Alexandria was the famous ancient lighthouse.', 10),
(20, 10, 'Which great river flowed through ancient Egypt, enabling its civilization to flourish in the desert?', 'multiple_choice', 'Amazon River', 'Nile River', 'Yangtze River', 'Danube River', 'Nile River', 'Known as the longest river in Africa.', 'The annual flooding of the Nile River provided fertile soil for Egyptian agriculture.', 10)
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

(15, 8, 'item_collected', '801', 'Collect the Pendulum Fulcrum Key hidden behind the hanging velvet tapestry.'),
(16, 8, 'question_answered', '5', 'Correctly solve the gravitational acceleration question.'),

(17, 9, 'item_collected', '901', 'Collect the Alchemical Catalyst Key hidden inside the carved stone altar table.'),
(18, 9, 'question_answered', '6', 'Correctly solve the pure water chemical formula question.'),

(19, 10, 'item_collected', '1001', 'Collect the Pharaoh Papyrus Key hidden behind the guardian falcon statue.'),
(20, 10, 'question_answered', '7', 'Correctly solve the ancient wonder of the world question.')
ON DUPLICATE KEY UPDATE description=VALUES(description), requirement_value=VALUES(requirement_value);
