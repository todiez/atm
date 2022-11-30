const ATMDeposit = ({ onChange, isDeposit }) => {
  const choice = ["Deposit", "Withdraw"];

  return (
    <label className="label huge">
      <h3>{choice[Number(!isDeposit)]}</h3>
      <input type="number" onChange={onChange}></input>
      <input type="submit" value="Submit"></input>
    </label>
  );
};

const Account = () => {
  let deposit = 0 ;
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);

  let status = `Account Balance: $ ${totalState}`;

  const handleChange = e => {
    console.log(`handleChange ${e.target.value}`);
    deposit = Number(e.target.value);
  };
  const handleSubmit = () => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    if (newTotal < 0) {
      alert("Not enough Cash... GAME OVER!");
      return;
    }
    setTotalState(newTotal);
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <button onClick={() => setIsDeposit(true)}>Deposit</button>
      <button onClick={() => setIsDeposit(false)}>Withdraw</button>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit}></ATMDeposit>
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
