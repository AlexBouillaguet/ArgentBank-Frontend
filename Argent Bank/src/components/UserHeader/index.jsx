import { useSelector } from "react-redux"
import "./index.scss"

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
