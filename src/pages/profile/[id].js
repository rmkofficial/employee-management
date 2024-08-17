import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper } from '@mui/material';
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import ProfileForm from '../../components/ProfileForm';

export async function getServerSideProps({ params }) {
    await dbConnect();
    const user = await User.findById(params.id).lean();
    return { props: { user: JSON.parse(JSON.stringify(user)) } };
}

export default function Profile({ user }) {
    const [updatedUser, setUpdatedUser] = useState(user);
    const router = useRouter();

    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        const res = await fetch(`/api/users/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (res.ok) {
            alert('Profile updated successfully');
        } else {
            alert('Failed to update profile');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {user.name}&apos;s Profile
                    </Typography>
                    <ProfileForm user={updatedUser} onChange={handleChange} onSave={handleSave} />
                </Paper>
            </Box>
        </Container>
    );
}
