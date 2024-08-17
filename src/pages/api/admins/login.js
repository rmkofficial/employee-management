import dbConnect from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        const { email, password } = req.body;

        try {
            const admin = await Admin.findOne({ email });

            if (!admin) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            
            const isPasswordMatch = await bcrypt.compare(password, admin.password);

            if (!isPasswordMatch) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            res.status(200).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                role: admin.role,
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
