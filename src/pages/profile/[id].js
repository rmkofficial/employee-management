import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper, Button, TextField } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore';
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export async function getServerSideProps({ params }) {
    await dbConnect();
    const user = await User.findById(params.id).lean();
    return { props: { user: JSON.parse(JSON.stringify(user)) } };
}

export default function Profile({ user }) {
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/users/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });

            if (res.ok) {
                alert('Profile updated successfully');
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Failed to update profile', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {user.name}&apos;s Profile
                    </Typography>

                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" fullWidth onClick={handleSave} style={{ marginTop: '16px' }}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" fullWidth onClick={handleLogout} style={{ marginTop: '16px' }}>
                        Logout
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
