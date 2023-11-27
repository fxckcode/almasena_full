-- AlterTable
ALTER TABLE `sheets` MODIFY `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active';
