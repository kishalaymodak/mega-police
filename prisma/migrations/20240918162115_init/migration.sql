-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "StationName" TEXT NOT NULL,
    "StationId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phNumber" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Case" (
    "id" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "caseFilerName" TEXT NOT NULL,
    "casefileHash" TEXT NOT NULL,

    CONSTRAINT "Case_pkey" PRIMARY KEY ("id")
);
