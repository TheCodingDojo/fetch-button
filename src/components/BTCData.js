const BTCData = ({ data }) => {
  if (!data) {
    return null;
  }

  return <div>{data.bpi.USD.rate}</div>;
};

export default BTCData;
