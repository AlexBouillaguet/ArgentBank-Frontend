import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux" // Importation de 'Provider' de React-Redux pour fournir le store Redux à l'application
import store from "./redux/store" // Importation du store Redux configuré dans 'store.js'
import App from "./App.jsx"
import "./assets/styles/main.scss"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
