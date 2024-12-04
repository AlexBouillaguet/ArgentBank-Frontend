import PropTypes from "prop-types"
import "./index.scss"

// Définition du composant FeatureItem qui affiche une icône, un titre et une description
const FeatureItem = ({ icon, title, description }) => {
  return (
    <div className="feature-item">
      <img src={icon} alt={`${title} Icon`} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

FeatureItem.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FeatureItem
