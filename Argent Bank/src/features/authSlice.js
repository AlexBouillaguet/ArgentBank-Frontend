import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const data = await response.json()
      sessionStorage.setItem("token", data.body.token)
      return data.body.token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  token: sessionStorage.getItem("token"),
  isLoading: false,
  error: null,
  isAuthenticated: !!sessionStorage.getItem("token")
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
       builder
       .addCase(loginUser.pending, (state) => {
            state.isLoading = true
            state.error = null
          })
          .addCase(loginUser.fulfilled, (state, action) => {
               state.isLoading = false
               state.token = action.payload
               state.isAuthenticated = true
          })
          .addCase(loginUser.rejected, (state, action) => {
               state.isLoading = false
               state.error = action.payload
               state.isAuthenticated = false
          })
     },
     reducers: {
       logout(state) {
         state.token = null
         state.isAuthenticated = false
         sessionStorage.removeItem("token")
       },
     },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
