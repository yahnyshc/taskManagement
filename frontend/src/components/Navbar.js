import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <h1><Link to="/">Task Manager</Link></h1>
                
                <a href="https://standforukraine.com/"><img src="free-ukraine.png" alt="Stand With Ukraine" ></img></a>
                <hr></hr>
                <h2>Future page link...</h2>
                
            </div>
        </header>
    )
}

export default Navbar;