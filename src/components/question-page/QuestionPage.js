import './QuestionPage.css'
import Typography from '@mui/material/Typography'
import styled from 'styled-components';
import { Container } from '@mui/material';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContextProvider';

const ContainerStyled = styled(Container)`
    border: 1px solid black;
    min-height: 50vh;
    margin: 15px auto;
    display:flex;
`;

const WordBox = styled(Box)`
    max-width: 100px;
    min-height: 60px;
    display: inline-block;
    font-size: 15px;
    margin: 20px;
  }
`;

const WordButton = styled.button`
   border: none;
   background-color: transparent;
   font-size: 2em;
   cursor: pointer;
   margin: 5px;
   &:hover {
    background-color: #e2e2e2;
  }
`;

export const QuestionPage = () => {

    const [data, setData] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const [randomMarginT, setRandomMarginT] = useState('100px');
    const [randomMarginL, setRandomMarginL] = useState('10px');
    const isActive = useMediaQuery("(min-width: 1000px)");
    const [isSelected, selectisSelected] = useState(false);
    const { setScore, setName } = useUserContext();


    const setWordBoxStyle = {
        fontSize: isActive ? '15px' : '10px',
    };

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
            })
            .catch((error) => {
                console.error(`Error at setting data to the state ${error}`);
            });
    }

    useEffect(() => {
        if (!checkingAnswers) {
            console.log('fetch data')
            fetchdata();
            setRandomQuestion(Math.floor(Math.random() * 3));
        }
    }, []);



    const allWords = data.map(data => (data.all_words));
    const [selectedWords, setSelectedWords] = useState([]);
    const questionGoodAnswers = data[randomQuestion]?.good_words;

    const handleWordPress = (e) => {
        setSelectedWords([...selectedWords, e.target.innerText]);
        e.target.disabled = true;
    };

    const [userGoodAnswers, setUserGoodAnswers] = useState([]);
    const [userBadAnswers, setBadAnswers] = useState([]);
    const [checkingAnswers, setCheckingAnswers] = useState(false);

    const getCorrectAnswers = () => {
        const goodAnswers = questionGoodAnswers.filter(element => selectedWords.includes(element));
        const badAnswers = selectedWords.filter(element => !goodAnswers.includes(element));
        setUserGoodAnswers(goodAnswers)
        setBadAnswers(badAnswers)
    }

    const handleCheckButton = () => {
        getCorrectAnswers();
        setCheckingAnswers(true);
        getPoints()
    }

    const getClassName = (word) => {
        if (checkingAnswers) {
            if (userGoodAnswers.includes(word)) {
                return 'good';
            }
            if (userBadAnswers.includes(word)) {
                return 'bad';
            }
        }
    };

    const getPoints = () => {
        const goodAnswers = questionGoodAnswers.filter(element => selectedWords.includes(element));
        const badAnswers = selectedWords.filter(element => !goodAnswers.includes(element));
        const unselectedGoodWords = questionGoodAnswers.filter(element => !selectedWords.includes(element));
        const result = ((goodAnswers.length + goodAnswers.length) - (badAnswers.length + unselectedGoodWords.length)) -
            setName('')
        setScore(result)
    };

    return (
        <>
            <Typography sx={{ mt: -15 }} variant='h3'>{data[randomQuestion]?.question}</Typography>
            <ContainerStyled maxWidth={isActive ? 'lg' : 'xs'}  >
                {allWords[randomQuestion]?.map(word => {
                    return (
                        <WordBox
                            key={word}>
                            <WordButton
                                className={getClassName(word)}
                                onClick={handleWordPress}
                                key={word}
                            >
                                {word}
                            </WordButton>
                        </WordBox>
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
