import { createContext, useReducer, useContext } from "react";

export const MainContext = createContext();

export const MainProvider = (props) => {
  return (
    <MainContext.Provider value={useReducer(props.reducer, props.initialState)}>
      {props.children}
    </MainContext.Provider>
  );
};

export const useContextValue = () => useContext(MainContext);
