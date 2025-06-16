// import ConditionalRendering from "./ConditionalRendering";
import DogCard from "./DogCard";
import InlineStyle from "./InlineStyle";
import Operators from "./Operators";
import PropsFeatures from "./PropsFeatures";
function App(props) {
  // const name1 = "Bruno";
  // const name2 = "Hari";
  // const user1 = {
  //   id: 1,
  //   name: "Saurabh Dixit",
  //   age: 21,
  // };
  // const user2 = null;
  return (
    <>
      {props.name}
      {/* <PropsFeatures name="Saurabh" age="20" /> */}
      {/* <Operators status={true} user={user2} /> */}
      {/* true for short-circuit-operator */}
      {/* <Operators status={false} user={user1} /> */}
      {/* false for ternery-operator */}
      {/* <InlineStyle /> */}
      {/* <DogCard
        name={name2}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqP17tUUr7MDIvAmTdwbtBqFiusMAmYKqvA&s"
      />
      <DogCard
        name={name1}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDFp3dmPTGj1xOEuSlAt-ilTfBOmYfth5hQ&s"
      />
      <DogCard
        name={name2}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxqP17tUUr7MDIvAmTdwbtBqFiusMAmYKqvA&s"
      />
      <DogCard
        name={name1}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgDFp3dmPTGj1xOEuSlAt-ilTfBOmYfth5hQ&s"
      /> */}
    </>
  );
}
App.defaultProps = {
  name: "Guest",
};
export default App;
