import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
            try {
                const user = await User.findById(req.query.id);
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;

        case 'PUT':
            try {
                const user = await User.findByIdAndUpdate(req.query.id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!user) {
                    return res.status(404).json({ success: false, message: 'User not found' });
                }
                res.status(200).json({ success: true, data: user });
            } catch (error) {
                res.status(400).json({ success: false, error: error.message });
            }
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}
