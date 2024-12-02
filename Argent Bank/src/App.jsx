import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux" // Importation des hooks Redux
import { loginUser } from "./features/userSlice" // Importation de l'action asynchrone
import PropTypes from "prop-types"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"

// Composant ProtectedRoute pour protéger l'accès à certaines routes
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user.user)
  const token = sessionStorage.getItem("token")

  if (!user && !token) {
    return <Navigate to="/" />
  }

  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}

const RedirectIfLoggedIn = ({ children }) => {
  const user = useSelector((state) => state.user.user)
  const token = sessionStorage.getItem("token")

  if (user || token) {
    return <Navigate to="/user" />
  }

  return children
}

RedirectIfLoggedIn.propTypes = {
  children: PropTypes.node.isRequired,
}

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      fetch("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // Met à jour l'utilisateur en dispatchant l'action asynchrone
          dispatch(loginUser.fulfilled(data.body)) // Utilisation directe du créateur d'action `fulfilled`
        })
        .catch((error) => {
          console.error("Failed to fetch user profile:", error)
        })
    }
  }, [dispatch])

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
