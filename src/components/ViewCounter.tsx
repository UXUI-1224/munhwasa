"use client";
import { useState, useEffect } from "react";

export function ViewCounter({ storageKey, initialViews }: { storageKey: string; initialViews: number }) {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(storageKey) ?? "0", 10);
    const next = stored + 1;
    localStorage.setItem(storageKey, String(next));
    setViews(initialViews + next);
  }, [storageKey, initialViews]);

  return <>조회수 {views}</>;
}
