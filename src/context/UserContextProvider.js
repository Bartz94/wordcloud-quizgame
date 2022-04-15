import { createContext, useState, useContext } from 'react';

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    const [name, setName] = useState(null);
    const [score, setScore] = useState(null);
    const [userGoodAnswers, setUserGoodAnswers] = useState([]);
    const [userBadAnswers, setBadAnswers] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);


    return <UserContext.Provider value={
        {
            name,
            setName,
            score,
            setScore,
            userGoodAnswers,
            setUserGoodAnswers,
            userBadAnswers,
            setBadAnswers,
            selectedWords,
            setSelectedWords,
        }
    }>
        {children}
    </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);