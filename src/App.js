



import React, { useEffect, useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import ReactModal from 'react-modal';
import {
  BarChart as ReBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Legend,
} from 'recharts';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { PiPizza, PiGift } from 'react-icons/pi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { BsSuitcase2 } from 'react-icons/bs';

// Inline all module CSS here so this file is self-contained
const stylesCSS = `
/* Home.module.css */
.container{
    background:var(--primary-bg-color);
    padding:24px;
    min-height: 100vh;
}
.container h1{
    color:#fff;
    margin-bottom:10px;
}
.cardsWrapper{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap:32px;
    padding:48px;
    background: #626262;
    border-radius: 10px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    margin-bottom: 32px;
}
.transactionsWrapper{
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap:32px;
}

/*Mobile styles*/
@media(max-width:767px){
    .container h1{
        text-align: center;
    }
    .cardsWrapper{
        padding: 16px;
        grid-template-columns: 1fr;
        gap:24px;
    }
    .transactionsWrapper{
        grid-template-columns: 1fr;
    }
}

/* BarChart.module.css */
.expenseChart h2 {
  font-size: 28px;
  color: #fff;
  font-style: italic;
  margin-bottom: 10px;
}

.barWrapper {
  background: #fff;
  border-radius: 10px;
  padding: 5px 20px;
}

@media (max-width: 767px) {
  .expenseChart h2 {
    text-align: center;
  }
}

/* Button.module.css */
.button{
    background: #E3E3E3;
    border:0;
    font-weight: 700;
    font-size: 1rem;
    border-radius: 15px;
    padding:12px 30px;
    color:#000;
    cursor: pointer;
}

.primary{
    background: #F4BB4A;
    color: #FFFFFF;
}

.secondary{
    background: #E3E3E3;
    color:#000;
    font-weight: 400;
    width: fit-content;
}

.success{
    background: linear-gradient(90deg, #B5DC52, #89E148);
    color:#fff;
}

.failure{
    background: linear-gradient(90deg, #FF9595, #FF4747, #FF3838);
    color:#fff;
}

.shadow{
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
}

/* Card.module.css */
.card{
    background-color: var(--secondary-bg-color);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 45px 20px;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
}
.cardTitle{
    color:#FFFFFF;
    font-weight: 400;
    font-size:30px;
    margin-bottom:12px;
}
.cardTitle span{
    font-weight: 700;
}
.card .success{
    color:#9DFF5B;
}
.card .failure{
    color:#F4BB4A;
}
@media(max-width:767px){
    .card{
        padding:35px 10px;
    }
    .cardTitle{
        font-size:24px;
    }
}

/* AddBalanceForm.module.css */
.formWrapper h3{
    font-size: 30px;
    margin-bottom: 10px;
}
.formWrapper form{
    display: flex;
    flex-wrap: wrap;
    gap:18px;
}
.formWrapper input{
    background: #FBFBFB;
    border:0;
    outline:0;
    color:#333;
    font-size: 1rem;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    padding:12px;
    border-radius: 15px;
    font-family: var(--font-body);
    box-sizing: border-box;
}
@media(max-width:767px){
    .formWrapper form{
        flex-direction: column;
    }
}

/* ExpenseForm.module.css */
.formWrapper.grid h3{}
.formWrapper form{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap:18px;
}
.formWrapper input,
.formWrapper select{
    background: #FBFBFB;
    border:0;
    outline:0;
    color:#333;
    font-size: 1rem;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    padding:12px;
    border-radius: 15px;
    font-family: var(--font-body);
    box-sizing: border-box;
}
@media(max-width:767px){
    .formWrapper form{
        grid-template-columns:1fr ;
    }
}

/* Modal.module.css (empty in original) */

/* Pagination.module.css */
.paginationWrapper{
    display: flex;
    gap:12px;
    justify-content: center;
}

.paginationWrapper p{
    background: #43967B;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    border-radius: 5px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    color:#fff;
}

.paginationWrapper button{
    background: #F1F1F1;
    color:#000;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    border:0;
    font-size:1.4rem;
    cursor: pointer;
}

.paginationWrapper button[disabled]{
    opacity: 0.5;
}

@media(max-width:767px){
    .paginationWrapper button,
    .paginationWrapper p{
        width: 42px;
        height: 42px;
        font-size: 1.4rem;
    }
}

/* PieChart.module.css (empty) */

/* TransactionCard.module.css */
.card{
    border-bottom:1px solid #9B9B9B;
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap:wrap;
    margin-bottom: 24px;
}
.cardInner{
    display: flex;
    gap:20px;
    align-items: center;
}
.cardIcon{
    background: #D9D9D9;
    border-radius: 50%;
    padding:10px;
    font-size:1.2rem;
}
.cardInfo h5{
    font-family: var(--font-body);
    font-size: 1rem;
    color:#000;
    font-weight: 400;
}
.cardInfo p{
    color: #9B9B9B;
    font-size: 1rem;
}
.cardPrice{
    color:#F4BB4A;
    font-weight: 700;
}
.cardButtonWrapper { 
    display: flex;
    gap:8px;
}
.cardButtonWrapper button{
    padding:12px;
    border-radius: 15px;
    border:0;
    box-shadow: 0 4px 4px rgba(0,0,0,0.25);
    font-size: 1.4rem;
    cursor: pointer;
    color:#fff;
}
.cardDelete{
    background: #FF3E3E;
}
.cardEdit{
    background: #F4BB4A;
}

@media(max-width:767px){
    .card{
        flex-direction: column;
        align-items: flex-start;
    }
    .cardInner{
        gap:12px;
    }
    .cardInner:last-child{
        padding-left: 3.3rem;
        justify-content: space-between;
        width: 100%;
    }
    .cardButtonWrapper button{
        font-size: 1.2rem;
        padding:8px;
        border-radius: 0.5rem;
    }
    .cardInfo p{
        font-size: 12px;
    }
}

/* TransactionList.module.css */
.list, 
.emptyTransactionsWrapper{
    background:#fff;
    border-radius: 10px;
    padding:24px;
}

.transactionsWrapper h2{
    font-size: 28px;
    color:#fff;
    font-style: italic;
    margin-bottom:10px;
}

@media(max-width:767px){
    .transactionsWrapper h2{
        text-align: center;
    }
}
`;

ReactModal.setAppElement('#root');

/* Button component */
function Button({ children, handleClick, style = 'primary', shadow = false, type = 'button' }) {
  const classNames = `button ${style} ${shadow ? 'shadow' : ''}`.trim();
  return (
    <button type={type} onClick={handleClick} className={classNames}>
      {children}
    </button>
  );
}

/* Card component */
function Card({ title, money, buttonText, buttonType, handleClick, success = true }) {
  return (
    <div className="card">
      <h3 className="cardTitle">
        {`${title}: `}
        <span className={success ? 'success' : 'failure'}>
          {`₹${money}`}
        </span>
      </h3>
      <Button handleClick={handleClick} style={buttonType}>{buttonText}</Button>
    </div>
  );
}

/* AddBalanceForm */
function AddBalanceForm({ setIsOpen, setBalance }) {
  const [income, setIncome] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(income) < 0) {
      enqueueSnackbar('Income should be greater than 0', { variant: 'warning' });
      setIsOpen(false);
      return;
    }
    setBalance(prev => prev + Number(income));
    setIsOpen(false);
  };

  return (
    <div className="formWrapper">
      <h3>Add Balance</h3>
      <form onSubmit={handleSubmit}>
        <input type="number" placeholder="Income Amount" value={income} onChange={(e) => setIncome(e.target.value)} required />
        <Button type="submit" style="primary" shadow>Add Balance</Button>
        <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>Cancel</Button>
      </form>
    </div>
  );
}

