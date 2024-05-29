import { useStopwatch } from 'react-timer-hook';
import { useEffect } from 'react';


import './Header.scss'
 
const Header:React.FC = () => {

    const { seconds, minutes, start, pause, reset } = useStopwatch({ autoStart: true });
    
    useEffect(() => {
        start()
    }, [start])

    

    return (
        <header className='header'>
            <div className='header_stats'>
                <h1>PASYANS COMPETITIVE</h1>
                <h3>{minutes.toString().padStart(2,'0')}:{seconds.toString().padStart(2,'0')}</h3>
                <h3>Moves 0</h3>
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