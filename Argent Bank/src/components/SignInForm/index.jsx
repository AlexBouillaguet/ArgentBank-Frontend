import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../features/authSlice"
import { fetchUserProfile } from "../../features/userSlice"
import "./index.scss"

const SignInForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [formError, setFormError] = useState("")
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)

  // Fonction pour valider le format de l'email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  // Fonction qui se déclenche lors du changement de valeur de l'email
  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setFormError("")
  }

  // Fonction qui se déclenche lorsqu'on quitte le champ de l'email pour effectuer la validation
  const handleEmailBlur = () => {
    if (!validateEmail(email) && email !== "") {
      setEmailError("Invalid email format")
    } else {
      setEmailError("")
    }
  }

  // Fonction qui se déclenche lors du changement de valeur du mot de passe
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setFormError("")
  }

  // Fonction qui se déclenche lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setEmailError("Invalid email format")
      return
    }

    // Envoi des données de connexion au store Redux
    const resultLogin = await dispatch(loginUser({ email, password }))
    if (loginUser.fulfilled.match(resultLogin)) {
      await dispatch(fetchUserProfile())
      navigate("/user")
    } else {
      setFormError("Invalid email or password")
    }
  }

  return (
    <section className="sign-in-content">
      <i className="fa fa-user-circle sign-in-icon"></i>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            id="username"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className={emailError || formError ? "input-error" : ""}
            autoComplete="email"
          />
          {emailError && <span className="error-text">{emailError}</span>}
        </div>
        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={formError ? "input-error" : ""}
            autoComplete="current-password"
          />
        </div>
        <div className="input-remember">
          <input type="checkbox" id="remember-me" />
          <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
        {formError && <p className="form-error">{formError}</p>}
      </form>
    </section>
  )
}

export default SignInForm