/* ExpenseForm */
function ExpenseForm({ setIsOpen, expenseList, setExpenseList, editId, setBalance, balance }) {
  const [formData, setFormData] = useState({ title: '', category: '', price: '', date: '' });
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData(prev => ({ ...prev, [name]: e.target.value }));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (balance < Number(formData.price)) {
      enqueueSnackbar('Price should be less than the wallet balance', { variant: 'warning' });
      setIsOpen(false);
      return;
    }
    setBalance(prev => prev - Number(formData.price));
    const lastId = expenseList.length > 0 ? expenseList[0].id : 0;
    setExpenseList(prev => [{ ...formData, id: lastId + 1 }, ...prev]);
    setFormData({ title: '', category: '', price: '', date: '' });
    setIsOpen(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const updated = expenseList.map(item => {
      if (item.id == editId) {
        const priceDifference = item.price - Number(formData.price);
        if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
          enqueueSnackbar('Price should not exceed the wallet balance', { variant: 'warning' });
          setIsOpen(false);
          return { ...item };
        }
        setBalance(prev => prev + priceDifference);
        return { ...formData, id: editId };
      } else {
        return item;
      }
    });
    setExpenseList(updated);
    setIsOpen(false);
  };

  useEffect(() => {
    if (editId) {
      const expenseData = expenseList.find(item => item.id == editId);
      setFormData({ title: expenseData.title, category: expenseData.category, price: expenseData.price, date: expenseData.date });
    }
  }, [editId]);

  return (
    <div className="formWrapper">
      <h3>{editId ? 'Edit Expense' : 'Add Expenses'}</h3>
      <form onSubmit={editId ? handleEdit : handleAdd}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="" disabled>Select category</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
          <option value="travel">Travel</option>
        </select>
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <Button type="submit" style="primary" shadow>{editId ? 'Edit Expense' : 'Add Expense'}</Button>
        <Button style="secondary" shadow handleClick={() => setIsOpen(false)}>Cancel</Button>
      </form>
    </div>
  );
}

