

import { useEffect, useState } from 'react';
import { apiProfile } from '../store/reducers/CardsServices';
import './userStats.scss'
import { ProfileResponse } from '../store/reducers/interfaces';
import { useUser } from '@clerk/clerk-react';
import { log } from 'console';
import { Box, LinearProgress } from '@mui/material';
 

const UserStats: React.FC = () => {

    const { data, isSuccess, isFetching, isError, refetch } = apiProfile.useGetAllQuery();
    const { user } = useUser();

    return ( 
        <main className="userStats">

            <h1>Leader bord:</h1>

            <div className='statsBlock'>
                {isSuccess && data.map((item, i) => {
                    
                    return (
                        <div className={`topitem ${item.name === user?.id && 'highlight'}`} key={i}>
                            <h4>{i+1}. </h4>
                            <img src={item.url} alt="" />
                            <div className='statsBlockDetails'>
                                <h4>{item.fullName.slice(0, 10)}</h4>
                                <h3>{'(' + item.elo + ' elo)'} </h3>
                            </div>
                        </div>
                    )
                })}
            </div>

            {isFetching && 
        <div className="blur">
            <div className="loading">
                <h2>Loading...</h2>

                <Box sx={{ width: '80%' }}>
                    <LinearProgress />
                </Box>
            </div>
            
        </div>
        }
        </main>
     );
}
 
export default UserStats;