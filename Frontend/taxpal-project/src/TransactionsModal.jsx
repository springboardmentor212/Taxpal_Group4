import './TransactionsModal.css'; 
function TransactionsModal({ transactions, closeForm }) {
  return (
    <div className="modal-overlay">
      <div className="transactions-modal-box">
        <div className="modal-header">
          <h2>All Transactions</h2>
        </div>
        <p className="modal-subtitle">Detailed history of all your recorded financial activities.</p>
        <div className="transactions-list-container">
          <div className="modal-table-row modal-table-header">
            <p>Sno</p>
            <p>Date</p>
            <p>Description</p>
            <p>Category</p>
            <p>Amount</p>
            <p>Type</p>
          </div>
          {transactions.map((t, index) => (
            <div className="modal-table-row transaction-row-item" key={t.id}>
              <p>{index + 1}</p>
              <p>{t.date}</p>
              <p>{t.description}</p>
              <p>{t.category}</p>
              <p className={t.type === 'Income' ? 'amount-income' : 'amount-expense'}>
                {t.type === 'Income' ? `+$${t.amount}` : `-$${t.amount}`}
              </p>
              <p>{t.type}</p>
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button className="close-btn" type="button" onClick={closeForm}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default TransactionsModal;