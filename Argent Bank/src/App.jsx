import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserProfile } from "./features/userSlice"
import PropTypes from "prop-types"
import Home from "./pages/Home"
import SignIn from "./pages/SignIn"
import User from "./pages/User"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const token = sessionStorage.getItem("token")

  if (!isAuthenticated && !token) {
    return <Navigate to="/" />
  }

  return children
}

const RedirectIfLoggedIn = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const token = sessionStorage.getItem("token")

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
      dispatch(fetchUserProfile())
    }
  }, [dispatch])

  return (
    <Router>
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
