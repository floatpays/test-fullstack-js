import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

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

  return (
    <div className="App">
      <h2>Floatpays</h2>

      <hr />

      <h3>Transactions</h3>

      {transactions.map((transaction) => (
        <p key={transaction.reference}>[{transaction.createdAt}] R{transaction.amount} - {transaction.description}</p>
      ))}

    </div>
  );
}

export default App;
