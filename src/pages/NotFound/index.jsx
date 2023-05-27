import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <h1>404 Not Found</h1>
      <Link to='/'>Back to Home</Link>
    </>
  )
}

export default NotFound