import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Modal, Button, TextField } from '@mui/material';
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="user-details-title"
                aria-describedby="user-details-description"
            >
                <Box
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        boxShadow: 24,
                        padding: 20,
                    }}
                >
                    <Typography id="user-details-title" variant="h6" component="h2">
                        User Details
                    </Typography>
                    {selectedUser && (
                        <div>
                            <TextField
                                label="Name"
                                name="name"
                                fullWidth
                                value={updatedUser.name || ''}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                fullWidth
                                value={updatedUser.email || ''}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                label="Role"
                                name="role"
                                fullWidth
                                value={updatedUser.role || ''}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                label="Phone"
                                name="phone"
                                fullWidth
                                value={updatedUser.phone || ''}
                                onChange={handleChange}
                                margin="normal"
                            />
                            <TextField
                                label="Address"
                                name="address"
                                fullWidth
                                value={updatedUser.address || ''}
                                onChange={handleChange}
                                margin="normal"
                            />
                        </div>
                    )}
                    <Button variant="contained" color="primary" onClick={handleSave} style={{ marginTop: '16px' }}>
                        Save
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} style={{ marginTop: '16px' }}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
}
