import React from 'react';
import brand from '../images/icon-brand-recognition.svg';
import records from '../images/icon-detailed-records.svg';
import fully from '../images/icon-fully-customizable.svg';

function Advanced() {
  return (
    <div className='mt-5 pt-5'>
      <div className='row pt-5'>
        <div className='col-12 mx-auto pt-5'>
          <h2 className='text-center fw-bold mb-3 pt-5 pt-md-0'>
            Advanced Statistics
          </h2>
          <p className='text-center mb-5 text-secondary '>
            Track how your links are performing across the web <br /> with our
            advanced statistics dashboard.
          </p>
        </div>
      </div>
      <div className='row position-relative container mb-5 mt-5 mx-auto'>
        <div className='position-absolute top-50 line bg-info p-1 d-none d-lg-block'></div>

        <div className='col-lg-4 mb-5  position-relative'>
          <img src={brand} alt='brand' className='rounded-circle bg-dark p-2' />
          <div className='card p-4 bg-light shadow'>
            <div className='card-body'>
              <h5 className='card-title fw-bold'> Brand Recognition</h5>
              <p className='card-text'>
                Boost your brand recognition with each click. Generic links
                don't mean a thing. Branded links help instil confidence in your
                content.
              </p>
            </div>
          </div>
        </div>

        <div className='col-lg-4 mt-5 mb-5  position-relative'>
          <img
            src={records}
            alt='brand'
            className='rounded-circle bg-dark p-2'
          />
          <div className='card p-4 bg-light shadow'>
            <div className='card-body'>
              <h5 className='card-title fw-bold'> Detailed Records</h5>
              <p className='card-text'>
                Gain insights into who is clicking your links. Knowing when and
                where people engage with your content helps inform better
                decisions.
              </p>
            </div>
          </div>
        </div>

        <div className='col-lg-4 mt-5 mb-5  position-relative'>
          <img src={fully} alt='brand' className='rounded-circle bg-dark p-2' />
          <div className='card p-4 bg-light shadow'>
            <div className='card-body'>
              <h5 className='card-title fw-bold'>Fully Customizable</h5>
              <p className='card-text'>
                Improve brand awareness and content discoverability through
                customizable links, supercharging audience engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Advanced;
