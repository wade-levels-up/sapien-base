/*
  Warnings:

  - You are about to drop the column `clerkId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."User_clerkId_key";

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "clerkId";

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");
