// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './App.css';
import Modal from 'react-modal';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

Modal.setAppElement('#root');

const getInitialState = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  try {
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const CATEGORIES = ['Food', 'Entertainment', 'Travel'];
const INITIAL_BALANCE = 5000;

function App() {
  const [walletBalance, setWalletBalance] = useState(() => getInitialState('walletBalance', INITIAL_BALANCE));
  const [expenses, setExpenses] = useState(() => getInitialState('expenses', []));
  const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [incomeAmount, setIncomeAmount] = useState('');
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    localStorage.setItem('walletBalance', JSON.stringify(walletBalance));
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.price, 0);

  const expenseSummary = useMemo(() => {
    const summary = CATEGORIES.map(category => ({
      name: category,
      value: expenses
        .filter(e => e.category === category)
        .reduce((sum, e) => sum + e.price, 0),
    }));
    return summary.filter(item => item.value > 0);
  }, [expenses]);

  const pieChartData = useMemo(() => {
      const summary = expenseSummary.reduce((acc, item) => {
          acc[item.name] = item.value;
          return acc;
      }, { Food: 0, Entertainment: 0, Travel: 0 });

      return [
          { name: 'Food', value: summary.Food },
          { name: 'Entertainment', value: summary.Entertainment },
          { name: 'Travel', value: summary.Travel },
      ];
  }, [expenseSummary]);

  const handleAddIncome = () => {
    const amount = Number(incomeAmount);
    // if (amount > 0) {
      setWalletBalance(prev => prev + amount);
      setIncomeAmount('');
      setIsAddIncomeModalOpen(false);
    // }
  };

  const handleAddExpense = (expense) => {
    if (expense.price > walletBalance) {
      alert("Error: Expense amount exceeds wallet balance.");
      return;
    }

    const newExpense = { ...expense, price: Number(expense.price), id: Date.now() };

    setExpenses(prev => [...prev, newExpense]);
    setWalletBalance(prev => prev - newExpense.price);
    setIsAddExpenseModalOpen(false);
  };

  const handleEditExpense = (updatedExpense) => {
      const oldExpense = expenses.find(e => e.id === updatedExpense.id);
      if (!oldExpense) return;

      const priceDifference = updatedExpense.price - oldExpense.price;

      if (walletBalance - priceDifference < 0) {
          alert("Error: Updated expense amount exceeds available wallet balance.");
          return;
      }
      
      setExpenses(prev => prev.map(e => 
          e.id === updatedExpense.id ? { ...updatedExpense, price: Number(updatedExpense.price) } : e
      ));
      setWalletBalance(prev => prev - priceDifference);
      setEditingExpense(null);
  };

  const handleDeleteExpense = (id) => {
    const expenseToDelete = expenses.find(e => e.id === id);
    if (!expenseToDelete) return;

    setExpenses(prev => prev.filter(e => e.id !== id));
    setWalletBalance(prev => prev + expenseToDelete.price);
  };


  const AddIncomeModal = () => (
    <Modal
      isOpen={isAddIncomeModalOpen}
      onRequestClose={() => setIsAddIncomeModalOpen(false)}
      className="Modal"
      overlayClassName="Overlay"
      contentLabel="Add Balance"
    >
      <h3>Add Balance</h3>
      <div className="modal-content">
        <input
          type="number"
          placeholder="Income Amount"
          value={incomeAmount}
          onChange={(e) => setIncomeAmount(e.target.value)}
          name="incomeAmount" 
        />
        <div className="modal-actions">
          <button onClick={handleAddIncome} type="submit" className="button-primary">Add Balance</button>
          <button onClick={() => setIsAddIncomeModalOpen(false)} className="button-secondary">Cancel</button>
        </div>
      </div>
    </Modal>
  );

  const ExpenseForm = ({ initialData = null, onSubmit, onClose }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
    const [date, setDate] = useState(initialData?.date || '');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title || !price || !category || !date) {
        alert('All fields are required.');
        return;
      }
      onSubmit({
        id: initialData?.id,
        title,
        price: Number(price),
        category,
        date,
      });
      if (!initialData) {
        setTitle('');
        setPrice('');
        setCategory(CATEGORIES[0]);
        setDate('');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="expense-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div className="modal-actions">
          <button type="submit" className="button-primary">
            {initialData ? 'Save Changes' : 'Add Expense'}
          </button>
          <button type="button" onClick={onClose} className="button-secondary">Cancel</button>
        </div>
      </form>
    );
  };
  
  const AddEditExpenseModal = () => (
    <Modal
        isOpen={isAddExpenseModalOpen || !!editingExpense}
        onRequestClose={() => {
            setIsAddExpenseModalOpen(false);
            setEditingExpense(null);
        }}
        className="Modal"
        overlayClassName="Overlay"
        contentLabel={editingExpense ? "Edit Expense" : "Add Expenses"}
    >
        <h3>{editingExpense ? "Edit Expense" : "Add Expenses"}</h3>
        <ExpenseForm 
            initialData={editingExpense} 
            onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
            onClose={() => {
                setIsAddExpenseModalOpen(false);
                setEditingExpense(null);
            }}
        />
    </Modal>
  );
  
  const ExpenseItem = ({ expense }) => (
    <div className="transaction-item">
        <div className="transaction-details">
            <span className="transaction-title">{expense.title}</span>
            <span className="transaction-date">{expense.date}</span>
        </div>
        <div className="transaction-actions">
            <span className="transaction-amount">₹{expense.price}</span>
            <button className="edit-button" onClick={() => setEditingExpense(expense)}>
                ✏️
            </button>
            <button className="delete-button" onClick={() => handleDeleteExpense(expense.id)}>
                🗑️
            </button>
        </div>
    </div>
  );

  const ExpenseSummaryChart = ({ data }) => {
    const colors = { Food: '#8884d8', Entertainment: '#ffc658', Travel: '#82ca9d' };
    const nonZeroData = data.filter(item => item.value > 0);
    const total = nonZeroData.reduce((sum, item) => sum + item.value, 0);

    return (
        <ResponsiveContainer width="100%" height={200}>
            {total > 0 ? (
                <PieChart>
                    <Pie
                        data={nonZeroData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                        {nonZeroData.map((entry, index) => (
                            <Pie key={`cell-${index}`} fill={colors[entry.name]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => `₹${value}`} />
                    <Legend />
                </PieChart>
            ) : (
                <div className="chart-placeholder">100% - 0%</div>
            )}
        </ResponsiveContainer>
    );
  };

  const ExpenseTrendsChart = ({ data }) => {
    const barData = CATEGORIES.map(category => ({
        name: category,
        amount: expenses
            .filter(e => e.category === category)
            .reduce((sum, e) => sum + e.price, 0),
    }));

    const colors = { Food: '#8884d8', Entertainment: '#ffc658', Travel: '#82ca9d' };

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#fff" />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Bar dataKey="amount" fill="#8884d8" name="Total Spent" label={{ position: 'right', fill: '#fff' }}>
                    {barData.map((entry, index) => (
                        <Bar key={`bar-${index}`} fill={colors[entry.name]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
  };


  return (
    <div className="App" id="root">
        <div className="app-container">
            <header>
                <h1>Expense Tracker</h1>
            </header>
            
            <main>
                <div className="card-group">
                    <div className="card wallet-card">
                        <p>Wallet Balance:</p>
                        <h2>₹{walletBalance}</h2>
                        <button className="add-income-button" onClick={() => setIsAddIncomeModalOpen(true)}>
                            + Add Income
                        </button>
                    </div>

                    <div className="card expenses-card">
                        <p>Expenses:</p>
                        <h2>₹{totalExpenses}</h2>
                        <button className="add-expense-button" onClick={() => setIsAddExpenseModalOpen(true)}>
                            + Add Expense
                        </button>
                    </div>

                    <div className="card pie-chart-card">
                        <ExpenseSummaryChart data={pieChartData} />
                    </div>
                </div>

                <div className="dashboard-sections">
                    <section className="recent-transactions">
                        <h3>Recent Transactions</h3>
                        <div className="transaction-list">
                            {expenses.length === 0 ? (
                                <p>No transactions!</p>
                            ) : (
                                expenses
                                    .slice()
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map(expense => (
                                        <ExpenseItem key={expense.id} expense={expense} />
                                    ))
                            )}
                        </div>
                    </section>

                    <section className="top-expenses">
                        <h3>Top Expenses</h3>
                        <ExpenseTrendsChart data={expenses} />
                    </section>
                </div>
            </main>

            <AddIncomeModal />
            <AddEditExpenseModal />
        </div>
    </div>
  );
}

export default App;
