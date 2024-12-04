import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Action asynchrone pour récupérer le profil utilisateur
export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("token")
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      // Si la réponse de l'API n'est pas OK, on lance une erreur
      if (!response.ok) {
        throw new Error("Failed to fetch user profile")
      }

      // Si la réponse est OK, on récupère les données utilisateur
      const userData = await response.json()
      return userData.body
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// Action asynchrone pour mettre à jour le profil utilisateur
export const updateUser = createAsyncThunk(
  "user/updateProfile",
  async ({ username }, thunkAPI) => {
    try {
      const token = sessionStorage.getItem("token")
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

      // Si la réponse de l'API n'est pas OK, on lance une erreur
      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      // Si la réponse est OK, on récupère les données de l'utilisateur mises à jour
      const userData = await response.json()
      return userData.body
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

// État initial du slice "user"
const initialState = {
  userData: null,
  isLoading: false,
  error: null,
}

// Création du slice "user" avec reducers et extraReducers
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action pour réinitialiser les données utilisateur
    clearUserData: (state) => {
      state.userData = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Gestion de l'état lorsque `fetchUserProfile` est en cours
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      // Gestion de l'état lorsque `fetchUserProfile` est réussie
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = action.payload
      })
      // Gestion de l'état lorsque `fetchUserProfile` échoue
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Gestion de l'état lorsque `updateUser` est en cours
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      // Gestion de l'état lorsque `updateUser` est réussie
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.userData = action.payload
      })
      // Gestion de l'état lorsque `updateUser` échoue
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

// Exportation de l'action `clearUserData` pour la réinitialisation des données utilisateur
export const { clearUserData } = userSlice.actions
// Exportation du reducer pour le slice "user"
export default userSlice.reducer
