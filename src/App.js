import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const { data } = await Axios.get('http://localhost:4000/api/v1/transactions');

    setTransactions(data);
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
      <p key={transaction.reference}>R{transaction.amount} - {transaction.description}</p>
    ))}

    </div>
  );
}

export default App;
