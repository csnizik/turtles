import React from 'react';
import {
  Link
} from "react-router-dom";

const Home = () => {
  const renderReportsLink = () => {
    return (
      <Link
        className='reportLink'
        to='congressionalReport/2020'
      >
        Access Reports
      </Link>
    );
  }

  const renderMapsLink = () => {
    return (
      <Link
        className='mapsLink'
        to='map'
      >
        ArcGis Map
      </Link>
    )
  }

  return (
    <div className='home'>
      { renderReportsLink() }
      { renderMapsLink() }
    </div>
  )


}

export default Home;
