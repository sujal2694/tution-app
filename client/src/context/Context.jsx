import { createContext } from "react"


export const Context = createContext(null);

export const ContextProvider = ({ children }) => {

    const url = "https://tution-app-backend-two.vercel.app/"

    const contextValue = {
        url,
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}