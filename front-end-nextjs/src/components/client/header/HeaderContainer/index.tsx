import { MainHeader } from "@/components/client/header/MainHeader";
import { TopBar } from "@/components/client/header/TopBar";
import React from "react";

export const HeaderContainer = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {/* Top Bar */}
      <TopBar />
      {/* Main Header */}
      <MainHeader />
    </header>
  );
};
