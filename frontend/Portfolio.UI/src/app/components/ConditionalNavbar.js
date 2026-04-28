"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const path = usePathname();

  if (path === "/error") {
    return null;
  }

  return <Navbar />;
}
