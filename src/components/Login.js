import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Box, Paper } from '@mui/material';
import users from '../data/users.json';
import { useAuthStore } from '../store/useAuthStore';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const login = useAuthStore(state => state.login);

    const handleLogin = (e) => {
        e.preventDefault();

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            login(user);
            router.push(`/profile/${user.id}`);
        } else {
            alert('Invalid email or password');
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
                    <form onSubmit={handleLogin}>
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
                            Login
                        </Button>
                    </form>
                </Paper>
            </Box>
        </Container>
    );
}
