import { createContext } from "react";

export const Context = createContext(null);

export const ContextProvider = ({children}) => {

    // const url = "https://ilas-tuition-backend.onrender.com"
    const url = "http://localhost:4000"

    const contectValue = {
        url
    }
     return(
        <Context.Provider value={contectValue}>
            {children}
        </Context.Provider>
     )
}