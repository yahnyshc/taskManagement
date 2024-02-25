import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout" 
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const {logout} = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <h1>
                    <Link to="/">Task Manager</Link>
                </h1>

                <a href="https://standforukraine.com/"><img src="free-ukraine.png" alt="Stand With Ukraine" ></img></a>
                <hr></hr>

                <nav>
                    {user && (
                        <div>
                            <span className='email'>{user.email}</span>
                            <button className='button-3' onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login" className='button-3'>Login</Link>
                            <Link to="/signup" className='button-3'>Signup</Link>
                        </div> 
                    )}
                </nav>
                
            </div>
        </header>
    )
}

export default Navbar;