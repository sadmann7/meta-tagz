import {
  createContext,
  ReactNode,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type AppContextType = {
  metaTags: string;
  setMetaTags: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<AppContextType>({
  metaTags: "",
  setMetaTags: () => {},
});
const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [metaTags, setMetaTags] = useState("");

  return (
    <AppContext.Provider
      value={{
        metaTags,
        setMetaTags,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