/* Modal wrapper using react-modal */
function ModalWrapper({ isOpen, setIsOpen, children }) {
  const handleClose = () => setIsOpen(false);
  const customStyles = {
    content: {
      width: '95%',
      maxWidth: '572px',
      top: '50%',
      left: '50%',
      transform: 'translateX(-50%) translateY(-50%)',
      height: 'fit-content',
      maxHeight: '90vh',
      background: 'rgba(239, 239, 239, 0.85)',
      border: '0',
      borderRadius: '15px',
      padding: '2rem',
    }
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={handleClose} shouldCloseOnOverlayClick={true} style={customStyles}>
      {children}
    </ReactModal>
  );
}

/* Pagination */
function Pagination({ updatePage, currentPage, totalPages }) {
  const handlePrev = () => { if (currentPage > 1) updatePage(prev => prev - 1); };
  const handleNext = () => { if (totalPages != currentPage) updatePage(prev => prev + 1); };
  return (
    <div className="paginationWrapper">
      <button onClick={handlePrev} disabled={currentPage == 1}><IoIosArrowRoundBack /></button>
      <p>{currentPage}</p>
      <button onClick={handleNext} disabled={totalPages == currentPage}><IoIosArrowRoundForward /></button>
    </div>
  );
}

/* PieChart component */
function PieChartComponent({ data }) {
  const COLORS = ['#A000FF', '#FF9304', '#FDE006'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
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
    <ResponsiveContainer width="100%" height={250}>
      <RePieChart width={400} height={400}>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
        </Pie>
        <Legend iconType="rect" verticalAlign="bottom" />
      </RePieChart>
    </ResponsiveContainer>
  );
}

