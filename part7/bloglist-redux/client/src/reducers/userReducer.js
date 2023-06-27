import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    // ... other reducer actions for user
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;