import React from 'react';
import ShowCase from '../components/ShowCase';
import Advanced from '../components/Advanced';
import Boost from '../components/Boost';
import Shortener from '../pages/Shortener';
import Footer from '../components/Footer';
import Header from '../pages/Header';

function Home() {
  return (
    <div>
      <Header />
      <ShowCase />
      <Shortener />
      <Advanced />
      <Boost />
      <Footer />
    </div>
  );
}

export default Home;
