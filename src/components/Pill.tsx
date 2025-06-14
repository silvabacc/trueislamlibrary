import {
  Pill as MantinePill,
  type PillProps as MantineProps,
} from "@mantine/core";
import classes from "./Pill.module.css";

interface PillProps extends MantineProps {
  selected?: boolean;
}

export default function Pill({ selected = false, ...props }: PillProps) {
  return (
    <MantinePill
      {...props}
      className={`${selected ? classes.pill__filled : classes.pill}`}
    />
  );
}
