BEGIN TRANSACTION;

INSERT into users (name, email, entries, joined) values ('Yuan', 'yuan@gmail.com', 6, '2019-01-01');
INSERT into login (hash, email) values ('$2a$10$UAhWb9uVnzIRAZwJIKkDI.d6eXb0iRy3Wr.TcaoOtsJJylPs6g4Wu', 'yuan@gmail.com');

COMMIT;