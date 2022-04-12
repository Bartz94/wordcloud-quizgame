import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContextProvider';

export const Scoreboard = () => {
    const { name, score } = useUserContext();

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant='h3'>Congratulation, {name}!</Typography>
            <Typography variant='h3'>Your score:</Typography>
            <Typography variant='h3'>{score}</Typography>

            <Button sx={{
                textTransform: 'lowercase',
                padding: '8px 60px',
                fontSize: '30px',
                fontWeight: '400',
            }}
                variant="outlined"
                component={NavLink} to="/">
                Restart
            </Button>
        </div>
    );
};
