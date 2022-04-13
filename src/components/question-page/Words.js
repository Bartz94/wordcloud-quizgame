import './QuestionPage.css'
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContextProvider'
import { useNavigate } from 'react-router-dom';

const WordBox = styled(Box)`
    max-width: 130px;
    min-height: 40px;
    display: inline-block;
    font-size: 15px;
  }
`;

export const Words = ({ data }) => {
    const [randomQuestion, setRandomQuestion] = useState(null);
    const allWords = data.map(data => (data.all_words));
    console.log(data)
    const [userGoodAnswers, setUserGoodAnswers] = useState([]);
    const [userBadAnswers, setBadAnswers] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);

    const { setScore, name } = useUserContext();
    let navigate = useNavigate();

    const [checkingAnswers, setCheckingAnswers] = useState(false);



    const getClassName = (word) => {
        if (checkingAnswers) {
            if (userGoodAnswers.includes(word)) {
                return 'word-button good';
            }
            else if (userBadAnswers.includes(word)) {
                return 'word-button bad';
            }
            else {
                return 'word-button';
            }
        }
        else {
            if (selectedWords.includes(word)) {
                return 'word-button selected-word'
            }
            else {
                return 'word-button'
            }
        }
    };

    const handleWordClick = (word) => {
        setSelectedWords(items => items.includes(word) ? items.filter(n => n !== word) : [word, ...items])
    };

    return (
        <>
            {allWords[randomQuestion]?.map(word => {
                let randomMarginL = word.length + Math.floor(Math.random() + 5);
                let randomMarginT = word.length + Math.floor(Math.random() - 1);
                return (
                    <WordBox
                        sx={{
                            marginLeft: randomMarginL,
                            marginTop: randomMarginT,
                        }}
                        key={word}>
                        <button
                            className={getClassName(word)}
                            onClick={() => handleWordClick(word)}
                            key={word}>
                            {word}
                        </button>
                    </WordBox>
                )
            })}</>
    )
}
