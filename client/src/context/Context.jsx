import { useState } from "react";
import { createContext } from "react"
import { useSearchParams } from 'react-router-dom'


export const Context = createContext(null);

export const ContextProvider = ({ children }) => {

    // const url = "https://ilas-tuition-backend.onrender.com"
    const [token, setToken] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();

    const url="http://localhost:4000"

    const clearSearchParams = () => {
        setSearchParams({}); // wipes all query params -> url becomes just the path
    }

    const contextValue = {
        url,
        token,
        setToken,
        setSearchParams,
        searchParams,
        clearSearchParams
    }

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    )
}