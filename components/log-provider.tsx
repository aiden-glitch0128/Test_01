"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { mockEntries } from "@/lib/mock-data";
import type { LogEntry } from "@/lib/types";

const LogContext = createContext<{ entries: LogEntry[]; addEntry: (entry: LogEntry) => void }>({ entries: mockEntries, addEntry: () => undefined });
export function LogProvider({ children }: { children: React.ReactNode }) {
  const [entries, setEntries] = useState(mockEntries);
  useEffect(() => { const saved = localStorage.getItem("jeju-month-log"); if (saved) setEntries(JSON.parse(saved)); }, []);
  const addEntry = (entry: LogEntry) => setEntries((current) => { const next = [entry, ...current]; localStorage.setItem("jeju-month-log", JSON.stringify(next)); return next; });
  return <LogContext.Provider value={{ entries, addEntry }}>{children}</LogContext.Provider>;
}
export const useLogs = () => useContext(LogContext);
