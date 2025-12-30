require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const { signupService, loginService } = require('./src/services/authServices');

async function verifyBackendAndModel() {
    console.log("🚀 Starting Final Backend Verification...");

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Database Connected.");

        const timestamp = Date.now();
        const testUser = {
            name: `Test User ${timestamp}`,
            email: `backend_verify_${timestamp}@example.com`,
            password: "SecurePassword123!",
            phone: `+91${timestamp}`,
            role: "LAWYER",
            lawyerProfile: {
                barCouncilId: `BC-${timestamp}`,
                specialization: ["Corporate", "Civil"],
                experienceYears: 10,
                casesSolved: 50
            },
            about: "This is a test user for backend verification."
        };

        // 1. Test Signup Service (incorporates Model & Service Logic)
        console.log("\n1️⃣  Testing Signup Service...");
        const createdUser = await signupService(testUser);

        if (createdUser && createdUser._id) {
            console.log("✅ User created successfully via service.");
        } else {
            throw new Error("Signup service failed to return user.");
        }

        // 2. Verify Model Fields in Database
        console.log("\n2️⃣  Verifying Model Fields in DB...");
        const fetchedUser = await User.findById(createdUser._id);

        const checks = [
            fetchedUser.name === testUser.name,
            fetchedUser.email === testUser.email,
            fetchedUser.phone === testUser.phone, // Verifying Type change to String
            fetchedUser.role === "LAWYER",
            fetchedUser.lawyerProfile.barCouncilId === testUser.lawyerProfile.barCouncilId,
            fetchedUser.lawyerProfile.specialization.length === 2,
            fetchedUser.loginAttempts === 0
        ];

        if (checks.every(Boolean)) {
            console.log("✅ All model fields (Name, Email, Phone, Role, LawyerProfile) saved correctly.");
        } else {
            console.error("❌ Model verification failed!", fetchedUser);
            throw new Error("Data mismatch in DB.");
        }

        // 3. Test Login Service
        console.log("\n3️⃣  Testing Login Service...");
        const loggedInUser = await loginService({
            email: testUser.email,
            password: testUser.password
        });

        if (loggedInUser && loggedInUser._id.toString() === createdUser._id.toString()) {
            console.log("✅ Login successful with correct credentials.");
        } else {
            throw new Error("Login service failed.");
        }

        // Cleanup
        console.log("\n🧹 Cleaning up test data...");
        await User.deleteOne({ _id: createdUser._id });
        console.log("✅ Cleanup complete.");

        console.log("\n🎉 ALL BACKEND TESTS PASSED.");
        process.exit(0);

    } catch (err) {
        console.error("\n❌ TEST FAILED:", err.message);
        if (err.code === 11000) console.error("Duplicate key error - cleanup failed previously?");
        process.exit(1);
    }
}

verifyBackendAndModel();
