import styles from './ExpenseForm.module.css'
import Button from '../../Button/Button.jsx'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack';

const ExpenseForm = ({ setIsOpen, expenseList, setExpenseList, editId, setBalance, balance }) => {

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        date: '',
    })

    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }
    const handleAdd = (e) => {
        e.preventDefault()
        const priceAmount = Number(formData.price);

        if (balance < priceAmount) {
            enqueueSnackbar("Price should be less than the wallet balance", { variant: "warning" })
            setIsOpen(false) 
            return
        }

        setBalance(prev => prev - priceAmount)

        const lastId = expenseList.length > 0 ? expenseList[0].id : 0
        const newExpense = { ...formData, id: lastId + 1, price: priceAmount }

        setExpenseList(prev => [newExpense, ...prev])

        setFormData({ title: '', category: '', price: '', date: '' })
        enqueueSnackbar("Expense added successfully!", { variant: "success" })
        setIsOpen(false)
    }

    const handleEdit = (e) => {
        e.preventDefault()

        let updatedItem = null;
        const newPrice = Number(formData.price);

        const updatedList = expenseList.map(item => {
            if (item.id === editId) { 
                const oldPrice = Number(item.price);
                const priceDifference = oldPrice - newPrice;
                if (priceDifference < 0 && Math.abs(priceDifference) > balance) {
                    enqueueSnackbar("Price increase exceeds current wallet balance", { variant: "warning" })
                    return item
                }

                setBalance(prev => prev + priceDifference);
                
                updatedItem = { ...formData, id: editId, price: newPrice };
                return updatedItem;
            }
            return item
        });
        
        if (updatedItem) {
            setExpenseList(updatedList);
            enqueueSnackbar("Expense updated successfully!", { variant: "success" })
            setIsOpen(false);
        }
    }

    useEffect(() => {
        if (editId) {
            const expenseData = expenseList.find(item => item.id === editId) 

            if (expenseData) { 
                setFormData({
                    title: expenseData.title,
                    category: expenseData.category,
                    price: String(expenseData.price), 
                    date: expenseData.date
                })
            }
        }
    }, [editId, expenseList]) 

    return (
        <div className={styles.formWrapper}>
            <h3>{editId ? 'Edit Expense' : 'Add Expenses'}</h3>
            <form onSubmit={editId ? handleEdit : handleAdd}>
                
                <input type="text" name="title" placeholder='Title'
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input type="number" name="price" placeholder='Price'
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <select name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value='' disabled>Select category</option>
                    <option value='food'>Food</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>
                </select>

                <input name="date" type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <Button type="submit" btnStyle="primary" shadow>
                    {editId ? 'Edit Expense' : 'Add Expense'}
                </Button>

                <Button btnStyle='secondary' shadow
                    handleClick={() => setIsOpen(false)}
                >
                    Cancel
                </Button>
            </form>
        </div>
    )
}

export default ExpenseForm;
