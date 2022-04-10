import Typography from '@mui/material/Typography'
import styled from 'styled-components';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './css.css'


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
        fetchdata();
    }, [setData]);


    const randomQuestion = Math.floor(Math.random() * 3);

    const allWorlds = data.map(data => (data.all_words));

    const [isChecked, setIsChecked] = useState(false);

    let choosenWords = [];//zrobic stan z tego :)

    const goodWords = data[randomQuestion]?.good_words;

    const handleWordCheck = (e) => {
        choosenWords.push(e.target.innerText);
        e.target.disabled = true;
        console.log(choosenWords.map(word => word))
    };

    const [goodAnswers, setGoodAnswers] = useState([]);
    const [badAnswers, setBadAnswers] = useState([]);

    const getCorrectAnswers = () => {
        const userGoodAnswers = goodWords.filter(element => choosenWords.includes(element));
        setGoodAnswers(userGoodAnswers)
    }
    const getBadAnswers = () => {
        const userGoodAnswers = goodWords.filter(element => choosenWords.includes(element));
        const userBadAnswers = choosenWords.filter(element => !userGoodAnswers.includes(element));
        setBadAnswers(userBadAnswers)
    }
    console.log(goodAnswers)
    console.log(badAnswers)


    const handleCheckButton = () => {
        getCorrectAnswers()
        getBadAnswers()
    }

    return (
        <>
            <Typography sx={{ mt: -15 }} variant='h3'>{data[randomQuestion]?.question}</Typography>
            <ContainerStyled >
                {allWorlds[randomQuestion]?.map(word => {
                    return (
                        <WordButton
                            value={isChecked}
                            className={word}
                            onClick={handleWordCheck} key={word}>{word}</WordButton>
                    )
                })}
            </ContainerStyled>
            <Button sx={{
                textTransform: 'lowercase',
                padding: '8px 60px',
                fontSize: '25px',
                fontWeight: '400',
            }}
                onClick={handleCheckButton}
                variant="outlined"
            // component={NavLink} to="/scoreboard-page"
            >
                check answers
            </Button>
        </>
    );
};
