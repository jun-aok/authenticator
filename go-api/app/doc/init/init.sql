-- NOT NULLのものはユーザー登録時に登録させる
-- NULLのものは一旦登録後に登録させる
CREATE TABLE user (
  user_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  user_code CHAR(62) NOT NULL,
  email VARCHAR(256) NOT NULL,
  name VARCHAR(64) NOT NULL,
  birth_date DATE NULL,
  gender tinyint NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  deleted_at DATETIME NULL
)
