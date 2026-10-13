import { useEffect, useState } from "react";

/* =========================================================
   ASYNC DATA
   ---------------------------------------------------------
   Loads data whenever `key` changes. The key must encode
   every input the loader depends on. While a new key loads,
   the previous data stays available (marked as stale) so
   lists don't flash empty. Results that arrive for an
   outdated key are ignored.
========================================================= */

interface Settled<T> {
  key: string;
  data?: T;
  error?: unknown;
}

export interface AsyncData<T> {
  data: T | undefined;
  error: unknown;
  loading: boolean;
}

const useAsyncData = <T>(
  key: string | null,
  load: () => Promise<T>
): AsyncData<T> => {
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    if (key === null) return;

    let active = true;

    load().then(
      (data) => {
        if (active) setSettled({ key, data });
      },
      (error: unknown) => {
        if (active) setSettled((previous) => ({ key, data: previous?.data, error }));
      }
    );

    return () => {
      active = false;
    };
    // `key` represents every input of `load` by contract.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const current = settled?.key === key;

  return {
    data: settled?.data,
    error: current ? settled?.error : undefined,
    loading: key !== null && !current,
  };
};

export default useAsyncData;
