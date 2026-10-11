-- ============================================================
-- EscapeTemple: Table Creation Script
-- Description: Creates all relational tables using InnoDB engine.
-- Uses 'CREATE TABLE IF NOT EXISTS' so it will NOT drop or delete data.
-- ============================================================

USE escapetemple;

-- 1. SUBJECTS TABLE
-- Stores academic subjects (e.g. Mathematics, Computer Science)
CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. LEVELS TABLE
-- Stores levels per subject. Supports scaling up to 100+ levels per subject.
CREATE TABLE IF NOT EXISTS levels (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject_id INT NOT NULL,
  level_number INT NOT NULL,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Easy',
  room_background VARCHAR(255) DEFAULT '/images/temple/temple_room_1.png',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  UNIQUE KEY unique_subject_level (subject_id, level_number)
) ENGINE=InnoDB;

-- 3. ITEMS TABLE
-- Stores collectible keys, clues, tools, and relics in the game
CREATE TABLE IF NOT EXISTS items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  item_type ENUM('key', 'clue', 'tool', 'relic') DEFAULT 'clue',
  description TEXT,
  image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. ROOM OBJECTS TABLE
-- Stores furniture, vases, rugs, statues, chests, and doors for each level
CREATE TABLE IF NOT EXISTS room_objects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  object_name VARCHAR(100) NOT NULL,
  object_type VARCHAR(50) NOT NULL,
  position_x DECIMAL(5, 2) NOT NULL,
  position_y DECIMAL(5, 2) NOT NULL,
  image_path VARCHAR(255),
  animation_type VARCHAR(50) DEFAULT 'shake',
  description TEXT,
  hidden_item_id INT NULL,
  required_item_id INT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
  FOREIGN KEY (hidden_item_id) REFERENCES items(id) ON DELETE SET NULL,
  FOREIGN KEY (required_item_id) REFERENCES items(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 5. QUESTIONS TABLE
-- Stores academic questions per level (multiple choice and text-based)
CREATE TABLE IF NOT EXISTS questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  question_text TEXT NOT NULL,
  question_type ENUM('multiple_choice', 'text') DEFAULT 'multiple_choice',
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  correct_answer VARCHAR(255) NOT NULL,
  hint TEXT,
  explanation TEXT,
  points INT DEFAULT 10,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. LEVEL REQUIREMENTS TABLE
-- Configurable rules required to unlock and escape each level
CREATE TABLE IF NOT EXISTS level_requirements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  level_id INT NOT NULL,
  requirement_type ENUM('item_collected', 'question_answered', 'object_interacted') NOT NULL,
  requirement_value VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7. PLAYER PROGRESS TABLE
-- Tracks player level progression, score, and completion status
CREATE TABLE IF NOT EXISTS player_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id VARCHAR(100) NOT NULL,
  subject_id INT NOT NULL,
  level_id INT NOT NULL,
  status ENUM('locked', 'unlocked', 'in_progress', 'completed') DEFAULT 'unlocked',
  score INT DEFAULT 0,
  attempts INT DEFAULT 0,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP NULL,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
  UNIQUE KEY unique_player_level (player_id, level_id)
) ENGINE=InnoDB;

-- 8. PLAYER INVENTORY TABLE
-- Stores items found by a player in each level (prevents duplicates)
CREATE TABLE IF NOT EXISTS player_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id VARCHAR(100) NOT NULL,
  item_id INT NOT NULL,
  level_id INT NOT NULL,
  collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
  FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
  UNIQUE KEY unique_player_item_level (player_id, item_id, level_id)
) ENGINE=InnoDB;

-- 9. PLAYER ANSWERS TABLE
-- Tracks questions answered correctly by a player to validate level exit
CREATE TABLE IF NOT EXISTS player_answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id VARCHAR(100) NOT NULL,
  level_id INT NULL,
  question_id INT NOT NULL,
  is_correct BOOLEAN DEFAULT FALSE,
  submitted_answer VARCHAR(255),
  answered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  UNIQUE KEY unique_player_question (player_id, question_id)
) ENGINE=InnoDB;

-- 10. PLAYER QUESTION SESSIONS TABLE
-- Tracks 25s timers, 10s extensions (max 3), and elimination state per player & question
CREATE TABLE IF NOT EXISTS player_question_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  player_id VARCHAR(100) NOT NULL,
  level_id INT NOT NULL,
  question_id INT NOT NULL,
  deadline DATETIME NOT NULL,
  extensions_used INT DEFAULT 0,
  is_eliminated BOOLEAN DEFAULT FALSE,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_player_level_question_session (player_id, level_id, question_id),
  FOREIGN KEY (level_id) REFERENCES levels(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

