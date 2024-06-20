import React, { useState } from 'react';
import { Container, Typography, Box, Switch, FormControlLabel } from '@mui/material';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(true);

    const handleDarkModeChange = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Settings
                </Typography>
                <FormControlLabel
                    control={<Switch checked={darkMode} onChange={handleDarkModeChange} name="darkMode" />}
                    label="Dark Mode"
                />
                {/* Add more settings options as needed */}
            </Box>
        </Container>
    );
};

export default Settings;
