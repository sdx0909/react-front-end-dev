import Icon from "../Icon/Icon";
import "./Card.css";

function Card({ player, onPlay, index, gameEnd }) {
  let icon = <Icon />;
  if (player == "X") {
    icon = <Icon name="cross" />;
  }
  if (player == "O") {
    icon = <Icon name="circle" />;
  }
  return (
    <div
      className="card"
      // if game is not end and player turn is empty then card-click affects otherwise not.
      onClick={() => !gameEnd && player == "" && onPlay(index)}
    >
      {icon}
    </div>
  );
}

export default Card;
