

import { useEffect, useState } from 'react';
import { apiProfile } from '../store/reducers/CardsServices';
import './userStats.scss'
import { ProfileResponse } from '../store/reducers/interfaces';
 

const UserStats: React.FC = () => {

    const { data, isSuccess, isFetching, isError, refetch } = apiProfile.useGetAllQuery();

    return ( 
        <main className="userStats">

            <h1>Just your stats!</h1>

            <div className='statsBlock'>
                {isSuccess && data.map((item, i) => {
                    return (
                        <div className="topitem" key={i}>
                            <img src={item.url} alt="" />
                            <h3>{item.fullName}</h3>
                            <h3>{item.elo} elo</h3>
                        </div>
                    )
                })}
            </div>
        </main>
     );
}
 
export default UserStats;