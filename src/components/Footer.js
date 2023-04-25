import React from 'react';
import facebook from '../images/icon-facebook.svg';
import twitter from '../images/icon-twitter.svg';
import pinterest from '../images/icon-pinterest.svg';
import instagram from '../images/icon-instagram.svg';
import logo from '../images/footer-logo.svg';

function Footer() {
  return (
    <footer className='container-fluid bg-dark'>
      <div className='py-5'>
        <div className='d-flex flex-column flex-md-row justify-content-md-around align-items-center'>
          <article>
            <img src={logo} alt='' />
          </article>

          <article>
            <h3 className='text-white text-lg font-bold tracking-wide'>
              Features
            </h3>
            <ul className='text-white list-unstyled'>
              <li>Link Shortening</li>
              <li>Branded Links</li>
              <li>Analytics</li>
            </ul>
          </article>

          <article>
            <h3 className='text-white text-lg font-bold tracking-wide'>
              Resources
            </h3>
            <ul className='text-white list-unstyled'>
              <li>Blog</li>
              <li>Developers</li>
              <li>Support</li>
            </ul>
          </article>

          <article>
            <h3 className='text-white text-lg font-bold tracking-wide'>
              Company
            </h3>
            <ul className='text-white list-unstyled'>
              <li>About</li>
              <li>Our Team</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </article>

          <article>
            <ul className='d-flex gap-3'>
              <li>
                <img src={facebook} alt='facebook' />
              </li>
              <li className=''>
                <img src={twitter} alt='twitter' />
              </li>
              <li className=''>
                <img src={pinterest} alt='print' />
              </li>
              <li>
                <img src={instagram} alt='insta' />
              </li>
            </ul>
          </article>
        </div>
        <p className='m-0 text-center text-white mt-5'>
          Copyright &copy; Shortly {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
