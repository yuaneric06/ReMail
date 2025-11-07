DROP DATABASE IF EXISTS `ReMail`;
CREATE DATABASE `ReMail`;
USE `ReMail`;


CREATE TABLE mail (
    mail_id int NOT NULL,
    sender_id int NOT NULL,
    receiver_id int NOT NULL,
    time_sent varchar(255),
    title varchar(255),
    content text
    PRIMARY KEY (mail_id);
);

CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT,
    username varchar(50) UNIQUE NOT NULL,
    passwd varchar(255) NOT NULL
    PRIMARY KEY (user_id);
);

INSERT INTO mail (sender_id, receiver_id, time_sent, title, content)
VALUES
(1, 2, '2025-11-06 14:32:10', 'Hey Bob!', 'Just checking in to see how your project is going.'),
(2, 1, '2025-11-06 14:45:55', 'Re: Hey Bob!', 'Hi Alice! It''s going great. How about yours?'),
(3, 4, '2025-11-06 15:02:21', 'Lunch plans', 'Hey Diana, want to grab lunch tomorrow?'),
(4, 3, '2025-11-06 15:06:49', 'Re: Lunch plans', 'Sure thing! Let''s meet at noon at the usual spot.'),
(5, 1, '2025-11-06 16:12:37', 'Test email', 'This is just a test message from Eric.'),
(2, 5, '2025-11-06 16:25:50', 'Hello Eric', 'Hey Eric, are you joining the meeting later?'),
(1, 4, '2025-11-06 17:05:13', 'Reminder', 'Don’t forget about the deadline tomorrow!'),
(3, 2, '2025-11-06 18:09:42', 'Quick question', 'Bob, can you share the API docs with me?'),
(5, 3, '2025-11-06 19:00:22', 'Update', 'Charlie, I pushed the latest changes to the repo.'),
(4, 5, '2025-11-06 19:45:10', 'Thanks!', 'Thanks for helping me with the setup earlier!');

INSERT INTO users (username, passwd)
VALUES
('alice', 'pass123'),
('bob', 'secure456'),
('charlie', 'mypassword'),
('diana', 'sunshine'),
('eric', 'batman');