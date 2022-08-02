CREATE TABLE users(
    id varchar(255) PRIMARY KEY,
    name varchar(255),
    email varchar(255)
);

CREATE TABLE project(
    projectid SERIAL PRIMARY KEY,
    projectname varchar(255),
    description varchar(4000),
    score integer,
    upvotes integer,
    downvotes integer,
    userid varchar(255),
    createdat timestamptz,
    tag1: varchar(50),
    tag2: varchar(50),
    tag3: varchar(50),
    github: varchar(255),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

-- a user can upvote or down vote a project: 1 for upvote 0 for downvote
CREATE TABLE vote(
    userid varchar(255),
    projectid integer,
    voteValue boolean,
    PRIMARY KEY (userid, projectid),
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (projectid) REFERENCES project(projectid) ON DELETE CASCADE
);


-- table for the tasks in the kanban boards
CREATE TABLE task(
    taskid SERIAL PRIMARY KEY,
    title varchar(40),
    content varchar(255),
    category integer NOT NULL, -- 0 = todo, 1 = in progress, 2 = complete
    assignedto varchar(255),
    projectid integer NOT NULL,
    FOREIGN KEY (assignedto) REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY (projectid) REFERENCES project
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- MOCK DATA
CREATE TABLE comment(
    comment_id SERIAL PRIMARY KEY,
    project_id integer NOT NULL,
    author_uid varchar(255) NOT NULL,
    content varchar(4000),
    posted_on timestamptz,
    like_count integer,
    FOREIGN KEY (project_id) REFERENCES project(projectid) ON DELETE CASCADE,
    FOREIGN KEY (author_uid) REFERENCES users(id) ON DELETE CASCADE
);


-- -- get project data with the user data of the creator.
-- SELECT * FROM project
-- INNER JOIN users
-- ON project.userid = users.id;

-- INSERT INTO users (id, name, email) VALUES
--     ('Ai6hv0sbwJgC8cW5aL8dhbM3YEE2', 'Grace', 'grace@gmail.com'),
--     ('c4Mh9dhNQaVkNENfyuwO2bcW6D73', 'Polly', 'polly@gmail.com'),
--     ('qrSq0rddWUVFRE0DnriEtZA01u42', 'John', 'john@gmail.com'),
--     ('jcVx46kuciXThBc45ni6EjInwsz1', 'Ada', 'ada@gmail.com'),
--     ('ZtYT7z1bSfMzTlOPP29mVj9BvQs2', 'Thomas', 'thomas@gmail.com'),
--     ('MNZSMXFHMXPFv6MOJIwETBuWcij1', 'Arthur', 'arthur@gmail.com');


-- INSERT INTO project (projectname, description, score, upvotes, downvotes, userid, createdat) VALUES
--     ('Open Collab', 'A collaboration tool for open source developers to propose new project ideas, collaborate with developers interested in your proposal and transparently keep track of the project’s progress.', 79, 81, 2, 'ZtYT7z1bSfMzTlOPP29mVj9BvQs2', '2022-02-27T10:50:53.380Z'),
--     ('Vector Host', 'Developing a platform where designers/developers can upload and store custom SVG images and icons. The code can then be exported so that other people can use them.', 150, 165, 15, 'c4Mh9dhNQaVkNENfyuwO2bcW6D73', '2012-12-13T07:03:30.019Z'),
--     ('Generate Stack', 'It gives you a recommendation for a technical stack that you could use for a project, based on few questions.', 24, 26, 2, 'qrSq0rddWUVFRE0DnriEtZA01u42', '2019-09-15T17:33:35.121Z'),
--     ('FindDevs', 'A curated list of developers who specialize in technical writing, CSS art, twitter spaces, Web3, NFTs, etc. So that we don’t have to randomly search through social media instead we can go to the platform and find everyone and their niche making it easy to follow them. ', 79, 81, 2, 'jcVx46kuciXThBc45ni6EjInwsz1', '2022-06-12T16:59:21.748Z'),
--     ('EnvGen', 'The user enters a technical stack into a form and it automatically tells you what software to install with code snippets, StackOverflow troubleshooting, etc.', 1089, 1100, 11, 'MNZSMXFHMXPFv6MOJIwETBuWcij1', '2022-01-23T21:59:12.996Z'),
--     ('It Aint Done Yet', 'A platform where you can list your abandoned developer projects and have other developers pick them up and continue working on them.', 430, 450, 20, 'Ai6hv0sbwJgC8cW5aL8dhbM3YEE2', '2022-05-16T17:21:02.634Z'),
--     ('Routes', 'A list of different career paths and information on getting up to speed with different technical stacks.', 35, 40, 5, 'c4Mh9dhNQaVkNENfyuwO2bcW6D73', '2022-06-10T02:30:20.639Z'),
--     ('Foggy Brains', 'An app that randomly creates potential conversation topics so that you never need to worry about those awkward silences again. It can even be customized and filtered by topic, level, depth, etc.', 7, 9, 2, 'qrSq0rddWUVFRE0DnriEtZA01u42', '2021-04-26T14:59:32.239Z'),
--     ('This is a Dumb Idea', 'Create an application that can calculate how much salary someone should be making depending on their skill set, experience, currency, and other factors like location, etc.', 111, 111, 0, 'jcVx46kuciXThBc45ni6EjInwsz1', '2021-03-06T03:15:17.748Z'),
--     ('Playlist Gen', 'An app that can randomly generate a list of songs for your playlist. It could be able to take into account various filters such as your likes, the year, genre, how long you plan on listening to a song, etc. Then it creates a playlist based on those parameters.', 100, 200, 100, 'ZtYT7z1bSfMzTlOPP29mVj9BvQs2', '2022-02-18T16:32:29.183Z');


INSERT INTO task (title, content, category, projectid) VALUES
    ('Build the DB', 'this needs to be done by tomorrow!', '0', '1'),
    ('front end mock up', 'this needs to be done by tomorrow!', '1', '1'),
    ('new task', 'this needs to be done by tomorrow!', '2', '1');