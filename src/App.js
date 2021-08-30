import "./App.css";

import React, { useState } from "react";

import BTCData from "./components/BTCData";
import DisplayError from "./components/DisplayError";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchClick = (_e) => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resData) => setData(resData))
      .catch((err) => setError(err));
  };

  const fetchBtnText = data || error ? "Refresh Data" : "Fetch Data";

  return (
    <div>
      <button onClick={handleFetchClick}>{fetchBtnText}</button>

      <BTCData data={data} />
      <DisplayError error={error} />
    </div>
  );
}

export default App;