/* BarChart component */
function BarChartComponent({ data }) {
  return (
    <div className="expenseChart">
      <h2>Top Expenses</h2>
      <div className="barWrapper">
        <ResponsiveContainer width="100%" height={280}>
          <ReBarChart data={data} layout="vertical">
            <XAxis type="number" axisLine={false} display="none" />
            <YAxis type="category" width={100} dataKey="name" axisLine={false} />
            <Bar dataKey="value" fill="#8884d8" barSize={25} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* TransactionCard */
function TransactionCard({ details, handleDelete, handleEdit }) {
  return (
    <div className="card">
      <div className="cardInner">
        <div className="cardIcon">
          {details.category == 'food' && <PiPizza />}
          {details.category == 'entertainment' && <PiGift />}
          {details.category == 'travel' && <BsSuitcase2 />}
        </div>
        <div className="cardInfo">
          <h5>{details.title}</h5>
          <p>{details.date}</p>
        </div>
      </div>
      <div className="cardInner">
        <p className="cardPrice">{`₹${details.price}`}</p>
        <div className="cardButtonWrapper">
          <button className="cardDelete" onClick={handleDelete}><IoMdCloseCircleOutline /></button>
          <button className="cardEdit" onClick={handleEdit}><MdOutlineModeEdit /></button>
        </div>
      </div>
    </div>
  );
}

/* TransactionList */
function TransactionList({ transactions, title, editTransactions, balance, setBalance }) {
  const [editId, setEditId] = useState(0);
  const [isDisplayEditor, setIsDisplayEditor] = useState(false);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const maxRecords = 3;
  const [totalPages, setTotalPages] = useState(0);

  const handleDelete = (id) => {
    const item = transactions.find(i => i.id == id);
    const price = Number(item.price);
    setBalance(prev => prev + price);
    editTransactions(prev => prev.filter(item => item.id != id));
  };

  const handleEdit = (id) => { setEditId(id); setIsDisplayEditor(true); };

  useEffect(() => {
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, transactions.length);
    setCurrentTransactions([...transactions].slice(startIndex, endIndex));
    setTotalPages(Math.ceil(transactions.length / maxRecords));
  }, [currentPage, transactions]);

  useEffect(() => { if (totalPages < currentPage && currentPage > 1) setCurrentPage(prev => prev - 1); }, [totalPages]);

  return (
    <div className="transactionsWrapper">
      {title && <h2>{title}</h2>}
      {transactions.length > 0 ? (
        <div className="list">
          <div>{currentTransactions.map(transaction => (
            <TransactionCard details={transaction} key={transaction.id} handleDelete={() => handleDelete(transaction.id)} handleEdit={() => handleEdit(transaction.id)} />
          ))}</div>
          {totalPages > 1 && (<Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}
        </div>
      ) : (
        <div className="emptyTransactionsWrapper"><p>No transactions!</p></div>
      )}

      <ModalWrapper isOpen={isDisplayEditor} setIsOpen={setIsDisplayEditor}>
        <ExpenseForm editId={editId} expenseList={transactions} setExpenseList={editTransactions} setIsOpen={setIsDisplayEditor} balance={balance} setBalance={setBalance} />
      </ModalWrapper>
    </div>
  );
}

/* Home (main page) */
function Home() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expenseList, setExpenseList] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isOpenExpense, setIsOpenExpense] = useState(false);
  const [isOpenBalance, setIsOpenBalance] = useState(false);
  const [categorySpends, setCategorySpends] = useState({ food: 0, entertainment: 0, travel: 0 });
  const [categoryCount, setCategoryCount] = useState({ food: 0, entertainment: 0, travel: 0 });

  useEffect(() => {
    const localBalance = localStorage.getItem('balance');
    if (localBalance) setBalance(Number(localBalance));
    else { setBalance(5000); localStorage.setItem('balance', 5000); }
    const items = JSON.parse(localStorage.getItem('expenses'));
    setExpenseList(items || []);
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (expenseList.length > 0 || isMounted) localStorage.setItem('expenses', JSON.stringify(expenseList));
    if (expenseList.length > 0) setExpense(expenseList.reduce((acc, cur) => acc + Number(cur.price), 0)); else setExpense(0);
    let foodSpends = 0, entertainmentSpends = 0, travelSpends = 0;
    let foodCount = 0, entertainmentCount = 0, travelCount = 0;
    expenseList.forEach((item) => {
      if (item.category == 'food') { foodSpends += Number(item.price); foodCount++; }
      else if (item.category == 'entertainment') { entertainmentSpends += Number(item.price); entertainmentCount++; }
      else if (item.category == 'travel') { travelSpends += Number(item.price); travelCount++; }
    });
    setCategorySpends({ food: foodSpends, travel: travelSpends, entertainment: entertainmentSpends });
    setCategoryCount({ food: foodCount, travel: travelCount, entertainment: entertainmentCount });
  }, [expenseList]);

  useEffect(() => { if (isMounted) localStorage.setItem('balance', balance); }, [balance]);

  return (
    <div className="container">
      <style>{stylesCSS}</style>
      <h1>Expense Tracker</h1>
      <div className="cardsWrapper">
        <Card title="Wallet Balance" money={balance} buttonText="+ Add Income" buttonType="success" handleClick={() => setIsOpenBalance(true)} />
        <Card title="Expenses" money={expense} buttonText="+ Add Expense" buttonType="failure" success={false} handleClick={() => setIsOpenExpense(true)} />
        <PieChartComponent data={[ { name: 'Food', value: categorySpends.food }, { name: 'Entertainment', value: categorySpends.entertainment }, { name: 'Travel', value: categorySpends.travel } ]} />
      </div>
      <div className="transactionsWrapper">
        <TransactionList transactions={expenseList} editTransactions={setExpenseList} title="Recent Transactions" balance={balance} setBalance={setBalance} />
        <BarChartComponent data={[ { name: 'Food', value: categorySpends.food }, { name: 'Entertainment', value: categorySpends.entertainment }, { name: 'Travel', value: categorySpends.travel } ]} />
      </div>
      <ModalWrapper isOpen={isOpenExpense} setIsOpen={setIsOpenExpense}>
        <ExpenseForm setIsOpen={setIsOpenExpense} expenseList={expenseList} setExpenseList={setExpenseList} setBalance={setBalance} balance={balance} />
      </ModalWrapper>
      <ModalWrapper isOpen={isOpenBalance} setIsOpen={setIsOpenBalance}>
        <AddBalanceForm setIsOpen={setIsOpenBalance} setBalance={setBalance} />
      </ModalWrapper>
    </div>
  );
}

