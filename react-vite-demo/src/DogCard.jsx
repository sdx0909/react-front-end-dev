import { Image } from "./Image";

// functional component
function DogCard(props) {
  return (
    <div>
      <h3>{props.name}</h3>
      <Image src={props.src} />
    </div>
  );
}

// default-exporting the DogCard Component
export default DogCard;
