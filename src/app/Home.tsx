import React from 'react';
import {
  Link
} from "react-router-dom";

const Home = () => {
  return (
    <div className='home'>
      <Link className='reportLink' to='congressionalReport/2020'>Access Reports</Link>
    </div>
  );
}

export default Home;
