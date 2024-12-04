import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "./features/userSlice"
import PropTypes from "prop-types"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"

// Composant pour protéger les routes nécessitant une authentification
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const token = sessionStorage.getItem("token")

  // Si l'utilisateur n'est pas authentifié et n'a pas de token, on le redirige vers la page d'accueil
  if (!isAuthenticated && !token) {
    return <Navigate to="/" />
  }

  return children
}

// Composant pour rediriger un utilisateur déjà authentifié
const RedirectIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const token = sessionStorage.getItem("token")

  // Si l'utilisateur est authentifié, on le redirige vers la page utilisateur
  if (isAuthenticated || token) {
    return <Navigate to="/user" />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

RedirectIfLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      // Si le token existe, on charge les données de l'utilisateur
      dispatch(fetchUserProfile())
    }
  }, [dispatch]) // Le useEffect se déclenche une fois au montage du composant

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/sign-in"
          element={
            <RedirectIfLoggedIn>
              <SignIn />
            </RedirectIfLoggedIn>
          }
        />
        <Route
          path="/user"
          element={
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
