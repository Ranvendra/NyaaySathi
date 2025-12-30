require('dotenv').config();
const mongoose = require('mongoose');

async function testConnection() {
    // Masking the password for log output security
    const uri = process.env.MONGO_URI || "";
    const maskedUri = uri.replace(/:([^:@]+)@/, ":****@");
    console.log("Testing Connection to:", maskedUri);

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ Success! Database connected.");
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error("❌ Connection Failed:");
        console.error(err.message);
        process.exit(1);
    }
}

testConnection();
