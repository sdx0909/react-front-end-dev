// parent and child props (traditional)
function UserDetails(props) {
  return (
    <div>
      <h3>User Details:</h3>
      <h5>Name : {props.name}</h5>
      <h5>Age : {props.age}</h5>
    </div>
  );
}
export default UserDetails;
