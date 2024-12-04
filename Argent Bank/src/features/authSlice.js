import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Définition de l'action asynchrone loginUser pour se connecter
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

      // Vérifie si la réponse n'est pas OK
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      // Si la requête réussit, récupère le token
      const data = await response.json()
      sessionStorage.setItem("token", data.body.token)
      return data.body.token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// Définition de l'état initial pour le slice 'auth'
const initialState = {
  token: sessionStorage.getItem("token"),
  isLoading: false,
  error: null,
  isAuthenticated: !!sessionStorage.getItem("token"),
}

// Création du slice avec des reducers pour gérer l'état
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Reducer pour se déconnecter
    logout(state) {
      state.token = null
      state.isAuthenticated = false
      sessionStorage.removeItem("token")
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état pendant que l'action `loginUser` est en cours
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      // Gestion de l'état après que l'action `loginUser` soit réussie
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload
        state.isAuthenticated = true
      })
      // Gestion de l'état si l'action `loginUser` échoue (rejected)
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  },
})

// Exportation de l'action `logout` pour l'utiliser dans d'autres composants
export const { logout } = authSlice.actions
// Exportation du reducer pour le slice 'auth'
export default authSlice.reducer
