import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <h1>
                    <Link to="/">Task Manager</Link>
                </h1>
                
                <a href="https://standforukraine.com/"><img src="free-ukraine.png" alt="Stand With Ukraine" ></img></a>
                <hr></hr>

                <nav>
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </nav>
                
            </div>
        </header>
    )
}

export default Navbar;