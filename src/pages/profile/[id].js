import React from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper, Button } from '@mui/material';
import users from '../../data/users.json';
import { useAuthStore } from '../../store/useAuthStore';

export async function getStaticPaths() {
    const paths = users.map((user) => ({
        params: { id: user.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const user = users.find((user) => user.id.toString() === params.id) || null;

    return {
        props: {
            user,
        },
    };
}

export default function Profile({ user }) {
    const router = useRouter();
    const logout = useAuthStore((state) => state.logout);

    if (!user) {
        return (
            <Container maxWidth="sm">
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="100vh"
                >
                    <Typography variant="h5" component="h2" gutterBottom>
                        User not found
                    </Typography>
                </Box>
            </Container>
        );
    }

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <Container maxWidth="sm">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100vh"
            >
                <Paper elevation={3} style={{ padding: '20px', width: '100%', maxWidth: '400px' }}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {user.name}&apos;s Profile
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="body1">Role: {user.role}</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        style={{ marginTop: '16px' }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}
