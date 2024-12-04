import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../../features/userSlice"
import PropTypes from "prop-types"
import "./index.scss"

// Définition du composant EditName qui permet à l'utilisateur d'éditer son nom
const EditName = ({ setIsEditing }) => {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)
  const [username, setUsername] = useState(userData.userName || "")

  // Fonction de gestion de l'envoi du formulaire pour mettre à jour l'utilisateur
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
          <label>
            User name:
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label>
            First name:
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={userData.firstName}
              disabled
              style={{ backgroundColor: "#ccc" }}
              autoComplete="given-name"
            />
          </label>
        </div>
        <div className="input-wrapper">
          <label>
            Last name:
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={userData.lastName}
              disabled
              style={{ backgroundColor: "#ccc" }}
              autoComplete="family-name"
            />
          </label>
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
