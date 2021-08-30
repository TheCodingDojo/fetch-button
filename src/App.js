import "./App.css";

import React, { useState } from "react";

import BTCData from "./components/BTCData";
import DisplayError from "./components/DisplayError";

function App() {
  const [prevData, setPrevData] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchClick = (_e) => {
    // fetch("http://httpstat.us/500") // error test
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resData) => {
        if (data) {
          setPrevData(data);
        }

        setData(resData);
        // Clear any prior error.
        setError(null);
      })
      .catch((err) => setError(err));
  };

  const fetchBtnText = data || error ? "Refresh Data" : "Fetch Data";

  return (
    <div style={{ maxWidth: "85%", margin: "0 auto", paddingTop: 20 }}>
      <button onClick={handleFetchClick}>{fetchBtnText}</button>

      <BTCData data={prevData} />
      <BTCData data={data} />
      <DisplayError error={error} />
    </div>
  );
}

export default App;
