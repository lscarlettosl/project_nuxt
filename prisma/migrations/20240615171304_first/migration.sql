-- CreateTable
CREATE TABLE `laptops` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,

    UNIQUE INDEX `laptops_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laptops_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `laptopsId` INTEGER NOT NULL,
    `startTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `endTime` DATETIME(3) NULL,
    `userId` INTEGER NOT NULL,
    `active` BOOLEAN NOT NULL,
    `hash` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `laptops_status` ADD CONSTRAINT `laptops_status_laptopsId_fkey` FOREIGN KEY (`laptopsId`) REFERENCES `laptops`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
