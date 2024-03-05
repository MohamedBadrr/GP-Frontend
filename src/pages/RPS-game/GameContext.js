import { createContext, useContext, useState } from "react";

const GameContext = createContext(undefined);

export const GameProvider = ({ children }) => {
    const [championshipsRemaining, setChampionshipsRemaining] = useState({
        1: { cost: 50, remaining: 5 },
        2: { cost: 200, remaining: 5 },
        3: { cost: 400, remaining: 5 }
      });
    
      const [coins, setCoins] = useState(500);
      const [qTable, setQTable] = useState({});

  return (
    <GameContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme(theme === "light" ? "dark" : "light"),
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);