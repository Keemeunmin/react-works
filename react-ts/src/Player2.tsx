type PlayerProps = {
  player: {
    name: string;
    age: number;
  };
  clickHandler: () => void;
};

const Player2 = ({ player, clickHandler }: PlayerProps) => {
  return (
    <div>
      <h2>Player2</h2>
      <p>이름: {player.name}</p>
      <p>나이: {player.age}</p>
      <button onClick={clickHandler}>클릭</button>
    </div>
  );
};

export default Player2;