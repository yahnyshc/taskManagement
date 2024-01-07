import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/homes">
                    <h1>Task Manager</h1>
                </Link>
                <a href="https://standforukraine.com/"><img src="free-ukraine.png" alt="Stand With Ukraine" ></img></a>
                <hr></hr>
                <h2>About</h2>
                
            </div>
        </header>
    )
}

export default Navbar;