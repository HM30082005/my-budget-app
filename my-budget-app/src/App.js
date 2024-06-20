import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import darkTheme from './theme/Theme';
import MainPage from './mainPage/MainPage';
import ExpenseModal from './expenseModal/ExpenseModal';
import AccountDetails from './accountDetails/AccountDetails';
import Settings from './settings/Settings';
import Layout from './Layout';

const App = () => {
    const [open, setOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [expenses, setExpenses] = useState([
        { date: '2024-06-01', name: 'Groceries', amount: 400, tag: 'Food', comment: 'Weekly groceries' },
        { date: '2024-06-05', name: 'Rent', amount: 1000, tag: 'Housing', comment: 'Monthly rent' },
        { date: '2024-06-10', name: 'Utilities', amount: 200, tag: 'Bills', comment: 'Electricity and water' },
        { date: '2024-06-12', name: 'Entertainment', amount: 150, tag: 'Leisure', comment: 'Movies and games' },
    ]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setEditingExpense(null);
    };

    const addExpense = (expense) => {
        setExpenses([...expenses, expense]);
    };

    const editExpense = (updatedExpense) => {
        setExpenses(expenses.map(exp => exp === editingExpense ? updatedExpense : exp));
        handleClose();
    };

    const handleRowClick = (expense) => {
        setEditingExpense(expense);
        handleOpen();
    };

    const handleDelete = (expenseToDelete) => {
        setExpenses(expenses.filter(exp => exp !== expenseToDelete));
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={
                                <>
                                    <MainPage handleOpen={handleOpen} handleRowClick={handleRowClick} handleDelete={handleDelete} expenses={expenses} />
                                    <ExpenseModal
                                        open={open}
                                        handleClose={handleClose}
                                        addExpense={addExpense}
                                        editExpense={editExpense}
                                        expenseToEdit={editingExpense}
                                    />
                                </>
                            } />
                            <Route path="account-details" element={<AccountDetails />} />
                            <Route path="settings" element={<Settings />} />
                        </Route>
                    </Routes>
                </Router>
            </LocalizationProvider>
        </ThemeProvider>
    );
};

export default App;
