import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import LoadingSpinner from "../components/Shared/LoadingSpinner"
import PropTypes from "prop-types"

const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()

  
    if (isLoading) return <LoadingSpinner />
    if (role === 'admin') return children
    return <Navigate to='/dashboard'  replace='true' />
  }
  

  AdminRoute.propTypes = {
  children: PropTypes.element,
}

export default AdminRoute;