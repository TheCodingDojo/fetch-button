import "./App.css";

import React, { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchClick = (_e) => {
    setData("test");
    // setError("test");
  };

  const fetchBtnText = data || error ? "Refresh Data" : "Fetch Data";

  return (
    <div>
      <button onClick={handleFetchClick}>{fetchBtnText}</button>

      {!error && <div>{data}</div>}
    </div>
  );
}

export default App;
