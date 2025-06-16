// destructruring the props
function UserInfo({ name, age }) {
  return (
    <div>
      <h3>User Info:</h3>
      <h5>Name : {name}</h5>
      <h5>Age : {age}</h5>
    </div>
  );
}
export default UserInfo;
