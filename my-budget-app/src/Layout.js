import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleNavigation = (path) => () => {
        navigate(path);
        setDrawerOpen(false);
    };

    return (
        <div>
            <div style={{ position: 'relative', width: '100%' }}>
                <IconButton onClick={toggleDrawer(true)} style={{ position: 'absolute', top: 0, left: 0 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h2" gutterBottom align="center" color="darkgoldenrod">
                    Budget App
                </Typography>
            </div>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <List>
                    <ListItem button onClick={handleNavigation('/')}>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={handleNavigation('/settings')}>
                        <ListItemText primary="Settings" />
                    </ListItem>
                    <ListItem button onClick={handleNavigation('/account-details')}>
                        <ListItemText primary="Account Details" />
                    </ListItem>
                </List>
            </Drawer>
            <Outlet />
        </div>
    );
};

export default Layout;
