import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Box, Paper, Typography } from '@mui/material';

export default function AdminSignup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/admins/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (res.ok) {
            alert('Signup successful! Please login.');
            router.push('/admin-login');
        } else {
            alert('Signup failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
                style={{ marginTop: '-10vh' }}
            >
                <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
                    <Typography variant="h5" align="center" gutterBottom>
                        Admin Signup
                    </Typography>
                    <form onSubmit={handleSignup}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                            Signup
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}
