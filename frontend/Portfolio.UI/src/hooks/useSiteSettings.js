import { SiteSettingsContext } from "@/contexts/SiteSettingsContext";
import { useContext } from "react";

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSiteSettings must be used within a SiteSettingsProvider",
    );
  }
  return context;
};
