import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import userReducer from "../features/userSlice"

// Configuration du store avec les reducers auth et user
export const store = configureStore({
  reducer: {
    auth: authReducer, // Le reducer pour l'authentification
    user: userReducer, // Le reducer pour les données utilisateur
  },
})

export default store
