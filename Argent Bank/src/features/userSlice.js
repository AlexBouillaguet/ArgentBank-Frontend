import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Action asynchrone pour la connexion
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      // Requête pour obtenir le token
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
      localStorage.setItem("token", data.body.token)

      // Requête pour obtenir les infos utilisateur
      const userResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${data.body.token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user profile")
      }

      const userData = await userResponse.json()
      return userData.body // Retourne les données utilisateur
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message) // Gestion des erreurs
    }
  }
)

export const updateUser = createAsyncThunk(
  "user/updateProfile",
  async ({ username }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName: username }),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const userData = await response.json()
      return userData.body
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

const initialState = {
  user: null,
  isLoading: false,
  error: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      localStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
