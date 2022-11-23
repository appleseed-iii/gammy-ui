import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useInterval } from "src/hooks/useInterval";

export const Timer = ({ startSeconds }: { startSeconds: number }) => {
  const [seconds, setSeconds] = useState(startSeconds);
  useInterval(() => {
    setSeconds(seconds - 1);
  }, 1000);

  return <Typography>{seconds}</Typography>;
};
