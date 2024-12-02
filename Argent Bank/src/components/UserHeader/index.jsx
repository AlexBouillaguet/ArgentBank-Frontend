import { useState } from "react"
import { useSelector } from "react-redux"
import EditName from "../EditName"
import "./index.scss"

const UserHeader = () => {
  const [isEditing, setIsEditing] = useState(false)
  const { userData } = useSelector((state) => state.user)

  if (isEditing) {
    return <EditName setIsEditing={setIsEditing} />
  }

  return (
    <div className="header">
      <h1>
        Welcome back
        <br />
        {userData ? `${userData.firstName} ${userData.lastName}` : ""} !
      </h1>
      <button
        className="edit-button"
        onClick={() => {
          setIsEditing(true)
        }}
      >
        Edit Name
      </button>
    </div>
  )
}

export default UserHeader
