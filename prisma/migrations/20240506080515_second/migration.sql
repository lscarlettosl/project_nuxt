-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_laptops_status" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "laptopsId" INTEGER NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "usersId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "laptops_status_laptopsId_fkey" FOREIGN KEY ("laptopsId") REFERENCES "laptops" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "laptops_status_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_laptops_status" ("active", "endTime", "id", "laptopsId", "startTime", "usersId") SELECT "active", "endTime", "id", "laptopsId", "startTime", "usersId" FROM "laptops_status";
DROP TABLE "laptops_status";
ALTER TABLE "new_laptops_status" RENAME TO "laptops_status";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
