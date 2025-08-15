/*
  Warnings:

  - You are about to drop the column `latitude` on the `location_perimeters` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `location_perimeters` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `location_perimeters` table. All the data in the column will be lost.
  - You are about to drop the column `radius` on the `location_perimeters` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `location_perimeters` table. All the data in the column will be lost.
  - You are about to drop the column `clockInLocation` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `clockInNotes` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `clockOutLocation` on the `shifts` table. All the data in the column will be lost.
  - You are about to drop the column `clockOutNotes` on the `shifts` table. All the data in the column will be lost.
  - Added the required column `centerLatitude` to the `location_perimeters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `centerLongitude` to the `location_perimeters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."location_perimeters" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "name",
DROP COLUMN "radius",
DROP COLUMN "updatedBy",
ADD COLUMN     "centerLatitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "centerLongitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "radiusKm" DOUBLE PRECISION NOT NULL DEFAULT 2.0,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "public"."shifts" DROP COLUMN "clockInLocation",
DROP COLUMN "clockInNotes",
DROP COLUMN "clockOutLocation",
DROP COLUMN "clockOutNotes",
ADD COLUMN     "clockInLatitude" DOUBLE PRECISION,
ADD COLUMN     "clockInLongitude" DOUBLE PRECISION,
ADD COLUMN     "clockOutLatitude" DOUBLE PRECISION,
ADD COLUMN     "clockOutLongitude" DOUBLE PRECISION,
ADD COLUMN     "notes" TEXT;

-- AddForeignKey
ALTER TABLE "public"."location_perimeters" ADD CONSTRAINT "location_perimeters_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
