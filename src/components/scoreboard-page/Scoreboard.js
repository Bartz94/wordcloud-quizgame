import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContextProvider';
import { useEffect } from 'react';



export const Scoreboard = () => {
    const { name, setName, score } = useUserContext();
    let navigate = useNavigate();

    useEffect(() => {
        if (!name) {
            setName('')
            navigate('/')
        }
    }, []);

    return (
        <div style={{ textAlign: 'center', marginTop: '3em' }}>
            <Typography variant='h3'>Congratulation, {name}!</Typography>
            <Typography variant='h3'>Your score:</Typography>
            <Typography sx={{ color: 'dodgerblue' }} variant='h3'>{score ? score : '0'} points</Typography>

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
