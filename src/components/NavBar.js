import '../App.css'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <nav>
            <Link to=''><h1>After Thought...</h1></Link>
            <Link to='register'><h2>Register</h2></Link>
            <Link to='login'><h2>Login</h2></Link>
            <Link to='categories'><h2>Categories</h2></Link>
        </nav>
    )
}

export default NavBar
