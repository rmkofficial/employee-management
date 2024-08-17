import dbConnect from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        const { name, email, password } = req.body;

        try {
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            
            const newAdmin = await Admin.create({
                name,
                email,
                password: hashedPassword,
                role: 'Admin',
            });

            res.status(201).json({ success: true, data: newAdmin });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
