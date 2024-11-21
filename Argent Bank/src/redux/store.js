import { configureStore } from "@reduxjs/toolkit" // Importation de la fonction 'configureStore' depuis Redux Toolkit
import userReducer from "../features/userSlice" // Importation du réducteur 'userReducer' depuis le fichier userSlice

// Configuration du store Redux avec Redux Toolkit
const store = configureStore({
  reducer: {
    user: userReducer, // Définition du réducteur pour l'état 'user' du store, qui gère l'authentification et les informations de l'utilisateur
  },
})

// Exportation du store configuré pour qu'il soit utilisé dans l'application
export default store
