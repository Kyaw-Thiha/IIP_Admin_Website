import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";
// import { env } from "../src/env.mjs";

// Initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 16;

async function main() {
  // Creating an admin user
  const adminName = "admin";
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD ?? "",
    roundsOfHashing
  );

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL },
    update: {
      password: hashedPassword,
    },
    create: {
      email: process.env.ADMIN_EMAIL,
      name: adminName,
      password: hashedPassword,
      permission: {
        create: {
          editAlumni: true,
          editAnnouncements: true,
          editUsers: true,
        },
      },
    },
  });
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    // Close the Prisma Client at the end
    void prisma.$disconnect();
  });
