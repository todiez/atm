const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ["Deposit", "Withdraw"];
  //console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input
        id="number-input"
        type="number"
        width="200"
        onChange={onChange}
      ></input>
      <input
        type="submit"
        disabled={!isValid}
        width="200"
        value="Submit"
        id="submit-input"
      ></input>
    </label>
  );
};


const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance: $ ${totalState} `;
  //console.log(`Account Rendered with isDeposit: ${isDeposit}`);

  const handleChange = (event) => {
    let val = Number(event.target.value);
    //console.log(val);
    setDeposit(val);

    //console.log(`handleChange ${event.target.value}`);
    if (val <= 0) {
      return setValidTransaction(false);
    }

    if (atmMode === "Withdraw" && val > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }

    event.preventDefault();
  };

  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    //console.log(newTotal);
    setTotalState(newTotal);
    setValidTransaction(false); 
    
    if (atmMode === "Deposit") {
      setValidTransaction(true);
    } 
    
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    //console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if (event.target.value === "Deposit") {
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };

  return (
    <div className="atm">
      <h1>Best ATM ever!</h1>
      <form onSubmit={handleSubmit}>
        <label>Select an option below to continue</label>
        <select
          onChange={(e) => handleModeSelect(e)}
          name="mode"
          id="mode-select"
        >
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
            Deposit
          </option>
          <option id="cashback-selection" value="Withdraw">
            Withdraw
          </option>
        </select>

        <h2 id="total">{status}</h2>

        {atmMode && (
          <ATMDeposit
            onChange={handleChange}
            isDeposit={isDeposit}
            isValid={validTransaction}
          ></ATMDeposit>
        )}
      </form>
    </div>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
