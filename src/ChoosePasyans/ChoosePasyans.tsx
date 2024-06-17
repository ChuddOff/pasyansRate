import { useNavigate } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";


import './ChoosePasyans.scss'
import { useUser } from "@clerk/clerk-react";
import { apiProfile } from "../store/reducers/CardsServices";
import { useAppDispatch } from "../hooks/redux";
import { resetColumns } from "../store/reducers/ColumnsSlice";

const playSound = (url: string) => {
    const mp3 = new Audio(url)
    mp3.volume = 0.3
    mp3.play()
} 

const ChoosePasyans: React.FC = () => {
    const navigate =  useNavigate();
    const {request} = useHttp();
    const { user } = useUser();
    const dispatch = useAppDispatch();
    const [PostElo, result] = apiProfile.usePostEloMutation();
    const [PostFail, result2] = apiProfile.usePostFailMutation();

    return ( 
        <>
            <div className='choose'>
                <h1>Choose mode:</h1>
            </div>
            <div className="game">
                <div className="game_easy"
                onClick={() => {
                    PostFail({
                        name: user ? user.id : '123',
                    })
                    PostElo({
                        name: user ? user.id : '123',
                        eloChange: -100
                    })
                    dispatch(resetColumns())
                    playSound('/start.mp3')
                    navigate('/games/easy')
                    }} >
                     <h2>Pasyans: easy <br /> (-100 elo / + 20 elo)</h2>
                    <img src='/example.jpg' alt="" />
                    <h3>Accepted all the additional cards!</h3>
                </div>
                <div className="game_hard"
                onClick={() => {
                    PostFail({
                        name: user ? user.id : '123',
                    })
                    PostElo({
                        name: user ? user.id : '123',
                        eloChange: -20
                    })
                    dispatch(resetColumns())
                    playSound('/start.mp3')
                    navigate('/games/hard')
                    }} >
                    <h2>Pasyans: hard <br /> (-20 elo / + 100 elo)</h2>
                    <img src='/exampleLocked.png' alt="" />
                    <h3>Accepted just the top of three additional cards!</h3>
                </div>
            </div>
        </>
     );
}
 
export default ChoosePasyans;