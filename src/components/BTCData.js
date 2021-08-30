const BTCData = ({ data }) => {
  if (!data === null) {
    return null;
  }

  return <div>{data.bpi.USD.rate}</div>;
};

export default BTCData;
