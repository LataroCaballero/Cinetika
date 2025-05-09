import { createContext, useContext, useState } from "react";
import type { AppContextType } from "./Types";


export const AppContext = createContext<AppContextType | undefined>( undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [nombrepagina, setPagina] = useState<string>("Login");
    return (
        <AppContext.Provider value={{ nombrepagina, setPagina }}>
          {children}
        </AppContext.Provider>
      );
}

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useApp debe estar dentro de  AppProvider');
    }
    return context;
  };