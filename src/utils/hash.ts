import bcrypt from "bcrypt";

// Hash the password before saving to DB
async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

// Compare password entered by user with stored hash
async function validatePassword(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

export {hashPassword, validatePassword};
