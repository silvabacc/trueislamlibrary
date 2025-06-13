import { Pill as MantinePill, type PillProps } from "@mantine/core";
import classes from "./Pill.module.css";
import { useState } from "react";

export default function Pill({ ...props }: PillProps) {
  const [selected, setSelected] = useState(false);

  const toggle = () => {
    setSelected((prev) => !prev);
  };

  return (
    <MantinePill
      onClick={toggle}
      {...props}
      className={selected ? classes.pill__filled : classes.pill}
    ></MantinePill>
  );
}
