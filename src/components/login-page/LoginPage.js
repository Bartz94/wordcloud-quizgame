import { useNavigate, Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import { useMediaQuery } from '@mui/material';
import { useUserContext } from '../../services/UserContextProvider';
import { useState } from 'react';



export const LoginPage = () => {
    const isActive = useMediaQuery("(min-width: 1000px)");
    const { name, setName } = useUserContext();
    const [errors, setError] = useState(false);


    const handleSetName = (event) => {
        setName(event.target.value);
    };

    const navigate = useNavigate();
    const handlePlayButton = (event) => {
        if (name) {
            navigate(`/question-page`)
        }
        else {
            setError(true);
        }
    };

    return (
        <>
            <Typography className='page-title' variant={isActive ? 'h1' : 'h2'}>WordCloud game</Typography>
            <TextField
                fullWidth
                label="Enter your nickname here..."
                margin='normal'
                onChange={handleSetName}
                error={errors}
            />
            <Button sx={{
                textTransform: 'lowercase',
                padding: '8px 60px',
                fontSize: '30px',
                fontWeight: '400',
            }}
                onClick={handlePlayButton}
                variant="outlined">
                play
            </Button>
            {errors ?
                <>
                    <Alert sx={{ m: 3 }} variant="outlined" severity="error">
                        Error — please enter your nickname!
                    </Alert>
                </>
                : ''
            }
        </>
    );
};
