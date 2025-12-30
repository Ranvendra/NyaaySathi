const User = require("../models/User");
const bcrypt = require("bcrypt");

async function signupService({ ...data }) {
    const getSalt = 10;
    const hashedPassword = await bcrypt.hash(data.password, getSalt);

    const newUser = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        role: data.role,
        lawyerProfile: data.lawyerProfile,
    });

    return newUser;
}


async function loginService({ email, password }) {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        throw new Error("Invalid credentials");
    };

    if (!existingUser.isActive) {
        throw new Error("Account Blocked.");
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        await User.updateOne(
            { _id: existingUser._id },
            { $inc: { loginAttempts: 1 } }
        );
        throw new Error("Invalid credentials");
    }

    await User.updateOne(
        { _id: existingUser._id },
        { lastLogin: new Date(), loginAttempts: 0 }
    );

    return existingUser;
}

module.exports = { signupService, loginService };
