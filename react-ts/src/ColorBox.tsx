import type { ReactNode } from "react";

type ColorBoxProps = {
  color: string;
  children: ReactNode;
};

const ColorBox = ({ color, children }: ColorBoxProps) => {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        padding: "20px",
        margin: "10px",
      }}
    >
      {children}
    </div>
  );
};

export default ColorBox;