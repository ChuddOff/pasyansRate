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

import './Header.scss'
 
const Header:React.FC = () => {

    const {moves} = useAppSelector(state => state.columns)

    const [open, setOpen] = useState(false);
    const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: true });
    
    const list = ['Home', 'Easy', 'Profile', 'Stats'];

    useEffect(() => {
        start()
    }, [start])

    

    return (
        <header className='header'>
            <div className='else'>
            <Button onClick={() => {setOpen(true)}}>
                <MoreVertIcon/>
            </Button>
            <Drawer open={open} className='drawer' onClose={() => {setOpen(false)}}>
                <Box sx={{ width: 250, backgroundColor: 313131 }} role="presentation" className='box' onClick={() => {setOpen(false)}}>
                    <List>
                        <ListItemButton key={0}>
                            <ListItemIcon>
                            <CottageIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Home' />
                        </ListItemButton>
                        <ListItemButton key={1}>
                            <ListItemIcon>
                            <AccountCircleIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Profile' />
                        </ListItemButton>
                        <ListItemButton key={2}>
                            <ListItemIcon>
                            <BarChartIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Stats' />
                        </ListItemButton>
                    </List>
                    <Divider />
                    <List>
                        <ListItemButton key={0}>
                            <ListItemIcon>
                            <ThumbUpIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Easy' />
                        </ListItemButton>
                        <ListItemButton key={1}>
                            <ListItemIcon>
                            <ThumbDownIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Hard' />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            </div>
            
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
                <img src="BUBY.png" alt="" />

                <div className='header_profile_info'>
                    <h3>Chudd Off</h3>
                    <h4>Rate 1000</h4>
                </div>
            </div>
            
        </header>
    );
}
 
export default Header;