const BTCData = ({ data }) => {
  if (!data) {
    return null;
  }

  const style = {
    borderRadius: 5,
    padding: 15,
    backgroundColor: "lavender",
  };

  const {
    time: { updated },
    disclaimer,
    chartName,
    bpi: { USD, GBP, EUR },
  } = data;

  return (
    <div style={style}>
      <h2>{chartName}</h2>
      <small>{updated}</small>
      <p>{disclaimer}</p>
      <hr />

      <h4>{USD.code}</h4>
      <p>{USD.rate}</p>
      <hr />

      <h4>{GBP.code}</h4>
      <p>{GBP.rate}</p>
      <hr />

      <h4>{EUR.code}</h4>
      <p>{EUR.rate}</p>
    </div>
  );
};

export default BTCData;
