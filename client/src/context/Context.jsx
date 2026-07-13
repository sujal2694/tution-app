import { createContext } from "react"


export const Context = createContext(null);

export const ContextProvider = ({ children }) => {

    const url = "https://ilas-tuition-backend.onrender.com"

    const contextValue = {
        url,
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}