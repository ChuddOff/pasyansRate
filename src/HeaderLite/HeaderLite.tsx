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
import { useNavigate } from "react-router-dom";
import './Header.scss'
 
const HeaderLite:React.FC = () => {
    const [open, setOpen] = useState(false);
    const navigate =  useNavigate();

    useEffect(() =>  {
        if (localStorage.getItem('pass') === null) {
            navigate('/signin');
        }
    }, [])
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
                        <ListItemButton key={0}>
                            <ListItemIcon onClick={() => {navigate('/games')}}>
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
                        <ListItemButton key={0}  onClick={() => {navigate('/games/easy')}} >
                            <ListItemIcon>
                            <ThumbUpIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Easy' />
                        </ListItemButton>
                        <ListItemButton key={1}  onClick={() => {navigate('/games/hard')}} >
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
                <img src="BUBY.png" alt="" />

                <div className='header_profile_info'>
                    <h3>Chudd Off</h3>
                    <h4>Rate 1000</h4>
                </div>
            </div>
            
        </header>
    );
}
 
export default HeaderLite;