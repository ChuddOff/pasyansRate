import { useStopwatch } from 'react-timer-hook';
import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CottageIcon from '@mui/icons-material/Cottage';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import CachedIcon from '@mui/icons-material/Cached';
import { useNavigate, useParams } from "react-router-dom";
import './Header.scss'
import { resetColumns, setRestart } from '../store/reducers/ColumnsSlice';
import { useAuth, SignedIn, UserButton, useUser  } from "@clerk/clerk-react";
import { useHttp } from '../hooks/http.hook';
import { apiCards, apiProfile } from '../store/reducers/CardsServices';
 

const playSound = (url: string) => {
    const mp3 = new Audio(url)
    mp3.volume = 0.3
    mp3.play()
}

const Header:React.FC = () => {

    const {easyHard} = useParams();
    const {request} = useHttp();
    const { isSignedIn } = useAuth();
    const { user } = useUser();

    const { data, isSuccess, isFetching, isError, refetch } = apiProfile.useGetProfileQuery({
        name: user ? user.id : '123'
    });
    const [PostElo, result] = apiProfile.usePostEloMutation();
    const [PostTime, result1] = apiProfile.usePostTimeMutation();
    const [PostFail, result2] = apiProfile.usePostFailMutation();

    // useEffect(() => {
    //     refetch()
    // }, [])

    const navigate =  useNavigate();
    const {restart, moves, win} = useAppSelector(state => state.columns)

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const { seconds, minutes, start, pause, reset } = useStopwatch({autoStart: true});

    // useEffect(() => {
    //     start()
    // }, [start])

    useEffect(() => {
        if (win) {
            pause();
            console.log(234);
            
            PostTime({
                name: user ? user.id : '123',
                seconds: minutes*60 + seconds,
                type: easyHard ?? ''
            })
        }
    }, [win])
    
    

    const getNewCards = async () => {
        PostFail({
            name: user ? user.id : '123',
        })
        PostElo({
            name: user ? user.id : '123',
            eloChange: easyHard === 'easy' ? -100 : -20
        })
        playSound('/boom.mp3')
        dispatch(setRestart(true))
    }

    useEffect(() => {
        if (restart) {
            reset()
        }
        
    }, [restart])

    useEffect(() =>  {
        if (!isSignedIn) {
            navigate('/signin');
        }
    }, [isSignedIn])

    return (
        <header className='header'>
            <div className='else'>
                <Button sx={{ width: '50px',  padding: '0' }} onClick={() => {setOpen(true)}}>
                    <MoreVertIcon/>
                </Button>
                <Button sx={{ width: '50px',  padding: '0' }} onClick={() => {getNewCards()}}>
                    <CachedIcon/>
                </Button>
            </div>
            <Drawer open={open} className='drawer' onClose={() => {setOpen(false)}}>
                <Box sx={{ width: 250, backgroundColor: 313131 }} role="presentation" className='box' onClick={() => {setOpen(false)}}>
                    <List>
                        <ListItemButton key={0} onClick={() => {navigate('/games')}}>
                            <ListItemIcon>
                            <CottageIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItemButton>
                        <ListItemButton key={1} onClick={() => {navigate('/profile')}}>
                            <ListItemIcon>
                            <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItemButton>
                        <ListItemButton key={2} onClick={() => {navigate('/stats')}}>
                            <ListItemIcon>
                            <BarChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Leader bord' />
                        </ListItemButton>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton key={0}  onClick={() => {
                            PostFail({
                                name: user ? user.id : '123',
                            })
                            PostElo({
                                name: user ? user.id : '123',
                                eloChange: -100
                            })
                            easyHard == 'hard' && dispatch(resetColumns())
                            playSound('/start.mp3')
                            navigate('/games/easy')
                            dispatch(setRestart(true))
                            }} >
                            <ListItemIcon>
                            <ThumbUpIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Easy' />
                        </ListItemButton>
                        <ListItemButton key={1}  onClick={() => {
                            PostFail({
                                name: user ? user.id : '123',
                            })
                            PostElo({
                                name: user ? user.id : '123',
                                eloChange: -20
                            })
                            easyHard == 'easy' && dispatch(resetColumns())
                            dispatch(setRestart(true))
                            playSound('/start.mp3')
                            navigate('/games/hard')
                            }} >
                            <ListItemIcon>
                            <ThumbDownIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Hard' />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            
            <div className='header_stats'>
                <h3
                style={{alignItems: 'right'}}
                >Moves {moves}</h3>
                <h1>PASYANS COMPETITIVE</h1>
                <h3
                style={{alignItems: 'left'}}
                >{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</h3>
            </div>
            <div className='header_profile'>
                <SignedIn>
                    <UserButton afterSignOutUrl='/signin' />
                </SignedIn>

                <div className='header_profile_info' onClick={() => {navigate('/profile')}}>
                    <h3>{user?.firstName?.slice(0, 16)}</h3>
                    <h4>{isSuccess && data[0] ?  data?.[0]?.elo : '...'} elo</h4>
                </div>
            </div>
            
        </header>
    );
}
 
export default Header;