/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgMobile from '../images/bg-shorten-mobile.svg';
import bgDesktop from '../images/bg-shorten-desktop.svg';
import axios from 'axios';
import swal from 'sweetalert';

const getLocalStorage = () => {
  let links = localStorage.getItem('links');

  if (links) {
    return JSON.parse(localStorage.getItem('links'));
  } else {
    return [];
  }
};

const auth = () => {
  let auth = localStorage.getItem('Authorization');

  if (auth) {
    return window.localStorage.getItem('Authorization');
  } else {
    return [];
  }
};

export default function Shortener() {
  const [longUrl, setLongUrl] = useState('');
  const [links, setLinks] = useState(getLocalStorage());
  const [buttonText, setButtonText] = useState('Copy');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (longUrl === '') {
      swal({
        title: 'Empty Text Box',
        text: 'Please Insert your Url',
        icon: 'info',
        button: 'Ok',
      });
    }

    const shortenLink = async () => {
      try {
        let datas = await axios.post(
          'https://shortly-qg2a.onrender.com/api/createUrl',
          { longUrl },
          {
            headers: {
              Authorization: auth(),
            },
          }
        );

        setLinks(datas.data);
        setLongUrl('');
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
    };
    shortenLink();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `https://shortly-qg2a.onrender.com/api/${links.shortUrl}`
    );
    setButtonText('Copied!');
    const timer = setTimeout(() => {
      setButtonText('Copy');
    }, 1000);

    return () => clearTimeout(timer);
  };

  // To load links when setting links in local storage
  useEffect(() => {
    localStorage.setItem('links', JSON.stringify(links));
  }, [links]);

  return (
    <div className='pt-2 pt-md-5 mb-5 mb-md-0'>
      <div className='container'>
        <div className='row'>
          <div className='col-5 mx-auto'>
            {errorMsg ? (
              <div
                className='alert alert-danger text-center mt-5 alert-dismissible fade show'
                role='alert'>
                {errorMsg}.
                {errorMsg === 'Unauthorized' ? (
                  <p className=''>
                    Please {''}
                    <Link to={'/login'} className={'btn btn-info text-white'}>
                      Login
                    </Link>{' '}
                    to continue...
                  </p>
                ) : (
                  ''
                )}
                <button
                  type='button'
                  class='btn-close'
                  data-bs-dismiss='alert'
                  aria-label='Close'></button>
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      <section className='shortener position-relative mx-auto mb-5'>
        <picture>
          <source media='(min-width: 768px)' srcSet={bgDesktop} />
          <img src={bgMobile} alt='backround' />
        </picture>

        <form className='form mx-auto' onSubmit={handleSubmit}>
          <div className='d-flex flex-column flex-md-row'>
            <input
              type='url'
              placeholder='Shorten a link here'
              className='py-2 px-5 mb-2 mb-md-0 input-box'
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button
              type='submit'
              className='btn btn-info rounded-5 text-white ms-md-5'
              onClick={handleSubmit}>
              Shorten It!
            </button>
          </div>
        </form>

        <div className='d-flex flex-column align-items-center justify-content-center bg-white text-center flex-md-row justify-content-md-between p-3 mt-3 rounded-lg-5 shadow'>
          <article className='long url'>
            <h6 className='mb-3 mb-md-0 text-break'>{links.longUrl}</h6>
          </article>

          <article>
            <ul className='d-md-flex align-items-md-center list'>
              <li className='me-md-5'>
                <a
                  className='text-info link-short'
                  href={`https://shortly-qg2a.onrender.com/api/${links.shortUrl}`}
                  target={'_blank'}
                  rel='noreferrer'>
                  {`https://shortly/${links.shortUrl}`}
                </a>
              </li>
              <li>
                <button
                  onClick={handleCopy}
                  className='btn btn-info rounded-lg-pill text-white text-sm'>
                  {buttonText}
                </button>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </div>
  );
}
