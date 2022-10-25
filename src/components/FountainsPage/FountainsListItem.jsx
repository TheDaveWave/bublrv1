import { Button, Card, CardContent, CardMedia, Chip, Divider, Rating, Stack, Typography } from "@mui/material";
import RecommendIcon from '@mui/icons-material/Recommend';
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function FountainsListItem({fountain}) {
    // access browser history
    const history = useHistory();
    const dispatch = useDispatch();
    // setup local state for rating
    const [rateMode, setRateMode] = useState(false);
    const [rating, setRating] = useState(0);

    // used to handle the submit of rating.
    const submitRating = () => {
        // dispatch value of rating to redux.
        dispatch({
            type: 'RATE_FOUNTAIN',
            payload: {
                ftnId: fountain.id,
                rating
            }
        });
        // close edit mode.
        setRateMode(false);
    }

    // handle navigation to /maps with direction to selected fountain.
    const fountainGo = () => {
        // create position object to be sent to redux and/or map component.
        const position = {
            lat: Number(fountain.latitude),
            lng: Number(fountain.longitude),
        }
        console.log(position);
        // push to maps page.
        history.push('/maps', {position});
    }

    return (
        <Card sx={{mt: 2}}>
            <CardMedia 
                component='img'
                height='140px'
                image={fountain.picture}
                alt='A Drinking Fountain'
            />
            {/* <img src={fountain.picture} className='info-img' alt='A drinking fountain'/> */}
            <CardContent>
            <Box component='div'>
                {rateMode ? 
                    <Rating name='rating' value={rating} onChange={(evt, newValue) => setRating(newValue)} precision={0.1} /> : 
                    <Rating name='read-only' value={Number(fountain.rating)} precision={0.1} readOnly/>
                }
                <Stack direction="row" spacing={1}>
                <Chip icon={<RecommendIcon />} variant='outlined' label={fountain.likes}/>
                </Stack>
                {/* <Typography>Likes: {fountain.likes}</Typography> */}
            </Box>
            <Divider />
            <Box component='div'>
                <Button onClick={() => fountainGo()}>Go</Button>
                <Button onClick={() => history.push(`/fountain/${fountain.id}`)}>Comments</Button>
                {rateMode ? 
                    <Button onClick={() => submitRating()}>Confirm</Button> : 
                    <Button onClick={() => setRateMode(true)}>Rate</Button>
                }
            </Box>
            </CardContent>
        </Card>
    );
}

export default FountainsListItem;