export default function App() {
  return (
    <SnackbarProvider>
      <div>
        <Home />
      </div>
    </SnackbarProvider>
  );
}



// // eslint-disable-next-line no-unused-vars
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import './App.css';
// import Modal from 'react-modal';
// import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Modal.setAppElement('#root');

// const getInitialState = (key, defaultValue) => {
//   const storedValue = localStorage.getItem(key);
//   try {
//     return storedValue ? JSON.parse(storedValue) : defaultValue;
//   } catch {
//     return defaultValue;
//   }
// };

// const CATEGORIES = ['Food', 'Entertainment', 'Travel'];
// const INITIAL_BALANCE = 5000;

// function App() {
//   const [walletBalance, setWalletBalance] = useState(() => getInitialState('walletBalance', INITIAL_BALANCE));
//   const [expenses, setExpenses] = useState(() => getInitialState('expenses', []));
//   const [isAddIncomeModalOpen, setIsAddIncomeModalOpen] = useState(false);
//   const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
//   const [incomeAmount, setIncomeAmount] = useState('');
//   const [editingExpense, setEditingExpense] = useState(null);

//   useEffect(() => {
//     localStorage.setItem('walletBalance', JSON.stringify(walletBalance));
//   }, [walletBalance]);

//   useEffect(() => {
//     localStorage.setItem('expenses', JSON.stringify(expenses));
//   }, [expenses]);

//   const totalExpenses = expenses.reduce((sum, expense) => sum + expense.price, 0);

//   const expenseSummary = useMemo(() => {
//     const summary = CATEGORIES.map(category => ({
//       name: category,
//       value: expenses
//         .filter(e => e.category === category)
//         .reduce((sum, e) => sum + e.price, 0),
//     }));
//     return summary.filter(item => item.value > 0);
//   }, [expenses]);

//   const pieChartData = useMemo(() => {
//       const summary = expenseSummary.reduce((acc, item) => {
//           acc[item.name] = item.value;
//           return acc;
//       }, { Food: 0, Entertainment: 0, Travel: 0 });

//       return [
//           { name: 'Food', value: summary.Food },
//           { name: 'Entertainment', value: summary.Entertainment },
//           { name: 'Travel', value: summary.Travel },
//       ];
//   }, [expenseSummary]);

//   const handleAddIncome = () => {
//     const amount = Number(incomeAmount);
//     // if (amount > 0) {
//       setWalletBalance(prev => prev + amount);
//       setIncomeAmount('');
//       setIsAddIncomeModalOpen(false);
//     // }
//   };

//   const handleAddExpense = (expense) => {
//     if (expense.price > walletBalance) {
//       alert("Error: Expense amount exceeds wallet balance.");
//       return;
//     }

//     const newExpense = { ...expense, price: Number(expense.price), id: Date.now() };

