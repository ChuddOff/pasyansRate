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
import { useNavigate, useParams } from "react-router-dom";
import { useHttp } from '../hooks/http.hook';
import { useAuth, SignedIn, UserButton, useUser, useSignUp  } from "@clerk/clerk-react";

import './HeaderLite.scss'
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { apiProfile } from '../store/reducers/CardsServices';

 
const HeaderLite:React.FC = () => {

    const {easyHard} = useParams();
    const {request} = useHttp();
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    
    const { data, isSuccess, isFetching, isError, refetch } = apiProfile.useGetProfileQuery({
        name: user ? user.id : '123'
    });
    const [PostElo, result] = apiProfile.usePostEloMutation();
    const navigate =  useNavigate();
    const {restart, moves, win} = useAppSelector(state => state.columns)

    const dispatch = useAppDispatch();


    const [open, setOpen] = useState(false);

    useEffect(() =>  {

        if (localStorage.getItem('firstReg') === 't') {
            console.log(localStorage.getItem('firstReg'));
            
            localStorage.setItem('firstReg', 'f')
            request('/api/zamer/postProfile', 'POST', JSON.stringify({
                name: user?.id
            }))
        }

        if (!isSignedIn) {
            navigate('/signin');
        }
    }, [isSignedIn])
    return (
        <header className='header'>
            <div className='else'>
                <Button sx={{ width: '100%',  padding: '0' }} onClick={() => {setOpen(true)}}>
                    <MoreVertIcon/>
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
                            <ListItemText primary='Stats' />
                        </ListItemButton>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton key={0}  onClick={() => {
                            PostElo({
                                name: user ? user.id : '123',
                                eloChange: -100
                            })
                            navigate('/games/easy')
                            }} >
                            <ListItemIcon>
                            <ThumbUpIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Easy' />
                        </ListItemButton>
                        <ListItemButton key={1}  onClick={() => {
                            PostElo({
                                name: user ? user.id : '123',
                                eloChange: -20
                            })
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
                <h1>PASYANS COMPETITIVE</h1>
            </div>
            <div className='header_profile'>
                <SignedIn>
                    <UserButton afterSignOutUrl='/signin'  />
                </SignedIn>

                <div className='header_profile_info' onClick={() => {navigate('/profile')}}>
                    <h3>{user?.firstName}</h3>
                    <h4>{isSuccess ?  data[0].elo : '...'} elo</h4>
                </div>
            </div>
            
        </header>
    );
}
 
export default HeaderLite;