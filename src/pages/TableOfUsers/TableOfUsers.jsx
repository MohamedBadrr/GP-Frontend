import React, { useEffect, useState } from 'react';
import './TableOfUsers.css';
import axios from 'axios';
import rank1 from ".././../assets/images/rank1.png";
import rank2 from ".././../assets/images/rank2.png";
import rank3 from ".././../assets/images/rank3.png";
import { getAuthUser } from '../../helper/Storage';

export const TableOfUsers = () => {
    const auth = getAuthUser();
    const [users, setUsers] = useState({
        results: [],
        error: null,
        loading: false,
    });

    useEffect(() => {
        setUsers({ ...users, loading: true });
        axios.get("http://localhost:4000/game/ranked-users", {
            headers: {
                token: auth.token,
            },
        }).then((res) => {
            setUsers({ ...users, results: res.data, loading: false });
        }).catch((err) => {
            setUsers({ ...users, error: err.message, loading: false });
        });
    }, []);

    const ranked = (number) => {
        if (number === 1) {
            return rank1;
        } else if (number === 2) {
            return rank2;
        } else if (number === 3) {
            return rank3;
        } else {
            return null;
        }
    };

    return (
        <div className='full-table-page'>
            <div className='container'>
                <h1>Our Top Users</h1>
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Coins</th>
                            <th>Rank</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.results.slice(0, 5).map((user, index) => (
                            <tr key={index} className={index+1 === 1 ? 'number1' : ''}>
                                <td><img src={user.photo} alt="" className='table-img' /></td>
                                <td>{user.name}</td>
                                <td>{Math.floor(user.xp / 100)}</td>
                                <td>{user.coins}<i className="fa-solid fa-coins text-warning ms-2"></i></td>
                                <td>{index + 1 > 3 ? <>{index + 1}</> : <img src={ranked(index + 1)} alt="-" className='table-img' />}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};