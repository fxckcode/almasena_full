-- AddForeignKey
ALTER TABLE `movements` ADD CONSTRAINT `movements_sheet_id_fkey` FOREIGN KEY (`sheet_id`) REFERENCES `sheets`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
