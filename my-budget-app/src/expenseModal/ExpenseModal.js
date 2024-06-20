// src/ExpenseModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ExpenseModal = ({ open, handleClose, addExpense, editExpense, expenseToEdit }) => {
    const [expense, setExpense] = useState({
        name: '',
        tag: '',
        date: dayjs(),
        amount: '',
        comment: '',
    });

    const [tags, setTags] = useState(['Food', 'Housing', 'Bills', 'Leisure', 'Other']);
    const [newTag, setNewTag] = useState('');
    const [isAddingTag, setIsAddingTag] = useState(false);

    useEffect(() => {
        if (expenseToEdit) {
            setExpense({
                name: expenseToEdit.name,
                tag: expenseToEdit.tag,
                date: dayjs(expenseToEdit.date),
                amount: expenseToEdit.amount,
                comment: expenseToEdit.comment,
            });
        }
    }, [expenseToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({ ...expense, [name]: value });
    };

    const handleDateChange = (newValue) => {
        setExpense({ ...expense, date: newValue });
    };

    const handleNewTagChange = (e) => {
        setNewTag(e.target.value);
    };

    const handleAddTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setExpense({ ...expense, tag: newTag });
            setNewTag('');
            setIsAddingTag(false);
        }
    };

    const handleToggleAddTag = () => {
        setIsAddingTag(!isAddingTag);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedExpense = {
            ...expense,
            date: expense.date.format('YYYY-MM-DD'),
            amount: parseFloat(expense.amount),
        };
        if (expenseToEdit) {
            editExpense(updatedExpense);
        } else {
            addExpense(updatedExpense);
        }
        setExpense({ name: '', tag: '', date: dayjs(), amount: '', comment: '' });
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <h1>Expense</h1>
                <TextField
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={expense.name}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel id="tag-label">Tag</InputLabel>
                    <Select
                        labelId="tag-label"
                        id="tag"
                        name="tag"
                        value={expense.tag}
                        label="Tag"
                        onChange={handleChange}
                    >
                        {tags.map((tag, index) => (
                            <MenuItem key={index} value={tag}>{tag}</MenuItem>
                        ))}
                        <MenuItem onClick={handleToggleAddTag}>
                            <em>Add new tag</em>
                        </MenuItem>
                    </Select>
                </FormControl>
                {isAddingTag && (
                    <Box display="flex" alignItems="center" mt={2}>
                        <TextField
                            id="new-tag"
                            name="newTag"
                            label="New Tag"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newTag}
                            onChange={handleNewTagChange}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddTag} style={{ marginLeft: '10px' }}>
                            Add
                        </Button>
                    </Box>
                )}
                <DesktopDatePicker
                    label="Date"
                    inputFormat="MM/DD/YYYY"
                    value={expense.date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
                <TextField
                    id="amount"
                    name="amount"
                    label="Amount (€)"
                    variant="outlined"
                    type="number"
                    fullWidth
                    margin="normal"
                    value={expense.amount}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: <span>€</span>,
                    }}
                />
                <TextField
                    id="comment"
                    name="comment"
                    label="Comment"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    value={expense.comment}
                    onChange={handleChange}
                />
                <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
};

export default ExpenseModal;
