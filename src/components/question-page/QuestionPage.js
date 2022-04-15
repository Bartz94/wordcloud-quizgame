import { Word } from './Word'
import { CircularProgress, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContextProvider';

const ContainerStyled = styled.div`
    border: 1px solid black;
    min-height: 50vh;
    margin: 10px 20px;
    display:flex;
    flex-wrap: wrap;
`;

export const QuestionPage = () => {
    //mui media queries
    const isMinWidth1000px = useMediaQuery("(min-width: 1000px)");

    const { setScore, name, userGoodAnswers, setUserGoodAnswers,
        userBadAnswers, setBadAnswers, selectedWords, setSelectedWords } = useUserContext();

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [randomQuestion, setRandomQuestion] = useState(null);
    const allWords = data.map(data => (data.all_words));
    const questionGoodAnswers = data[randomQuestion]?.good_words;

    let navigate = useNavigate();

    const [checkingAnswers, setCheckingAnswers] = useState(false);

    const fetchdata = () => {
        fetch('question.json')
            .then(function (res) {
                return res.json();
            })
            .catch((error) => {
                console.error(`Error at fetch ${error}`);
            })
            .then(function (data) {
                setData(data)
                setIsLoading(false)
            })
            .catch((error) => {
                console.error(`Error at setting data to the state ${error}`);
            });
    };

    useEffect(() => {
        if (!checkingAnswers) {
            fetchdata();
            setRandomQuestion(Math.floor(Math.random() * 3));
        }
    }, []);

    useEffect(() => {
        if (!name) {
            navigate('/')
        }
    }, []);

    const getCorrectAnswers = () => {
        const goodAnswers = questionGoodAnswers.filter(element => selectedWords.includes(element));
        const badAnswers = selectedWords.filter(element => !goodAnswers.includes(element));
        setUserGoodAnswers(goodAnswers)
        setBadAnswers(badAnswers)
    }

    const getPoints = () => {
        const goodAnswers = questionGoodAnswers.filter(element => selectedWords.includes(element));
        const badAnswers = selectedWords.filter(element => !goodAnswers.includes(element));
        const unselectedGoodWords = questionGoodAnswers.filter(element => !selectedWords.includes(element));
        const result = ((goodAnswers.length + goodAnswers.length) - (badAnswers.length + unselectedGoodWords.length))
        setScore(result)
    };

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

    //Event Handlers
    const handleWordClick = (word) => {
        setSelectedWords(items => items.includes(word) ? items.filter(n => n !== word) : [word, ...items])
    }

    const handleCheckButton = () => {
        getCorrectAnswers();
        setCheckingAnswers(true);
        getPoints()
    };

    return (
        isLoading ?
            <CircularProgress></CircularProgress>
            :
            <>
                <Typography sx={{ mt: -15 }} variant='h3'>{data[randomQuestion]?.question}</Typography>
                <ContainerStyled maxWidth={isMinWidth1000px ? 'lg' : 'xs'}>
                    {allWords[randomQuestion]?.map(word => {
                        let randomMarginL = word.length + Math.floor(Math.random() + 3);
                        let randomMarginT = word.length + Math.floor(Math.random() - 1);
                        return (
                            <Word randomMarginL={randomMarginL} randomMarginT={randomMarginT} word={word}
                                getClassName={getClassName} handleWordClick={handleWordClick} key={word} />
                        )
                    })}
                </ContainerStyled>
                {
                    checkingAnswers ?
                        <Button sx={{
                            textTransform: 'lowercase',
                            padding: '8px 60px',
                            fontSize: '25px',
                            fontWeight: '400',
                        }}
                            variant="outlined"
                            component={NavLink} to="/scoreboard-page"
                        >
                            finish
                        </Button>
                        :
                        <Button sx={{
                            textTransform: 'lowercase',
                            padding: '8px 60px',
                            fontSize: '25px',
                            fontWeight: '400',
                        }}
                            onClick={handleCheckButton}
                            variant="outlined"
                        >
                            check answers
                        </Button>
                }
            </>
    );
};
