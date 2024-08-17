import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';

export async function getServerSideProps(context) {
    await dbConnect();

    const users = await User.find({}).select('-password').lean();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
        },
    };
}

export default function AdminDashboard({ users }) {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Admin Dashboard
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Tüm Kullanıcılar
                    </Typography>
                    <List>
                        {users.map(user => (
                            <ListItem key={user._id}>
                                <ListItemText primary={`${user.name} - ${user.email}`} secondary={user.role} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
}
