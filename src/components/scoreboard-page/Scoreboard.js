import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../services/UserContextProvider';

export const Scoreboard = () => {
    const { name } = useUserContext();

    return (
        <>
            <Typography variant='h3'>Congratulation {name}!</Typography>
            <Typography variant='h3'>Your score:</Typography>
            <Typography variant='h4' color='primary' sx={{ mt: 1.2, mb: 3.5 }}>Milion points</Typography>
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
        </>
    );
};
