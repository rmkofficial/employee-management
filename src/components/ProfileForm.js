import React from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function ProfileForm({ user, onChange, onSave }) {
    return (
        <Box>
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
                InputProps={{
                    readOnly: true,
                }}
                style={{ backgroundColor: '#f5f5f5' }}
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
            <TextField
                label="Emergency Contact"
                name="emergencyContact"
                fullWidth
                value={user.emergencyContact || ''}
                onChange={onChange}
                margin="normal"
            />
            <TextField
                label="Birth Date"
                type="date"
                name="birthDate"
                fullWidth
                value={user.birthDate || ''}
                onChange={onChange}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <Button variant="contained" color="primary" onClick={onSave} style={{ marginTop: '16px' }}>
                Save
            </Button>
        </Box>
    );
}
