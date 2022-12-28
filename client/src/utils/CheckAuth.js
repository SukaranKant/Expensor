import React from 'react'
import { useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CheckAuth = (props) => {
  const navigate = useNavigate()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
  if (!isAuthenticated) {
    navigate('/login');
  }
  
  return (
    <div>{props.children}</div>
  )
}

export default CheckAuth