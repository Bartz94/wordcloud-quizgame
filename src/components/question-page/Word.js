import './Word.css'
import styled from 'styled-components';
import Box from '@mui/material/Box';

const WordBox = styled(Box)`
    max-width: 110px;
    min-height: 40px;
    display: inline-block;
    font-size: 15px;
  }
`;

export const Word = ({ randomMarginL, randomMarginT, word, getClassName, handleWordClick }) => {

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
}
