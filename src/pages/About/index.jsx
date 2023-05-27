import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

function About() {
  return (<>
    <Helmet>
      <title>About | Todo App</title>
    </Helmet>
    <h1>About</h1>
    <Link to='/'>Back to Home</Link>
  </>)
}

export default About