//     setExpenses(prev => [...prev, newExpense]);
//     setWalletBalance(prev => prev - newExpense.price);
//     setIsAddExpenseModalOpen(false);
//   };

//   const handleEditExpense = (updatedExpense) => {
//       const oldExpense = expenses.find(e => e.id === updatedExpense.id);
//       if (!oldExpense) return;

//       const priceDifference = updatedExpense.price - oldExpense.price;

//       if (walletBalance - priceDifference < 0) {
//           alert("Error: Updated expense amount exceeds available wallet balance.");
//           return;
//       }
      
//       setExpenses(prev => prev.map(e => 
//           e.id === updatedExpense.id ? { ...updatedExpense, price: Number(updatedExpense.price) } : e
//       ));
//       setWalletBalance(prev => prev - priceDifference);
//       setEditingExpense(null);
//   };

//   const handleDeleteExpense = (id) => {
//     const expenseToDelete = expenses.find(e => e.id === id);
//     if (!expenseToDelete) return;

//     setExpenses(prev => prev.filter(e => e.id !== id));
//     setWalletBalance(prev => prev + expenseToDelete.price);
//   };


//   const AddIncomeModal = () => (
//     <Modal
//       isOpen={isAddIncomeModalOpen}
//       onRequestClose={() => setIsAddIncomeModalOpen(false)}
//       className="Modal"
//       overlayClassName="Overlay"
//       contentLabel="Add Balance"
//     >
//       <h3>Add Balance</h3>
//       <div className="modal-content">
//         <input
//           type="number"
//           placeholder="Income Amount"
//           value={incomeAmount}
//           onChange={(e) => setIncomeAmount(e.target.value)}
//           name="incomeAmount" 
//         />
//         <div className="modal-actions">
//           <button onClick={handleAddIncome} type="submit" className="button-primary">Add Balance</button>
//           <button onClick={() => setIsAddIncomeModalOpen(false)} className="button-secondary">Cancel</button>
//         </div>
//       </div>
//     </Modal>
//   );

