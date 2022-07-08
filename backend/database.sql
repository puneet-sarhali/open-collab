CREATE TABLE project(
    projectid SERIAL PRIMARY KEY,
    projectName varchar(255),
    description varchar(255),
    score integer,
    upvotes integer,
    downvotes integer,
    userid varchar(255),
    createdAt Date,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE users(
    id varchar(255) PRIMARY KEY,
    name varchar(255),
    email varchar(255)
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

CREATE OR REPLACE FUNCTION count_score()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS
$$
BEGIN
    UPDATE project SET score = NEW.upvotes - NEW.downvotes WHERE projectid = NEW.projectid;
    RETURN NEW;
END;
$$

CREATE TRIGGER score_count
AFTER UPDATE
ON project
FOR EACH ROW
EXECUTE PROCEDURE count_score();
