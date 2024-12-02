import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../features/userSlice"
import PropTypes from "prop-types"
import "./index.scss"

const EditName = ({ setIsEditing }) => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)
  const [username, setUsername] = useState(userData.userName || "")

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(updateUser({ username }))
    setIsEditing(false)
  }

  return (
    <div className="header">
      <h1>Edit user info</h1>
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="input-wrapper">
          <label>User name:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-wrapper">
          <label>First name:</label>
          <input
            type="text"
            value={userData.firstName}
            disabled
            style={{ backgroundColor: "#ccc" }}
          />
        </div>
        <div className="input-wrapper">
          <label>Last name:</label>
          <input
            type="text"
            value={userData.lastName}
            disabled
            style={{ backgroundColor: "#ccc" }}
          />
        </div>
        <div className="button-wrapper">
          <button type="submit" className="edit-button">
            Save
          </button>
          <button
            type="button"
            className="edit-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

EditName.propTypes = {
  setIsEditing: PropTypes.func.isRequired,
}

export default EditName
