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

  let pctChange = null;

  if (data && prevData) {
    const usdPriceChange =
      data.bpi.USD.rate_float - prevData.bpi.USD.rate_float;

    pctChange = ((usdPriceChange / prevData.bpi.USD.rate_float) * 100).toFixed(
      2
    );
  }

  // If this were a larger project, I would use a CSS-in-js library.
  return (
    <div style={{ maxWidth: "85%", margin: "0 auto", paddingTop: 20 }}>
      <button
        onClick={handleFetchClick}
        style={{
          padding: 5,
          fontSize: 20,
        }}
      >
        {fetchBtnText}
      </button>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <BTCData
          data={prevData}
          // Additional / override styles.
          style={{
            marginRight: 15,
            backgroundColor: "white",
          }}
        />

        {pctChange && (
          <p
            style={{
              fontWeight: "bold",
              color: pctChange < 0 ? "red" : "green",
              marginRight: 15,
            }}
          >
            {pctChange}%
          </p>
        )}

        <BTCData data={data} />
      </div>
      <DisplayError error={error} />
    </div>
  );
}

export default App;
