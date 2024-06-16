import { useNavigate } from 'react-router-dom';
import './UserProfile.scss'
 
const AppProfile: React.FC = () => {

    const navigate =  useNavigate();

    return ( 
        <main className="profile">
            <h1>Your profile</h1>
            <h2>And a bit of stats</h2>

            <div className="details">
                <img src="/DIAMONDS.png" alt="" />

                <div className="stats">
                    <h3>Name: </h3>
                    <h3>Mathes started: </h3>
                    <h3>Wins: </h3>
                    <h3>Fails: </h3>
                    <h3>WiN rate: </h3>
                    <h3>Your best easy time: </h3>
                    <h3>Your best hard time: </h3>
                </div>
            </div>

            <button onClick={() => {navigate('/stats')}}>Go to detail stats</button>
        </main>
     );
}
 
export default AppProfile;