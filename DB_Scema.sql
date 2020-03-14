CREATE TABLE TUser
(
    UserID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(50) NOT NULL,
    PasswordHash VARCHAR(50) NOT NULL,
    RegisterDate DATETIME,
);

CREATE TABLE TCollection
(
    CollectionID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    CollectionType VARCHAR(10) NOT NULL CHECK (CollectionType IN('Public', 'Shared', 'Private')),
    Owner INT NOT NULL FOREIGN KEY REFERENCES TUser(UserID),
    Name VARCHAR(50),
    Description VARCHAR(255)
);

--IDEA: no ElementID -> PRIMARY KEY(Collection, Link)
CREATE TABLE TElement
(
    ElementID INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    Collection INT NOT NULL FOREIGN KEY REFERENCES TCollection(CollectionID),
    Link VARCHAR(255) NOT NULL,
    Name VARCHAR(50),
    Description VARCHAR(255)
);

-- IDEA: trigger: Delete User -> Delete all TSharedCollections with this UserID
CREATE TABLE TSharedCollections
(
    UserID INT NOT NULL FOREIGN KEY REFERENCES TUser(UserID),
    CollectionID INT NOT NULL FOREIGN KEY REFERENCES TCollection(CollectionID),
    PermissionType VARCHAR(10) NOT NULL CHECK (PermissionType IN ('View', 'Modify')),
    PRIMARY KEY (PersonID, CollectionID)
);

-- IDEA: trigger: Delete User -> Delete all TSavedCollections with this UserID
CREATE TABLE TSavedCollections
(
    UserID INT NOT NULL FOREIGN KEY REFERENCES TUser(UserID),
    CollectionID INT NOT NULL FOREIGN KEY REFERENCES TCollection(CollectionID),
    PRIMARY KEY (PersonID, CollectionID)
);