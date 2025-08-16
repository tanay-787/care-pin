/*
  Warnings:

  - A unique constraint covering the columns `[auth0Id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Made the column `updatedById` on table `location_perimeters` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."location_perimeters" DROP CONSTRAINT "location_perimeters_updatedById_fkey";

-- AlterTable
ALTER TABLE "public"."location_perimeters" ALTER COLUMN "isActive" DROP DEFAULT,
ALTER COLUMN "radiusKm" DROP DEFAULT,
ALTER COLUMN "updatedById" SET NOT NULL;

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "auth0Id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_auth0Id_key" ON "public"."users"("auth0Id");

-- AddForeignKey
ALTER TABLE "public"."location_perimeters" ADD CONSTRAINT "location_perimeters_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
