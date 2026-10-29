import Greet from "./Greet";
import Player from "./Player";
import Player2 from "./Player2";
import Counter from "./Counter";
import InputValueState from "./InputValueState";
import DrinkList from "./DrinkList";
import NumberList from "./NumberList";
import Todos from "./Todos";
import "./App.css";
import Clock from "./Clock";
import Box from "./Box";
import Card from "./Card";
import ColorBox from "./ColorBox";

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

      <hr />

      <Counter />

      <hr />

      <InputValueState />

      <hr />

      <DrinkList />

      <hr />

      <NumberList />

      <hr />

      <Todos />

      <hr />
      
      <Clock />
      <hr />

<h2>props children</h2>

<Box>
  <h3>박스 안의 내용</h3>
  <p>이것은 Box 컴포넌트 안에 있는 내용입니다.</p>
</Box>

<Box>
  <h3>또 다른 박스</h3>
  <p>이것은 또 다른 Box 컴포넌트 안에 있는 내용입니다.</p>
</Box>

<hr />

<Card title="공지사항">
  <p>내일은 TypeScript 시험이 있습니다.</p>
</Card>

<Card title="오늘의 할 일">
  <ul>
    <li>Props 타입 복습</li>
    <li>children 예제 실습</li>
  </ul>
  <button>확인</button>
</Card>

<hr />

<ColorBox color="red">
  <h3>빨간색 테두리</h3>
  <p>ColorBox 실습입니다.</p>
</ColorBox>

<ColorBox color="blue">
  <h3>파란색 테두리</h3>
  <p>다른 색상도 전달할 수 있습니다.</p>
</ColorBox>
    </div>
  
  );
}

export default App;