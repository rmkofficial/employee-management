import React from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper } from '@mui/material';

export default function AdminDashboard() {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Admin Dashboard
                    </Typography>
                    <Typography variant="body1" align="center">
                        Welcome to the admin dashboard, Admin ID: {id}
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
}
