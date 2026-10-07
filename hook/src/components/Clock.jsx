import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);

    console.log("랜더링...");
  }, []);

  return (
    <div>
      <h2>디지털 시계 만들기</h2>
      <h3>현재 시간 : {time.toLocaleTimeString()}</h3>
    </div>
  );
};

export default Clock;