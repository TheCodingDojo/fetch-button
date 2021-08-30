const BTCData = ({ data }) => {
  if (!data) {
    return null;
  }

  const {
    time: { updated },
    disclaimer,
    chartName,
    bpi: { USD, GBP, EUR },
  } = data;

  // If this were a larger project, CSS-in-js libraries would be used.
  const style = {
    borderRadius: 5,
    padding: 15,
    backgroundColor: "lavender",
  };

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
