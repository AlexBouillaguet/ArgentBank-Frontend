import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux" // Importation des hooks Redux pour accéder au store et dispatcher des actions
import { loginSuccess } from "./features/userSlice" // Importation de l'action pour mettre à jour l'utilisateur dans le store
import PropTypes from "prop-types"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"

// Composant ProtectedRoute qui protège l'accès à certaines routes
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user) // Récupération des informations de l'utilisateur depuis le store Redux

  if (!user) {
     // Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    return <Navigate to="/sign-in" />
  }

  return children // Si l'utilisateur est connecté, affiche les enfants du composant
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

function App() {
  const dispatch = useDispatch() // Initialisation du hook useDispatch pour envoyer des actions à Redux

  useEffect(() => {
    // Utilisation de useEffect pour vérifier si un token est présent dans le localStorage à chaque montage du composant
    const token = localStorage.getItem("token")
    if (token) {
      // Si un token est trouvé, on envoie une requête pour récupérer le profil de l'utilisateur
      fetch("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Si la requête est réussie, on dispatch l'action loginSuccess pour mettre à jour le store avec les informations de l'utilisateur
          dispatch(loginSuccess(data.body))
        })
    }
  }, [dispatch]) // Le useEffect se déclenche au montage du composant et chaque fois que 'dispatch' change

  return (
    <Router
      future={{
        v7_startTransition: true, // Configuration pour les transitions (React Router v7)
        v7_relativeSplatPath: true, // Configuration pour le chemin relatif des splats
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/user"
          element={
              // Route protégée, uniquement accessible si l'utilisateur est connecté
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
