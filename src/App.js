import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const emptyFormData = {
    amount: "",
    description: ""
  };

  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState(emptyFormData);

  const fetchTransactions = async () => {
    const { data } = await Axios.get('/api/v1/transactions');

    const transactions = data.map(transaction => {
      const { created_at, amount, description, reference } = transaction;
      const createdAt = new Date(created_at).toLocaleString();

      return { createdAt, amount, description, reference };
    });

    setTransactions(transactions);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await Axios.post('/api/v1/transactions', {amount: 200, description: "foobar"});
    console.log(result);

    await fetchTransactions();

    setFormData(emptyFormData);
  };

  return (
    <div className="App">
    <h2>Floatpays</h2>

    <hr />

    <form onSubmit={handleSubmit}>
    <label>
    Amount:
    <input type="text" name="amount" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
    </label>
    <label>
    Description:
    <input type="text" name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
    </label>
    <br />
    <input type="submit" value="Submit" />
    </form>

    <h3>Transactions</h3>

    {transactions.map((transaction) => (
      <p key={transaction.reference}>[{transaction.createdAt}] R{transaction.amount} - {transaction.description}</p>
    ))}

    </div>
  );
}

export default App;
