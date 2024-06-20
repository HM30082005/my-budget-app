import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const AccountDetails = () => {
    return (
        <Container>
            <Box mt={4}>
                <Typography variant="h4" gutterBottom>
                    Account Details
                </Typography>
                <Typography variant="body1">
                    Username: JohnDoe
                </Typography>
                <Typography variant="body1">
                    Email: johndoe@example.com
                </Typography>
                <Typography variant="body1">
                    Subscription: Premium
                </Typography>
                {/* Add more account details as needed */}
            </Box>
        </Container>
    );
};

export default AccountDetails;
