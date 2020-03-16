CREATE TABLE [User]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [FirstName] VARCHAR(50),
    [LastName] VARCHAR(50),
    [Email] VARCHAR(50) NOT NULL,
    [RegisterDate] DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE [Collection]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [IsPublic] BIT DEFAULT 0,
    [OwnerId] INT NOT NULL FOREIGN KEY REFERENCES [User]([Id]),
    [Name] VARCHAR(100),
    [Description] VARCHAR(255),
    [CreatedDate] DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE [Element]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [CollectionId] INT NOT NULL FOREIGN KEY REFERENCES [Collection]([Id]),
    [OwnerId] INT NOT NULL FOREIGN KEY REFERENCES [User]([Id]),
    [Link] VARCHAR(255) NOT NULL,
    [Name] VARCHAR(100),
    [Description] VARCHAR(255),
    [Sequence] INT,
);

CREATE TABLE [SharedCollection]
(
    [CollectionId] INT NOT NULL FOREIGN KEY REFERENCES [Collection]([Id]),
    [UserId] INT NOT NULL FOREIGN KEY REFERENCES [User]([Id]),
    [ViewRights] BIT DEFAULT 1,
    [EditRights] BIT DEFAULT 0,
    PRIMARY KEY ([UserID], [CollectionID])
);

CREATE TABLE [SavedCollection]
(
    [UserId] INT NOT NULL FOREIGN KEY REFERENCES [User]([Id]),
    [CollectionId] INT NOT NULL FOREIGN KEY REFERENCES [Collection]([Id]),
    PRIMARY KEY ([UserId], [CollectionId])
);