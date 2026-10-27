import Greet from "./Greet";
import Player from "./Player";
import Player2 from "./Player2";

function App() {
  const playerObj = {
    name: "신유빈",
    age: 22,
  };

  const clickHandler = () => {
    alert("버튼이 클릭되었습니다."); 
  };

  return (
    <div>
      <h1>TypeScript 기반 React 프로젝트</h1>

      <Greet name="김은민" age={25} />

      <hr />

      <Player
        player={playerObj}
        clickHandler={clickHandler}
      />

      <hr />

      <Player2
        player={playerObj}
        clickHandler={clickHandler}
      />
    </div>
  );
}

export default App;