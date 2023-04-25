import React from 'react';
import { Link } from 'react-router-dom';
import showcase from '../images/illustration-working.svg';

function ShowCase() {
  return (
    <div>
      <section className='mt-5 mb-5 pt-5'>
        <div className='container mx-auto pt-5'>
          <div className='row justify-content-md-space-between gap-5'>
            <div className='col-lg-5 pt-5 col-12 ps-4 ps-md-5 order-2 order-lg-1'>
              <h1 className='fw-bold more-ft'>More than just shorter links</h1>
              <p className='mb-10 text-secondary fs-5 mt-3'>
                Build your brand's recognition and get detailed insights on how
                your links are performing.
              </p>
              <div className='text-center text-lg-start text-md-start'>
                <Link
                  to={'/login'}
                  className='btn btn-info mt-3 text-white btn-lg rounded-pill mb-5 text-center'>
                  Get Started for Free
                </Link>
              </div>
            </div>
            <div className='col-lg-6 col-12 ps-4 ps-md-5 order-1 order-lg-2'>
              <img src={showcase} alt='Shortly' className='img-fluid' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShowCase;
