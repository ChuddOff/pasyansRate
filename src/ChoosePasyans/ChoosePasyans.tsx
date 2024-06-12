import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";


import './ChoosePasyans.scss'
import { useUser } from "@clerk/clerk-react";

 
const ChoosePasyans: React.FC = () => {
    const navigate =  useNavigate();
    const {request} = useHttp();
    const { user } = useUser();
    return ( 
        <>
            <div className='choose'>
                <h1>Choose mode:</h1>
            </div>
            <div className="game">
                <div className="game_easy"
                onClick={() => {
                    request('/api/zamer/postElo', 'POST', JSON.stringify({
                        name: user?.id,
                        eloChange: -100
                    }))
                    navigate('/games/easy')
                    }} >
                     <h2>Pasyans: easy <br /> (-100 elo / + 20 elo)</h2>
                    <img src='/example.jpg' alt="" />
                    <h3>Accepted all the addition cards!</h3>
                </div>
                <div className="game_hard"
                onClick={() => {

                    request('/api/zamer/postElo', 'POST', JSON.stringify({
                        name: user?.id,
                        eloChange: -10
                    }))
                    navigate('/games/hard')
                    }} >
                    <h2>Pasyans: hard <br /> (-20 elo / + 100 elo)</h2>
                    <img src='/exampleLocked.png' alt="" />
                    <h3>Accepted just the top of three addition cards!</h3>
                </div>
            </div>
        </>
     );
}
 
export default ChoosePasyans;