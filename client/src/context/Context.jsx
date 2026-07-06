import { createContext } from "react"


export const Context = createContext(null);

export const ContextProvider = ({ children }) => {

    const url = "http://localhost:4000"

    const contextValue = {
        url,
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}