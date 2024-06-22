import { useNavigate } from "react-router-dom";

import './About.scss'
 
const About: React.FC = () => {

    const navigate =  useNavigate();

    return ( 
        <>
            <header className="about">
                <h2>Chudd Off</h2>
                <div className="social">
                    <a href="https://t.me/chudd_off"><img src="/tg.png" alt="tg" /></a>
                    <a href="https://www.youtube.com/@chudd_off"><img src="/yt.png" alt="youtube" /></a>
                </div>

            </header>
            <main className="pasyans">

                <div className="pasyans_desc">

                    <div className='pasyans_desc_block'>
                        <h1>PASYANS COMPETITIVE</h1>
                        <div className='pasyans_desc_cover'>
                            <h2>Welcome to the exciting world of solitaire! <br /> Here you will find all the secrets of this classic board game, loved by millions of people around the world. <br /> Discover exciting strategies, learn to read cards and turn every move into a victory and take pride of place in the list of the best players!</h2>
                        </div>
                        <button 
                        onClick={() => {navigate('/games')}}>Start</button>
                        
                    </div>
                    
                    <img src="/gameplayExample.png" alt="" loading="lazy" />

                </div>
            </main>


        </>
     );
}
 
export default About;