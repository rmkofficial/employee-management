import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import UserDetailsModal from '../../components/UserDetailsModal';

export async function getServerSideProps(context) {
    await dbConnect();

    const users = await User.find({}).select('-password').lean();

    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
        },
    };
}

export default function AdminDashboard({ users: initialUsers }) {
    const router = useRouter();
    const { id } = router.query;
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({});
    const [users, setUsers] = useState(initialUsers);

    const handleOpen = (user) => {
        setSelectedUser(user);
        setUpdatedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedUser(null);
        setUpdatedUser({});
    };

    const handleChange = (e) => {
        setUpdatedUser({
            ...updatedUser,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        const res = await fetch(`/api/users/${selectedUser._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (res.ok) {
            alert('User updated successfully!');
            handleClose();

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === selectedUser._id ? { ...user, ...updatedUser } : user
                )
            );
        } else {
            alert('Failed to update user.');
        }
    };

    return (
        <Container maxWidth="md">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Admin Dashboard
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                        All Users
                    </Typography>
                    <List>
                        {users.map(user => (
                            <ListItem button key={user._id} onClick={() => handleOpen(user)}>
                                <ListItemText primary={`${user.name} - ${user.email}`} secondary={user.role} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <UserDetailsModal
                open={open}
                onClose={handleClose}
                user={updatedUser}
                onChange={handleChange}
                onSave={handleSave}
            />
        </Container>
    );
}
