import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosConfig';

export const login = createAsyncThunk('user/login', async (creds, thunkAPI) => {
  try {
    const { data } = await api.post('/users/login', creds);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const register = createAsyncThunk('user/register', async (creds, thunkAPI) => {
  try {
    const { data } = await api.post('/users/register', creds);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data.user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchProfile = createAsyncThunk('user/profile', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/users/profile');
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userInfo: JSON.parse(localStorage.getItem('user') || 'null'), status: 'idle', error: null },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => { state.userInfo = action.payload; })
      .addCase(register.fulfilled, (state, action) => { state.userInfo = action.payload; })
      .addCase(fetchProfile.fulfilled, (state, action) => { state.userInfo = action.payload; });
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
