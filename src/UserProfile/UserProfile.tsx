import { useNavigate } from 'react-router-dom';
import './UserProfile.scss'
import { apiProfile } from '../store/reducers/CardsServices';
import { useUser } from '@clerk/clerk-react';
 
const AppProfile: React.FC = () => {

    const navigate =  useNavigate();

    const { user } = useUser();

    const { data, isSuccess, isFetching, isError, refetch } = apiProfile.useGetProfileQuery({
        name: user ? user.id : '123'
    });
    console.log(data?.[0]);
    
    return ( 
        <main className="profile">
            <h1>Your profile</h1>
            <h2>And a bit of stats</h2>

            <div className="details">
                <img src={user?.imageUrl} alt="" />

                <div className="stats">
                    <h3>Name: {user?.fullName?.slice(0, 10)}</h3>
                    <h3>Matches played: {data ? data[0].fails+data[0].wins : 0}</h3>
                    <h3>Wins: {data ? data[0].wins : 0}</h3>
                    <h3>Fails: {data ? data[0].fails : 0}</h3>
                    <h3>Win rate: {data ? (data[0].wins * 100 / (data[0].fails || 1)).toString().slice(0, 4) : 0} %</h3>
                    <h3>Your best easy time: {data ? data[0].bestEasy: 0} sec</h3>
                    <h3>Your best hard time: {data ? data[0].bestHard: 0} sec</h3>
                </div>
            </div>

            <button onClick={() => {navigate('/stats')}}>Go to detail stats</button>
        </main>
     );
}
 
export default AppProfile;