import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

// helper para setar header x-user-id
export function setUserIdHeader(userId) {
  if (userId) {
    api.defaults.headers['x-user-id'] = userId;
  } else {
    delete api.defaults.headers['x-user-id'];
  }
}

export default api;
