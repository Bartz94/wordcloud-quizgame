import Typography from '@mui/material/Typography'
import styled from 'styled-components';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './QuestionPage.css'

const ContainerStyled = styled(Container)`
    border: 1px solid black;
    height: 50vh;
    margin: 15px auto;
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
        if (!isWordsCheck) {
            console.log('fetch data')
            fetchdata();
            setRandomQuestion(Math.floor(Math.random() * 3))
        }
    }, []);


    // const randomQuestion = Math.floor(Math.random() * 3);

    const allWorlds = data.map(data => (data.all_words));
    // console.log(`to jest allWords ${data}`)
    console.log(`data`, data)

    const [isChecked, setIsChecked] = useState(false);

    const [choosenWords, setChoosenWords] = useState([]);

    const goodWords = data[randomQuestion]?.good_words;

    const handleWordCheck = (e) => {
        setChoosenWords([...choosenWords, e.target.innerText]);
        e.target.disabled = true;
        // isUserAnwerCorrect()
    };

    // const isUserAnwerCorrect = () => {
    //     const goodAnswers = goodWords.filter(element => choosenWords.includes(element));
    //     const badAnswers = choosenWords.filter(element => !goodAnswers.includes(element));
    //     if (goodAnswers.includes(choosenWords)) {
    //         setIsChecked(true)
    //     }
    //     else if (badAnswers.includes(choosenWords)) {
    //         setIsChecked(false)
    //     }
    // }

    const [userGoodAnswers, setUserGoodAnswers] = useState([]);
    const [userBadAnswers, setBadAnswers] = useState([]);
    const [itemClassName, setItemClassName] = useState('')
    const [isWordsCheck, setIsWordsCheck] = useState(false);

    const getCorrectAnswers = () => {
        const goodAnswers = goodWords.filter(element => choosenWords.includes(element));
        const badAnswers = choosenWords.filter(element => !goodAnswers.includes(element));
        setUserGoodAnswers(goodAnswers)
        setBadAnswers(badAnswers)
    }

    console.log(`Dobre odpowiedzi: ${userGoodAnswers}`)
    console.log(`Złe odpowiedzi: ${userBadAnswers}`)


    const handleCheckButton = () => {
        getCorrectAnswers()
        // getBadAnswers()
        console.log(itemClassName)
        setIsWordsCheck(true)
    }

    const getClassName = (word) => {
        if (isWordsCheck) {
            if (userGoodAnswers.includes(word)) {
                return 'good';
            }
            if (userBadAnswers.includes(word)) {
                return 'bad';
            }
        }
    };

    return (
        <>
            <Typography sx={{ mt: -15 }} variant='h3'>{data[randomQuestion]?.question}</Typography>
            <ContainerStyled >
                {allWorlds[randomQuestion]?.map(word => {
                    return (
                        <WordButton
                            value={isChecked}
                            className={getClassName(word)}
                            onClick={handleWordCheck}
                            key={word}
                        >
                            {word}
                        </WordButton>
                    )
                })}
            </ContainerStyled>
            {isWordsCheck ?
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
                </Button>}
        </>
    );
};
