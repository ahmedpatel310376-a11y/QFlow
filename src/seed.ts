import { connectDB } from "./config/db";
import { Organization } from "./models/Organization";
import { Queue } from "./models/Queue";
import { User } from "./models/User";

async function seed() {
  await connectDB();

  await User.deleteMany({});
  await Queue.deleteMany({});
  await Organization.deleteMany({});

  const organization = await Organization.create({
    name: "QFlow Demo Hospital",
    type: "hospital",
    address: "Demo Campus"
  });

  await User.create({
    name: "Admin",
    email: "admin@qflow.com",
    password: "admin123",
    role: "admin",
    organizationId: organization._id
  });

  const queue = await Queue.create({
    name: "OPD General",
    organizationId: organization._id,
    serviceName: "General Consultation",
    capacity: 100,
    averageServiceMinutes: 5
  });

  console.log("Seed complete");
  console.log("Admin: admin@qflow.com / admin123");
  console.log(`Organization ID: ${organization._id}`);
  console.log(`Queue ID: ${queue._id}`);

  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
