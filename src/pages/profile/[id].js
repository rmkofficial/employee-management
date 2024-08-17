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
    const [phone, setPhone] = useState(user.phone || '');
    const [address, setAddress] = useState(user.address || '');
    const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact || '');
    const [birthDate, setBirthDate] = useState(user.birthDate ? user.birthDate.split('T')[0] : '');
    const [password, setPassword] = useState('');
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
                body: JSON.stringify({
                    name,
                    phone,
                    address,
                    emergencyContact,
                    birthDate,
                    password: password ? password : undefined,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Profile updated successfully');
            } else {
                alert(`Failed to update profile: ${data.message || 'Unknown error'}`);
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
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        style={{ backgroundColor: '#f5f5f5' }}
                    />
                    <TextField
                        label="Phone Number"
                        fullWidth
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Address"
                        fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Emergency Contact"
                        fullWidth
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Birth Date"
                        type="date"
                        fullWidth
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="New Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
