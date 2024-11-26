import { useState } from "react"
import { useSelector } from "react-redux"
import EditName from "../EditName"
import "./index.scss"

const UserHeader = () => {
  const [isEditing, setIsEditing] = useState(false)
  const user = useSelector((state) => state.user.user)

  if (isEditing) {
    return <EditName setIsEditing={setIsEditing} />
  }

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {user ? `${user.firstName} ${user.lastName}` : ""} !
      </h1>
      <button
        className="edit-button"
        onClick={() => {
          console.log("Click détecté")
          setIsEditing(true)
        }}
      >
        Edit Name
      </button>
    </div>
  )
}

export default UserHeader
