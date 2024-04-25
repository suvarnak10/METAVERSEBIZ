import React from 'react';
import Header from '../components/header';
import Navbar from '../components/navbar';
import TickerTape from '../components/ticker-tape';
import Search from '../components/search';

function Trade() {
  
  return (
    <div className='trade-container'>
     <Header />
      <TickerTape />
      <Navbar />
      <div>
      <Search />
      </div>
    </div>
  );
}

export default Trade;
