import { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [score, setScore] = useState(null);


    return <UserContext.Provider value={
        {
            name,
            setName,
            score,
            setScore,
        }
    }>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);