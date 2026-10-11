-- ============================================================
-- EscapeTemple: Database Migration - Question Sessions & Timers
-- Description: Adds table to track server-authoritative timers,
-- extensions, and elimination states per player, level, and question.
-- Non-destructive migration that preserves existing data.
-- ============================================================

USE escapetemple;

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
