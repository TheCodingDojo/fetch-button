/**
 * @param {Object} props
 * @param {Error} props.error
 */
const DisplayError = (props) => {
  if (!props.error) {
    return null;
  }

  return <p style={{ color: "red" }}>{props.error.message}</p>;
};

export default DisplayError;
