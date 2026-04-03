import React from "react";
import { useTheme as useNextTheme } from "next-themes";
import { Switch } from "@nextui-org/react";

export const DarkModeSwitch = () => {
  const { setTheme, resolvedTheme } = useNextTheme();

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">DarkMode</span>

      <Switch
        isSelected={resolvedTheme === "dark"}
        onValueChange={(e) => setTheme(e ? "dark" : "light")}
      />
    </div>
  );
};
