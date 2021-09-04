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
