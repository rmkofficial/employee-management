const bcrypt = require('bcryptjs');

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

hashPassword('12345').then(hashedPassword => {
    console.log('Hashed password:', hashedPassword);
});
