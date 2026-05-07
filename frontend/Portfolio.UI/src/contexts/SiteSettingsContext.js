"use client";
import { createContext, useState, useEffect } from "react";
import { useGetSiteSettings } from "@/hooks/GET/useGetSiteSettings";

export const SiteSettingsContext = createContext();

export function SiteSettingsProvider({ children }) {
  const { data } = useGetSiteSettings();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    if (data?.result) {
      setSettings(data.result.data || data.result);
    }
  }, [data]);

  return (
    <SiteSettingsContext.Provider value={settings}>
      {children}
    </SiteSettingsContext.Provider>
  );
}
