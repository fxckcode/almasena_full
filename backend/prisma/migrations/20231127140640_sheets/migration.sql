/*
  Warnings:

  - You are about to drop the column `sheet` on the `movements` table. All the data in the column will be lost.
  - Added the required column `sheet_id` to the `movements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `movements` DROP COLUMN `sheet`,
    ADD COLUMN `sheet_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `sheets` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
