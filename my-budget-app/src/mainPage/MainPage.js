// src/MainPage.js
import React, { useState } from 'react';
import { Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Typography, IconButton, Menu, MenuItem, TextField} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MainPage = ({ handleOpen, handleRowClick, handleDelete, expenses }) => {
    const [expandedCommentIndex, setExpandedCommentIndex] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [cap, setCap] = useState(2000);
    const [isEditingCap, setIsEditingCap] = useState(false);
    const [newCap, setNewCap] = useState(cap);

    const handleToggleComment = (index) => {
        setExpandedCommentIndex(index === expandedCommentIndex ? null : index);
    };

    const handleMenuOpen = (event, expense) => {
        setAnchorEl(event.currentTarget);
        setSelectedExpense(expense);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedExpense(null);
    };

    const handleEditClick = () => {
        handleRowClick(selectedExpense);
        handleMenuClose();
    };

    const handleDeleteClick = () => {
        handleDelete(selectedExpense);
        handleMenuClose();
    };

    const handleCapClick = () => {
        setIsEditingCap(true);
    };

    const handleCapChange = (e) => {
        setNewCap(e.target.value);
    };

    const handleCapSubmit = () => {
        setCap(newCap);
        setIsEditingCap(false);
    };

    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Aggregating expenses by tags
    const data = expenses.reduce((acc, expense) => {
        const existingTag = acc.find(item => item.name === expense.tag);
        if (existingTag) {
            existingTag.value += expense.amount;
        } else {
            acc.push({ name: expense.tag, value: expense.amount });
        }
        return acc;
    }, []);

    // Function to render custom label
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <Grid container spacing={3} padding={3} direction="column" alignItems="center">
            <Grid item container xs={12} justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography
                        variant="h6"
                        style={{
                            cursor: 'pointer',
                            fontSize: 36,
                            color: totalExpenses > cap ? 'red' : 'green'
                        }}
                        onClick={handleCapClick}
                    >
                        €{totalExpenses}/
                        {isEditingCap ? (
                            <TextField
                                style={{ width: 150 }}
                                inputProps={{ style: { fontSize: 36 } }}
                                variant="standard"
                                value={newCap}
                                onChange={handleCapChange}
                                onBlur={handleCapSubmit}
                                autoFocus
                            />
                        ) : (
                            `${cap}`
                        )}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="100%"
                                fill="#8884d8"
                                dataKey="value"
                                labelLine={false}
                                label={renderCustomizedLabel}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={12} md={4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="contained" color="primary" style={{ fontSize: 36, height: 'fit-content' }} onClick={handleOpen}>
                        Add Expense
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{ marginTop: '30px' }}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Tag</TableCell>
                                <TableCell>Comment</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {expenses.map((expense, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <IconButton onClick={(event) => handleMenuOpen(event, expense)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>{expense.date}</TableCell>
                                    <TableCell>{expense.name}</TableCell>
                                    <TableCell>{expense.amount}</TableCell>
                                    <TableCell>{expense.tag}</TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            noWrap
                                            onClick={() => handleToggleComment(index)}
                                            style={{ cursor: 'pointer', whiteSpace: 'pre-wrap' }}
                                        >
                                            {expandedCommentIndex === index ? expense.comment : (expense.comment.length > 20 ? `${expense.comment.substring(0, 20)}...` : expense.comment)}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleEditClick}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
            </Menu>
        </Grid>
    );
};

export default MainPage;
