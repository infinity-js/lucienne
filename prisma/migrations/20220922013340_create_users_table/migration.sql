-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_phone_number` (
    `user_id` VARCHAR(191) NOT NULL,
    `ddi` VARCHAR(191) NOT NULL,
    `ddd` VARCHAR(191) NOT NULL,
    `number` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL,

    UNIQUE INDEX `user_phone_number_ddi_ddd_number_key`(`ddi`, `ddd`, `number`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_phone_number` ADD CONSTRAINT `user_phone_number_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
