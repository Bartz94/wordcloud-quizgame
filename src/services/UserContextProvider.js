import { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [score, setScore] = useState(null);


    return <UserContext.Provider value={
        {
            name,
            score,
        }
    }>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);