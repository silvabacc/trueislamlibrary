import {
  Pill as MantinePill,
  type PillProps as MantineProops,
} from "@mantine/core";
import classes from "./Pill.module.css";
import { useState } from "react";

interface PillProps extends MantineProops {
  selectable?: boolean;
}
export default function Pill({ selectable = false, ...props }: PillProps) {
  const [selected, setSelected] = useState(false);

  const toggle = () => {
    setSelected((prev) => !prev);
  };

  return (
    <MantinePill
      onClick={toggle}
      {...props}
      className={`${selected && selectable ? classes.pill__filled : classes.pill} ${!selectable ? classes.no__hover : ""}`}
    ></MantinePill>
  );
}
