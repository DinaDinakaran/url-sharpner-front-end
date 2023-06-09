import React, { useContext, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import swal from 'sweetalert';

function Reset() {
  const { token } = useParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [succMsg, setSuccMs] = useState('');
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: yup.object({
      password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('*Password is required'),
      confirm_password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .when('password', {
          is: (val) => (val && val.length > 0 ? true : false),
          then: yup
            .string()
            .oneOf([yup.ref('password')], 'Both password need to be the same'),
        })
        .required('Confirm Password Required'),
    }),
    onSubmit: async (values) => {
      try {
        let resetData = await axios.post(
          `https://shortly-qg2a.onrender.com/api/users/reset-password/${token}`,
          values
        );
        setSuccMs(resetData.data.message);
        swal({
          title: 'Nice!',
          text: 'Your password reset successfully!',
          icon: 'success',
        });
        navigate('/login');
      } catch (error) {
        setErrorMsg(error.response.data.message);
      }
    },
  });
  return (
    <div>
      {errorMsg ? (
        <div className='alert alert-danger text-center mt-5' role='alert'>
          {errorMsg}
        </div>
      ) : (
        ''
      )}
      {succMsg ? (
        <div className='alert alert-success text-center mt-5' role='alert'>
          {succMsg}
        </div>
      ) : (
        ''
      )}
      <div className='container'>
        <div className='row'>
          <div className='col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto'>
            <div className='card border-0 shadow rounded-5 my-5'>
              <div className='card-body p-4 p-sm-5'>
                <h5 className='card-title text-center mb-3 fw-light fs-5'>
                  Create New Password
                </h5>
                <form onSubmit={formik.handleSubmit}>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      name='password'
                      className='form-control'
                      id='floatingPassword'
                      placeholder='Password'
                      style={{
                        border: formik.errors.password
                          ? '1px solid red'
                          : formik.values.password !== '' &&
                            !formik.errors.password
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingPassword'>Password</label>
                    {formik.touched.password && formik.errors.password ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.password}
                      </small>
                    ) : null}
                  </div>
                  <div className='form-floating mb-3'>
                    <input
                      type='password'
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.confirm_password}
                      name='confirm_password'
                      className='form-control'
                      id='floatingPassword'
                      placeholder='Confirm Password'
                      style={{
                        border: formik.errors.confirm_password
                          ? '1px solid red'
                          : formik.values.confirm_password !== '' &&
                            !formik.errors.confirm_password
                          ? '1px solid green'
                          : '',
                      }}
                    />
                    <label htmlFor='floatingPassword'>Confirm Password</label>
                    {formik.touched.confirm_password &&
                    formik.errors.confirm_password ? (
                      <small style={{ color: 'red' }}>
                        {formik.errors.confirm_password}
                      </small>
                    ) : null}
                  </div>
                  <div className='d-grid'>
                    <button
                      className='btn btn-primary btn-login text-uppercase fw-bold'
                      type='submit'>
                      Reset Password
                    </button>
                  </div>

                  <Link to={'/login'} className='d-block text-center mt-3'>
                    Have an account? Sign In
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset;
