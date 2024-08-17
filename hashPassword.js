const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(`Original: ${password}`);
    console.log(`Hashed: ${hashedPassword}`);
}


hashPassword('adminpassword123');
