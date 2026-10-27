const Greet = ({ name, age }: { name: string; age: number }) => {
  return (
    <div>
      <h2>Greet 컴포넌트</h2>
      <p>이름: {name}</p>
      <p>나이: {age}</p>
    </div>
  );
};

export default Greet;