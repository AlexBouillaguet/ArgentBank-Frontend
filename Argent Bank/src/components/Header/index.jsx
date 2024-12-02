import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../features/authSlice"
import { clearUserData } from "../../features/userSlice"
import logo from "../../assets/img/argentBankLogo.png"
import "./index.scss"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const handleSignOut = () => {
    dispatch(logout())
    dispatch(clearUserData())
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
        {isAuthenticated && userData ? (
          <>
            <Link className="main-nav-item" to="/user">
              <i className="fa fa-user-circle"></i>{" "}
              {userData.userName || userData.firstName}
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
