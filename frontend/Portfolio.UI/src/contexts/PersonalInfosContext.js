import { useGetPersonalInfos } from "@/hooks/GET/useGetPersonalInfos";
import { createContext, useEffect, useState } from "react";

export const PersonalInfosContext = createContext({
  personalInfos: {
    name: "",
    surname: "",
    title: "",
    about: "",
  },
  setPersonalInfos: () => {},
  isLoading: true,
});

export function PersonalInfoProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const { data, isLoading } = useGetPersonalInfos(token);
  const [personalInfos, setPersonalInfos] = useState({
    name: "",
    surname: "",
    title: "",
    about: "",
  });

  useEffect(() => {
    if (data?.result) {
      setPersonalInfos(data?.result);
    }
  }, [data]);

  return (
    <PersonalInfosContext.Provider
      value={{ personalInfos, setPersonalInfos, isLoading }}
    >
      {children}
    </PersonalInfosContext.Provider>
  );
}
