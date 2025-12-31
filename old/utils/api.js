import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://partners.carpoolkr.com/api';
const API_BASE_URL_Auth = process.env.NEXT_PUBLIC_API_URL + '/sanctum/csrf-cookie';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  async login(credentials) {
    await axios.get(API_BASE_URL_Auth || 'http://localhost:8000/sanctum/csrf-cookie');
    return api.post('/login', credentials);
  },
  logout: () => api.post('/logout'),
  register: (userData) => api.post('/register', userData),
  user: () => api.get('/user'),

  getPortsByCountry: (data) => {
    return api.get('/bookings/ports-by-country', { params: data });
  },
  
  getPortCharges: (data) => {
    return api.get('/bookings/port-charges', { params: data });
  },
  
  bookingDetailUpdate: (updateData) => api.post('/bookings/update', updateData),
  getCountries: () => api.get('/countries'),
};

export const bookingAPI = {
  getMyBookings: (query = '') => api.get(`/my-bookings${query}`),
  bookingDetail: (booking_num) => api.get(`/bookings/${booking_num}`),
};




