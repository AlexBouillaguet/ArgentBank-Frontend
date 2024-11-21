import { useSelector } from "react-redux"
import "./index.scss"

 // Utilisation de useSelector pour récupérer les informations de l'utilisateur à partir du store Redux
const UserHeader = () => {
  const user = useSelector((state) => state.user.user)

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user ? `${user.firstName} ${user.lastName}` : ""} !
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  )
}

export default UserHeader
