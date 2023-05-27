import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

function NotFound() {
  return (
    <>
      <Helmet>
        <title>404</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <Link to='/'>Back to Home</Link>
    </>
  )
}

export default NotFound