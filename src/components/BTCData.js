const BTCData = ({ data, style }) => {
  if (!data) {
    return null;
  }

  const {
    time: { updated },
    disclaimer,
    chartName,
    bpi: { USD, GBP, EUR },
  } = data;

  const baseStyle = {
    borderRadius: 5,
    padding: 15,
    backgroundColor: "lavender",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  };

  return (
    // Merge incoming additional / override styles.
    <div style={{ ...baseStyle, ...style }}>
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
