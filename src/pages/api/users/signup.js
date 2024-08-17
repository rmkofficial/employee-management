import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        const { name, email, password } = req.body;

        try {
            
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            
            const hashedPassword = await bcrypt.hash(password, 10);

            
            const user = new User({
                name,
                email,
                password: hashedPassword,
            });

            
            await user.save();

            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
