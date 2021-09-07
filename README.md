# Fetch Button Interview Challenge

Please develop a simple web page that contains a button, that when clicked, makes a call to a REST endpoint to retrieve data. Once the data is retrieved, the page should display the data on the page in a table or div or span, etc.

## Technical requirements

- You can use either javascript or React
- The page just needs to run on a local environment (no need to deploy it to a hosted server)
- The page should not reload to display the data - it should be injected directly on the page after the call returns
- You can use an REST API to get the data. [Here are some random free ones you can call](https://apipheny.io/free-api/).
- You're welcome to write your own REST endpoint, but that is not required.
- Apply some css styling to the button page. We're not looking for a master piece, but rather some rudimentary styling.

## Demo Walk-through

- This encompasses [Pokemon API](https://login.codingdojo.com/m/130/6322/44711) assignment.
- This repo is linked to [interview-challenges project](https://github.com/orgs/TheCodingDojo/projects/1)
- Normally for this course, I avoid shorthand syntax to avoid unnecessary confusion from small syntax variations. However, in this example I want to write code that won't make the potential employer wonder if I only know long-form syntax.

### Goals

- Click to fetch from API and set state to the fetched data to update the page without a page reload.
- Teach how to approach a simple interview challenge like this one.
- Show discrete, descriptive, and frequent commits.
- Start simple and clean, then refactor and polish.

### Initialize Project

- `npx create-react-app fetch-button`
- `git commit -m "init react app"`

### Decide on an API to use

#### Understand the shape / structure of the API data

- Paste [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users) into address bar to see the data.
- Let's start by displaying the name of each user.

### `fetch` the data on click and rename

- Let's use `fetch` instead of installing a package like `axios` since this a simple project and we want to show that we don't need to rely on packages to do everything, even small things.
- However, `fetch` only triggers the `.catch` when there is a _network error_. `axios` triggers the `.catch` whenever the request is not successful in the successful HTTP status numerical range.
  - So we need to make sure to trigger the `.catch` whenever `fetch` receives an unsuccessful status code.
  - How would you have known this difference? Either by running into the problem and noticing it behaves differently and then investigating, or by preparation from reading documentation on how `fetch` works and googling `handle errors with fetch javascript`.

### Basic Conditional Display

```js
import React, { useState } from "react";

function App() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const handleFetchClick = (_e) => {
    // fetch("http://httpstat.us/500") // error test
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resData) => {
        // Clear any previous errors so they aren't still displayed.
        setErrors(null);
        setData(resData);
      })
      .catch((err) => setError(err));
  };

  const fetchBtnText = users ? "Refresh Users" : "Fetch Users";

  // If this were a larger project, I would use a CSS-in-js library.
  return (
    <div style={{ maxWidth: "85%", margin: "0 auto" }}>
      <button
        onClick={handleFetchClick}
        style={{
          padding: 5,
          fontSize: 22,
          marginTop: "2rem",
          marginBottom: "2rem",
        }}
      >
        {fetchBtnText}
      </button>

      {users && users.map((user) => <p key={user.id}>{user.name}</p>)}

      {error && <p style={{ color: "red" }}>{error.message}</p>}
    </div>
  );
}

export default App;
```

- At this point, we have already completed the Pokemon API assignment and the requirements for this challenge except for styling.
- However, it would be good to demonstrate more knowledge of react.

### Continue Componetization

```js
const UsersTable = ({ users }) => {
  if (!users) {
    return null;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, username, email, address }, i) => (
          <tr key={id}>
            <td>{i + 1}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
```

- `git commit -m "display basic users table"`

### Add Some Styling

- Demonstrate we know more than just inline styles.

#### `components/UsersTable.module.css`

```css
.striped {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

.striped th,
td {
  text-align: left;
  padding: 16px;
}

.striped tr:nth-child(even) {
  background-color: #f2f2f2;
}

.striped thead {
  border-bottom: 1px solid lightgray;
}
```

### Apply Styles To `UsersTable.js`

```js
import { striped } from "./UsersTable.module.css";
    <table className={striped}>
```

- `git commit -m "add table styles"`

### Show knowledge of child components by creating `Address.js` component

```js
const Address = ({ address: { suite, street, city, zipcode } }) => (
  <span>
    {suite} {street}, {city} {zipcode}
  </span>
);

export default Address;
```

```js
import Address from "./Address";

<td>
  <Address address={address} />
</td>;
```

- `git commit -m "create Address component`

### Replace button with loading spinner when loading

- Loading starts when the request is being sent and it ends when the response comes back or there is an error.

```js
const [loading, setLoading] = useState(false);

const handleFetchClick = (_e) => {
  setLoading(true);
```

- Add a `.finally` to stop loading whether the `.then` or the `.catch` happens.

```js
  .finally(() => {
    // Loading stops both on success and fail.
    setLoading(false);
  });
```

- Conditionally render a loading gif instead of the button

```js
{
  loading ? (
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
        marginTop: "2rem",
        marginBottom: "2rem",
      }}
    >
      {fetchBtnText}
    </button>
  );
}
```

- We could also create a loading component if it needed to be reused.

- `git commit -m "added loading spinner"`

### Show knowledge of child to parent communication

- `onClick` of a row, display full user info above table as a different style in `App.js` by passing a callback from parent to child to handle the child to parent communication.

```js
const [selectedUser, setSelectedUser] = useState(null);
```

```js
{
  selectedUser && <h2>{selectedUser.name}</h2>;
}

<UsersTable users={users} setSelectedUser={setSelectedUser} />;
```

```js
const UsersTable = ({ users, setSelectedUser }) => {};
```

```js
<tr key={id} onClick={(_e) => setSelectedUser(users[i])}>
```

### Create `UserCard` component to display `selectedUser`

```js
import Address from "./Address";

const UserCard = ({ user }) => {
  if (!user) {
    return null;
  }

  const { name, username, email, address, phone } = user;

  return (
    <div
      style={{
        borderRadius: 5,
        padding: "1px 30px 1px 30px",
        margin: "0 auto 2em auto",
        width: "20%",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        backgroundColor: "aliceblue",
      }}
    >
      <h2>{name}</h2>
      <small>{username}</small>
      <p>{email}</p>
      <Address address={address} />
      <p>{phone}</p>
    </div>
  );
};

export default UserCard;
```

```js
<UserCard user={selectedUser} />
<UsersTable users={users} setSelectedUser={setSelectedUser} />
```

#### Reset `selectedUser` on Refresh Data

- In the `.then` `setSelectedUser(null);`.
- `git commit -m "show user card on click"`
- `git push`

### Styled Components

- Showing knowledge of a CSS in JS library such as [styled components](https://styled-components.com/) would be a nice extra.
- [Another interview challenge](https://github.com/TheCodingDojo/react-shopping-list) required styled components.
