import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import PieChart from '../components/PieChart';
import Header from './Header';
import Footer from '../components/Footer';

function Dashboard() {
  const [Links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const auth = async () => {
    let auth = localStorage.getItem('Authorization');

    if (auth) {
      return localStorage.getItem('Authorization');
    } else {
      return [];
    }
  };

  const shortenLink = async () => {
    try {
      setLoading(true);
      let datas = await axios.get(
        'https://shortly-qg2a.onrender.com/api/shortUrl',
        {
          headers: {
            Authorization: await auth(),
          },
        }
      );
      setLinks(datas.data);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  function handleDelete(id) {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this data!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          await axios.delete(
            `https://shortly-qg2a.onrender.com/api/delete-url/${id}`,
            {
              headers: {
                Authorization: window.localStorage.getItem('Authorization'),
              },
            }
          );

          shortenLink();
          swal('Poof! Your data has been deleted!', {
            icon: 'success',
          });
        } catch (error) {
          setError(error.response.data.message);
        }
      } else {
        swal('Your data is safe!');
      }
    });
  }

  useEffect(() => {
    shortenLink();
  }, []);

  if (loading) {
    return <p className='noData'>Loading...</p>;
  }
  if (error) {
    return (
      <>
        <p className='noData'>{error}(:</p>
        {error === 'Unauthorized' ? (
          <p className='logerr'>
            Please {''}
            <Link to={'/login'} className={'btn btn-info text-white'}>
              Login
            </Link>{' '}
            to continue...
          </p>
        ) : (
          ''
        )}
      </>
    );
  }

  return (
    <div>
      <Header />
      <div className='container mb-5'>
        <div className='row pt-5'>
          <PieChart />
        </div>
        <div className='row pt-2'>
          <div className='col-lg-10 mx-auto mt-5 col-12'>
            {Links.length > 0 ? (
              <div className='table-responsive'>
                <table className='table table-primary table-striped table-hover'>
                  <thead className='table-dark text-center'>
                    <tr>
                      <th>S.No</th>
                      <th>Long url</th>
                      <th>Short url</th>
                      <th>Click Counts</th>
                      <th>Date</th>
                      <th>Delete</th>
                    </tr>
                  </thead>

                  <tbody className='text-center'>
                    {Links.map(
                      (
                        { longUrl, shortUrl, clickCount, createdAt, _id },
                        i
                      ) => {
                        return (
                          <tr key={_id}>
                            <td>{i + 1}</td>
                            <td>
                              <a
                                href={longUrl}
                                target={'_blank'}
                                rel='noreferrer'
                                className='text-decoration-none'>
                                {longUrl}{' '}
                              </a>
                            </td>

                            <td>
                              <a
                                href={`https://shortly-qg2a.onrender.com/api/${shortUrl}`}
                                target={'_blank'}
                                rel='noreferrer'
                                className='text-decoration-none'>
                                {' '}
                                {shortUrl}
                              </a>
                            </td>
                            <td>{clickCount}</td>
                            <td>{createdAt}</td>
                            <td>
                              <button
                                className='btn btn-danger btn-sm'
                                onClick={() => handleDelete(_id)}>
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <div className='table-responsive'>
                  <table className='table table-primary table-striped table-hover'>
                    <thead className='table-dark text-center'>
                      <tr>
                        <th>Long url</th>
                        <th>Short url</th>
                        <th>Click Counts</th>
                        <th>Date</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    <tbody className='text-center'></tbody>
                  </table>
                </div>
                <div className='text-dark fs-5 text-center mb-5'>
                  {' '}
                  No url created yet. Please create your url and enjoy your
                  services.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
