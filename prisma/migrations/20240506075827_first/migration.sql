-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "laptops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "number" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "laptops_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "laptopsId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "usersId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "laptops_status_laptopsId_fkey" FOREIGN KEY ("laptopsId") REFERENCES "laptops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "laptops_status_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
