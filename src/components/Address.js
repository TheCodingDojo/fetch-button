const Address = ({ address: { suite, street, city, zipcode } }) => (
  <span>
    {suite} {street}, {city} {zipcode}
  </span>
);

export default Address;
