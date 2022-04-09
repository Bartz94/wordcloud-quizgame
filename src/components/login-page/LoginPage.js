import { NavLink } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { useUserContext } from '../../services/UserContextProvider';

export const LoginPage = () => {
    const isActive = useMediaQuery("(min-width: 1000px)");
    const { setName } = useUserContext();

    const handleSetName = (event) => {
        setName(event.target.value);
    };

    return (
        <>
            <Typography className='page-title' variant={isActive ? 'h1' : 'h2'}>WordCloud game</Typography>
            <TextField
                fullWidth
                label="Enter your nickname here..."
                margin='normal'
                onChange={handleSetName} />
            <Button sx={{
                textTransform: 'lowercase',
                padding: '8px 60px',
                fontSize: '30px',
                fontWeight: '400',
            }}
                variant="outlined"
                component={NavLink} to="/question-page">
                play
            </Button>
        </>
    );
};
