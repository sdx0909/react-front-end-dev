function Operators(props) {
  let element;
  const status = props.status;
  if (status) {
    element = (
      <div>
        <h2>Short-Circuit-Operator</h2>
        {props.user && <h4>Welcome {props.user.name}</h4>}
        {!props.user && <h4>Please Login !!!</h4>}
      </div>
    );
  } else {
    element = (
      <div>
        <h2>Ternery-Operator</h2>
        {props.user ? (
          <h4>Welcome {props.user.name}</h4>
        ) : (
          <h4>Please Login !!!</h4>
        )}
      </div>
    );
  }
  return element;
}
export default Operators;
