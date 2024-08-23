/*
  Warnings:

  - You are about to drop the column `name` on the `company` table. All the data in the column will be lost.
  - Added the required column `fullname` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `company` DROP COLUMN `name`,
    ADD COLUMN `fullname` VARCHAR(191) NOT NULL;
