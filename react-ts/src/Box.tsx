import type { ReactNode, CSSProperties } from "react";

const Box = ({ children }: { children: ReactNode }) => {
  const boxStyle: CSSProperties = {
    width: "200px",
    border: "1px solid black",
    padding: "20px",
    margin: "10px",
  };

  return <div style={boxStyle}>{children}</div>;
};

export default Box;