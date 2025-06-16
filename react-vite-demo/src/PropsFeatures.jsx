import UserDetails from "./UserDetails";
import UserInfo from "./UserInfo";

function PropsFeatures(props) {
  return (
    <div>
      <h3>Parent and Child props</h3>
      <UserDetails name={props.name} age={props.age} /> <hr />
      <h3>Destructuring the props</h3>
      <UserInfo name={props.name} age={props.age} /> <hr />
    </div>
  );
}
PropsFeatures.defaultProps = {
  name: "Saurabh",
  age: 23,
};
export default PropsFeatures;
