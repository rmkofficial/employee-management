import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    if (method === 'POST') {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            
            if (password !== user.password) {
                return res.status(400).json({ message: 'Invalid email or password' });
            }

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        } catch (error) {
            res.status(500).json({ message: 'Something went wrong', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
