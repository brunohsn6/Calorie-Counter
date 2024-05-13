"use client";

import Home from "@/app/home";
import { GlobalProvider } from "@/hooks/GlobalState";

export default function Page() {
  return (
    <GlobalProvider>
      <Home />
    </GlobalProvider>
  );
}
