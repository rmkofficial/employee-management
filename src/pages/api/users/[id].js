import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(id);
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        case 'PUT':
            try {
                if (req.body.password) {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
                }

                const user = await User.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });

                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }

                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, message: error.message });
            }
            break;

        default:
            res.status(400).json({ success: false, message: 'Invalid request method' });
            break;
    }
}
