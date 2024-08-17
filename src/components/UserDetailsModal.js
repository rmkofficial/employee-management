import React from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';

export default function UserDetailsModal({ open, onClose, user, onChange, onSave }) {
    return (
        <Modal
            open={open}
            onClose={onClose}
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
                {user && (
                    <div>
                        <TextField
                            label="Name"
                            name="name"
                            fullWidth
                            value={user.name || ''}
                            onChange={onChange}
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            fullWidth
                            value={user.email || ''}
                            onChange={onChange}
                            margin="normal"
                        />
                        <TextField
                            label="Role"
                            name="role"
                            fullWidth
                            value={user.role || ''}
                            onChange={onChange}
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            name="phone"
                            fullWidth
                            value={user.phone || ''}
                            onChange={onChange}
                            margin="normal"
                        />
                        <TextField
                            label="Address"
                            name="address"
                            fullWidth
                            value={user.address || ''}
                            onChange={onChange}
                            margin="normal"
                        />
                    </div>
                )}
                <Button variant="contained" color="primary" onClick={onSave} style={{ marginTop: '16px' }}>
                    Save
                </Button>
                <Button variant="contained" color="secondary" onClick={onClose} style={{ marginTop: '16px' }}>
                    Close
                </Button>
            </Box>
        </Modal>
    );
}
