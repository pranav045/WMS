import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from "../api" ;

import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('https://wms-b7au.onrender.com/api/auth/login', formData);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setError('Cannot connect to server. Please make sure the backend is running.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setError('');

    try {
      const response = await API.post('https://wms-b7au.onrender.com/api/auth/demo');

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        API.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        login(response.data.user, response.data.token);
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Demo login failed');
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Demo login failed.');
      } else if (error.request) {
        setError('Cannot connect to server (port 5000).');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setDemoLoading(false);
    }
  };

  return (
    <>
      {/* Inline fix for invisible text (works 100% with dark themes & autofill) */}
      <style>{`
        .form-control {
          color: #212529 !important;
          background-color: #ffffff !important;
          border: 1px solid #ced4da !important;
          caret-color: #212529 !important;
        }
        .form-control::placeholder {
          color: #6c757d !important;
        }
        /* Fix Chrome/Edge/Safari autofill white text bug */
        .form-control:-webkit-autofill,
        .form-control:-webkit-autofill:hover,
        .form-control:-webkit-autofill:focus,
        .form-control:-webkit-autofill:active {
          -webkit-text-fill-color: #212529 !important;
          -webkit-box-shadow: 0 0 0 1000px white inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <div className="page-container">
        <div className="form-container">
          <div className="text-center mb-4">
            <h1 className="page-title">Welcome Back</h1>
            <p className="text-light">Sign in to your EcoWaste account</p>
          </div>

          {error && <div className="error-message mb-3">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-control"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="text-primary">
                Create one here
              </Link>
            </p>
          </div>

          <div className="demo-section mt-4">
            <div className="demo-credentials p-3 mb-3">
              <h4 className="text-center mb-2">Quick Demo Access</h4>
              <p className="text-center mb-2">
                Try the app instantly with our demo account
              </p>
              <button
                onClick={handleDemoLogin}
                className="btn btn-block"
                style={{ background: '#8B5CF6', color: 'white' }}
                disabled={demoLoading}
              >
                {demoLoading ? 'Loading Demo...' : 'Try Demo Account'}
              </button>
            </div>

            <div className="demo-info p-3">
              <h5 className="text-center mb-2">Demo Credentials</h5>
              <p className="text-center mb-1">
                <strong>Email:</strong> demo@ecowaste.com
              </p>
              <p className="text-center mb-0">
                <strong>Password:</strong> demo123
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;