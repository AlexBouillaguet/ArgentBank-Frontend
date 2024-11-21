import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../features/userSlice"
import "./index.scss"

const SignInForm = () => {
  // Hooks pour gérer l'état et la navigation
  const navigate = useNavigate()
  const [email, setEmail] = useState("") // Gestion de l'état local pour l'email
  const [password, setPassword] = useState("") // Gestion de l'état local pour le mot de passe
  const dispatch = useDispatch() // Permet d'envoyer des actions Redux
  const { isLoading, error } = useSelector((state) => state.user) // Récupère l'état de l'utilisateur dans Redux (chargement et erreurs)

  // Fonction de gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart()) // Déclenche l'action pour indiquer le début de la connexion


    try {
      // Envoi de la requête de connexion avec l'email et le mot de passe
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

      // Envoi d'une autre requête pour récupérer les informations de l'utilisateur
      const userResponse = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${data.body.token}`,
            "Content-Type": "application/json",
          },
        }
      )

      const userData = await userResponse.json() // Récupération des données du profil utilisateur
      dispatch(loginSuccess(userData.body)) // Déclenche l'action pour mettre à jour l'état de l'utilisateur avec les nouvelles données

      navigate("/user")
    } catch (err) {
      dispatch(loginFailure(err.message))
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </section>
  )
}

export default SignInForm
