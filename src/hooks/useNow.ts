import { useCallback, useEffect, useState } from "react";

/* Current time, refreshed periodically, so "scheduled vs
   live" labels stay correct while a page is left open.
   Call `refresh` after the server stamps a new timestamp. */
const useNow = (intervalMs = 30000) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs]);

  const refresh = useCallback(() => setNow(Date.now()), []);

  return { now, refresh };
};

export default useNow;
