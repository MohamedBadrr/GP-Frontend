import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home Page badr</h1>
      <button className='btn btn-info'><Link to={"/selectskin"}>Select Skin</Link></button>
    </div>
  );
}
