import { createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = ({children}) => {

    const url = "https://tution-app-backend-two.vercel.app/"

    const contectValue = {
        url
    }
     return(
        <Context.Provider value={contectValue}>
            {children}
        </Context.Provider>
     )
}