//   const ExpenseForm = ({ initialData = null, onSubmit, onClose }) => {
//     const [title, setTitle] = useState(initialData?.title || '');
//     const [price, setPrice] = useState(initialData?.price || '');
//     const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
//     const [date, setDate] = useState(initialData?.date || '');

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (!title || !price || !category || !date) {
//         alert('All fields are required.');
//         return;
//       }
//       onSubmit({
//         id: initialData?.id,
//         title,
//         price: Number(price),
//         category,
//         date,
//       });
//       if (!initialData) {
//         setTitle('');
//         setPrice('');
//         setCategory(CATEGORIES[0]);
//         setDate('');
//       }
//     };

//     return (
//       <form onSubmit={handleSubmit} className="expense-form">
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//         <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
//           {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//         </select>
//         <input
//           type="date"
//           name="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           required
//         />
//         <div className="modal-actions">
//           <button type="submit" className="button-primary">
//             {initialData ? 'Save Changes' : 'Add Expense'}
//           </button>
//           <button type="button" onClick={onClose} className="button-secondary">Cancel</button>
//         </div>
//       </form>
//     );
//   };
  
//   const AddEditExpenseModal = () => (
//     <Modal
//         isOpen={isAddExpenseModalOpen || !!editingExpense}
//         onRequestClose={() => {
//             setIsAddExpenseModalOpen(false);
//             setEditingExpense(null);
//         }}
//         className="Modal"
//         overlayClassName="Overlay"
//         contentLabel={editingExpense ? "Edit Expense" : "Add Expenses"}
//     >
//         <h3>{editingExpense ? "Edit Expense" : "Add Expenses"}</h3>
//         <ExpenseForm 
//             initialData={editingExpense} 
//             onSubmit={editingExpense ? handleEditExpense : handleAddExpense}
//             onClose={() => {
//                 setIsAddExpenseModalOpen(false);
//                 setEditingExpense(null);
//             }}
//         />
//     </Modal>
//   );
  
//   const ExpenseItem = ({ expense }) => (
//     <div className="transaction-item">
//         <div className="transaction-details">
//             <span className="transaction-title">{expense.title}</span>
//             <span className="transaction-date">{expense.date}</span>
//         </div>
//         <div className="transaction-actions">
//             <span className="transaction-amount">₹{expense.price}</span>
//             <button className="edit-button" onClick={() => setEditingExpense(expense)}>
//                 ✏️
//             </button>
//             <button className="delete-button" onClick={() => handleDeleteExpense(expense.id)}>
//                 🗑️
//             </button>
//         </div>
//     </div>
//   );

//   const ExpenseSummaryChart = ({ data }) => {
//     const colors = { Food: '#8884d8', Entertainment: '#ffc658', Travel: '#82ca9d' };
//     const nonZeroData = data.filter(item => item.value > 0);
//     const total = nonZeroData.reduce((sum, item) => sum + item.value, 0);

//     return (
//         <ResponsiveContainer width="100%" height={200}>
//             {total > 0 ? (
//                 <PieChart>
//                     <Pie
//                         data={nonZeroData}
//                         dataKey="value"
//                         nameKey="name"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         fill="#8884d8"
//                         labelLine={false}
//                         label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     >
//                         {nonZeroData.map((entry, index) => (
//                             <Pie key={`cell-${index}`} fill={colors[entry.name]} />
//                         ))}
//                     </Pie>
//                     <Tooltip formatter={(value) => `₹${value}`} />
//                     <Legend />
//                 </PieChart>
//             ) : (
//                 <div className="chart-placeholder">100% - 0%</div>
//             )}
//         </ResponsiveContainer>
//     );
//   };

//   const ExpenseTrendsChart = ({ data }) => {
//     const barData = CATEGORIES.map(category => ({
//         name: category,
//         amount: expenses
//             .filter(e => e.category === category)
//             .reduce((sum, e) => sum + e.price, 0),
//     }));

//     const colors = { Food: '#8884d8', Entertainment: '#ffc658', Travel: '#82ca9d' };

//     return (
//         <ResponsiveContainer width="100%" height={200}>
//             <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
//                 <XAxis type="number" hide />
//                 <YAxis dataKey="name" type="category" stroke="#fff" />
//                 <Tooltip formatter={(value) => `₹${value}`} />
//                 <Bar dataKey="amount" fill="#8884d8" name="Total Spent" label={{ position: 'right', fill: '#fff' }}>
//                     {barData.map((entry, index) => (
//                         <Bar key={`bar-${index}`} fill={colors[entry.name]} />
//                     ))}
//                 </Bar>
//             </BarChart>
//         </ResponsiveContainer>
//     );
//   };


//   return (
//     <div className="App" id="root">
//         <div className="app-container">
//             <header>
//                 <h1>Expense Tracker</h1>
//             </header>
            
//             <main>
//                 <div className="card-group">
//                     <div className="card wallet-card">
//                         <p>Wallet Balance:</p>
//                         <h2>₹{walletBalance}</h2>
//                         <button className="add-income-button" onClick={() => setIsAddIncomeModalOpen(true)}>
//                             + Add Income
//                         </button>
//                     </div>

//                     <div className="card expenses-card">
//                         <p>Expenses:</p>
//                         <h2>₹{totalExpenses}</h2>
//                         <button className="add-expense-button" onClick={() => setIsAddExpenseModalOpen(true)}>
//                             + Add Expense
//                         </button>
//                     </div>

//                     <div className="card pie-chart-card">
//                         <ExpenseSummaryChart data={pieChartData} />
//                     </div>
//                 </div>

//                 <div className="dashboard-sections">
//                     <section className="recent-transactions">
//                         <h3>Recent Transactions</h3>
//                         <div className="transaction-list">
//                             {expenses.length === 0 ? (
//                                 <p>No transactions!</p>
//                             ) : (
//                                 expenses
//                                     .slice()
//                                     .sort((a, b) => new Date(b.date) - new Date(a.date))
//                                     .map(expense => (
//                                         <ExpenseItem key={expense.id} expense={expense} />
//                                     ))
//                             )}
//                         </div>
//                     </section>

//                     <section className="top-expenses">
//                         <h3>Top Expenses</h3>
//                         <ExpenseTrendsChart data={expenses} />
//                     </section>
//                 </div>
//             </main>

//             <AddIncomeModal />
//             <AddEditExpenseModal />
//         </div>
//     </div>
//   );
// }

// export default App;
