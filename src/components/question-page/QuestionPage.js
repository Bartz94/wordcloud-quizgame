import './QuestionPage.css'
import { Words } from './Words'
import Typography from '@mui/material/Typography'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUserContext } from '../../context/UserContextProvider';
import { Box } from '@mui/system';

const ContainerStyled = styled.div`
    border: 1px solid black;
    min-height: 50vh;
    margin: 10px 20px;
    display:flex;
    flex-wrap: wrap;
`;

const WordBox = styled(Box)`
    max-width: 130px;
    min-height: 40px;
    display: inline-block;
    font-size: 15px;
  }
`;

export const QuestionPage = () => {
    //mui media queries
    const isMinWidth1000px = useMediaQuery("(min-width: 1000px)");


    const [data, setData] = useState([]);
    const [randomQuestion, setRandomQuestion] = useState(null);
    const allWords = data.map(data => (data.all_words));
    const questionGoodAnswers = data[randomQuestion]?.good_words;

    const [userGoodAnswers, setUserGoodAnswers] = useState([]);
    const [userBadAnswers, setBadAnswers] = useState([]);
    const [selectedWords, setSelectedWords] = useState([]);

    const { setScore, name } = useUserContext();
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

    //Event Handlers

    const handleCheckButton = () => {
        getCorrectAnswers();
        setCheckingAnswers(true);
        getPoints()
    };

    return (
        <>
            <Typography sx={{ mt: -15 }} variant='h3'>{data[randomQuestion]?.question}</Typography>
            <ContainerStyled maxWidth={isMinWidth1000px ? 'lg' : 'xs'} data='data' >
                <Words />
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
