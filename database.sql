DROP DATABASE IF EXISTS floatpays;

CREATE DATABASE floatpays;

\c floatpays;

create table transactions(
  id SERIAL,
  amount DECIMAL NOT NULL,
  description VARCHAR(255) NOT NULL,
  reference VARCHAR(80) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transactions(reference, amount, description)
VALUES('123123', 200.12, 'Yum yum lunch');

INSERT INTO transactions(amount, reference, description)
VALUES('123222', 88.12, 'Coffee for my team');

INSERT INTO transactions(amount, reference, description)
VALUES('123222', 1300, 'Shoes');
