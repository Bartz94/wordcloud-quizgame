import Typography from '@mui/material/Typography'
import styled from 'styled-components';
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';


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
`;

const data = [
    {
        question: "select animals",
        "all_words": [
            "hole",
            "sofa",
            "pear",
            "tiger",
            "oatmeal",
            "square",
            "nut",
            "cub",
            "shirt",
            "tub",
            "passenger",
            "cow"
        ],
        good_words: [
            "tiger",
            "cow",
        ]
    },
    {
        question: "select colors",
        all_words: [
            "jeans",
            "existence",
            "ink",
            "red",
            "blue",
            "yellow",
            "laugh",
            "behavior",
            "expansion",
            "white",
            "black",
            "cakes"
        ],
        "good_words": [
            "red",
            "blue",
            "yellow",
            "white",
            "black"
        ]
    },
    {
        question: "select vehicles",
        all_words: [
            "belief",
            "wire",
            "car",
            "bus",
            "star",
            "river",
            "hat",
            "skirt",
            "train",
        ],
        good_words: [
            "car",
            "bus",
            "train"
        ]
    }
]
export const QuestionPage = () => {
    // console.log(data[0].question);

    const randomQuestion = Math.floor(Math.random() * 3);
    const allWorlds = data.map(data => (data.all_words));

    return (
        <>
            <Typography sx={{ mt: -15 }} variant='h3'>{data[randomQuestion].question}</Typography>
            <ContainerStyled >
                {allWorlds[randomQuestion].map(word => {
                    return (
                        <WordButton key={word}>{word}</WordButton>
                    )
                })}
            </ContainerStyled>
            <Button sx={{
                textTransform: 'lowercase',
                padding: '8px 60px',
                fontSize: '25px',
                fontWeight: '400',
            }}
                variant="outlined"
                component={NavLink} to="/scoreboard-page">
                check answers
            </Button>
        </>
    );
};
