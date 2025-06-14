import {
  Pill as MantinePill,
  type PillProps as MantineProps,
} from "@mantine/core";
import classes from "./Pill.module.css";

interface PillProps extends MantineProps {
  selected?: boolean;
  isSelectable?: boolean;
}

export default function Pill({
  selected = false,
  isSelectable = true,
  ...props
}: PillProps) {
  if (!isSelectable) {
    return <MantinePill {...props} className={classes.pill} />;
  }

  return (
    <MantinePill
      {...props}
      className={`${selected ? classes.pill__filled : classes.pill}`}
    />
  );
}
