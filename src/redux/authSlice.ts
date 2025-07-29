import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from '../types';

// Define the state type
interface AuthState {
  loading: boolean;
  user: User | null;
}

const initialState: AuthState = {
  loading: false,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    }
  }
});

export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
