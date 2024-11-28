import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/userSlice"
import logo from "../../assets/img/argentBankLogo.png"
import "./index.scss"

const Header = () => {
  // Initialisation des hooks nécessaires
  const dispatch = useDispatch() // Récupération de la fonction dispatch pour envoyer des actions Redux
  const navigate = useNavigate() // Récupération de la fonction navigate pour changer de page
  const user = useSelector((state) => state.user.user) // Accès à l'utilisateur connecté depuis le store Redux

  // Fonction de déconnexion
  const handleSignOut = () => {
    dispatch(logout()) // Envoi de l'action de déconnexion au store Redux
    sessionStorage.removeItem("token")
    navigate("/")
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>{" "}
              {user.userName || user.firstName}
            </Link>
            <Link className="main-nav-item" onClick={handleSignOut} to="/">
              <i className="fa fa-sign-out"></i> Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/sign-in">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header
