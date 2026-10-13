import { createContext, useContext } from "react";

/* =========================================================
   NEWSROOM CONTEXT
   Shared by every dashboard page: a way to show success /
   error notifications.
========================================================= */

export type ToastTone = "success" | "error";

export interface NewsroomContextValue {
  notify: (message: string, tone?: ToastTone) => void;
}

export const NewsroomContext =
  createContext<NewsroomContextValue | null>(null);

export const useNewsroom = (): NewsroomContextValue => {
  const value = useContext(NewsroomContext);

  if (!value) {
    throw new Error("useNewsroom must be used inside the newsroom layout.");
  }

  return value;
};
