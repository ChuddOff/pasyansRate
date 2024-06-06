import { useNavigate } from "react-router-dom";

import './About.scss'
 
const About: React.FC = () => {

    const navigate =  useNavigate();

    return ( 
        <>
            <header className="pasyans">
                <h1>PASYANS COMPETITIVE</h1>

                <div className="pasyans_desc">
        
                    <img src="/gameplayExample.png" alt="" />

                    <div className='pasyans_desc_block'>
                        <div className='pasyans_desc_cover'>
                            <h2>Welcome to the exciting world of solitaire! <br /> Here you will find all the secrets of this classic board game, loved by millions of people around the world. <br /> Discover exciting strategies, learn to read cards and turn every move into a victory and take pride of place in the list of the best players!</h2>
                        </div>
                        <div className='pasyans_desc_button'>
                            <button 
                            onClick={() => {navigate('/games')}}>Start</button>
                        </div>
                        
                    </div>
                    
                    

                </div>
            </header>


        </>
     );
}
 
export default About;