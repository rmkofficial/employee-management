import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, TextField, Button, Box, Paper, Typography } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const login = useAuthStore(state => state.login);

    const handleAuth = async (e) => {
        e.preventDefault();

        const endpoint = isLogin ? '/api/users/login' : '/api/users/signup';
        const payload = isLogin ? { email, password } : { name, email, password };  

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),  
        });

        if (res.ok) {
            const user = await res.json();
            if (isLogin) {
                login(user);
                router.push(`/profile/${user._id}`);
            } else {
                setIsLogin(true); 
                alert('Signup successful, you can now login');
            }
        } else {
            alert(isLogin ? 'Invalid email or password' : 'Signup failed');
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
                    <form onSubmit={handleAuth}>
                        <Typography variant="h5" align="center" gutterBottom>
                            {isLogin ? 'Login' : 'Signup'}
                        </Typography>
                        {!isLogin && (
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}  
                            />
                        )}
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
                            {isLogin ? 'Login' : 'Signup'}
                        </Button>
                    </form>
                    <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                        or
                    </Typography>
                    <Button
                        variant="text"
                        color="secondary"
                        fullWidth
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Signup' : 'Login'}
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
