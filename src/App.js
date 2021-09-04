import "./App.css";

import React, { useState } from "react";

import DisplayError from "./components/DisplayError";
import UsersTable from "./components/UsersTable";
import UserCard from "./components/UserCard";

function App() {
  const [users, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleFetchClick = (_e) => {
    setLoading(true);

    // fetch("http://httpstat.us/500") // error test
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setData(resData);
        // Clear any prior error.
        setError(null);
        setSelectedUser(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        // Loading stops both on success and fail.
        setLoading(false);
      });
  };

  const fetchBtnText = users || error ? "Refresh Data" : "Fetch Data";

  // If this were a larger project, I would use a CSS-in-js library.
  return (
    <div style={{ maxWidth: "85%", margin: "0 auto" }}>
      {loading ? (
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="loading"
          width="40px"
          height="40px"
        />
      ) : (
        <button
          onClick={handleFetchClick}
          style={{
            padding: 5,
            fontSize: 22,
            marginTop: "2em",
            marginBottom: "2em",
          }}
        >
          {fetchBtnText}
        </button>
      )}

      <UserCard user={selectedUser} />
      <UsersTable users={users} setSelectedUser={setSelectedUser} />
      <DisplayError error={error} />
    </div>
  );
}

export default App;
