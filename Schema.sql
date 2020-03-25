CREATE TABLE [app].[Collection]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [IsPublic] BIT DEFAULT 0,
    [OwnerId] NVARCHAR(450) NOT NULL FOREIGN KEY REFERENCES [dbo].[AspNetUsers]([Id]),
    [Name] VARCHAR(100),
    [Description] VARCHAR(255),
    [CreatedDate] DATETIME NOT NULL DEFAULT GETDATE(),
);

CREATE TABLE [app].[Element]
(
    [Id] INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    [CollectionId] INT NOT NULL FOREIGN KEY REFERENCES [app].[Collection]([Id]),
    [OwnerId] NVARCHAR(450) NOT NULL FOREIGN KEY REFERENCES [dbo].[AspNetUsers]([Id]),
    [Link] VARCHAR(255) NOT NULL,
    [Name] VARCHAR(100),
    [Description] VARCHAR(255),
    [Sequence] INT
);

CREATE TABLE [app].[SharedCollection]
(
    [CollectionId] INT NOT NULL FOREIGN KEY REFERENCES [app].[Collection]([Id]),
    [UserId] NVARCHAR(450) NOT NULL FOREIGN KEY REFERENCES [dbo].[AspNetUsers]([Id]),
    [ViewRights] BIT DEFAULT 1,
    [EditRights] BIT DEFAULT 0,
    PRIMARY KEY ([UserID], [CollectionID])
);

CREATE TABLE [app].[SavedCollection]
(
    [UserId] NVARCHAR(450) NOT NULL FOREIGN KEY REFERENCES [dbo].[AspNetUsers]([Id]),
    [CollectionId] INT NOT NULL FOREIGN KEY REFERENCES [app].[Collection]([Id]),
    PRIMARY KEY ([UserId], [CollectionId])
);
