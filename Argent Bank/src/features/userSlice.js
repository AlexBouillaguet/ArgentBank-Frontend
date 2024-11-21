import { createSlice } from "@reduxjs/toolkit" // Importation de la fonction 'createSlice' depuis Redux Toolkit

const initialState = {
  user: null, // L'utilisateur est initialement nul (pas connecté)
  loading: false, // Le statut de chargement est initialement faux
  error: null, // Aucun message d'erreur au départ
}

const userSlice = createSlice({
  name: "user", // Le nom du slice, utilisé pour identifier la partie de l'état
  initialState, // L'état initial défini plus haut
  reducers: {
    // Actions et réducteurs pour gérer l'état de l'utilisateur
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(state, action) {
      state.loading = false
      state.user = action.payload // On met à jour l'utilisateur avec les données de la réponse (action.payload)
    },
    loginFailure(state, action) {
      state.loading = false
      state.error = action.payload // On stocke l'erreur retournée (action.payload)
    },
    logout(state) {
      state.user = null
    },
  },
})

// Export des actions créées par Redux Toolkit
export const { loginStart, loginSuccess, loginFailure, logout } =
  userSlice.actions
// Exportation du réducteur pour qu'il soit utilisé dans le store Redux
export default userSlice.reducer
