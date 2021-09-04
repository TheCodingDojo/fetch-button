import { striped } from "./UsersTable.module.css";
import Address from "./Address";

const UsersTable = ({ users, setSelectedUser }) => {
  if (!users) {
    return null;
  }

  return (
    <table className={striped}>
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
          <tr key={id} onClick={(_e) => setSelectedUser(users[i])}>
            <td>{i + 1}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>
              <Address address={address} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
