import { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(email, password)
    }

    return (
        <div className="auth-wrap">
            <h2>Log in</h2>
            
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Email" 
                    name="un" 
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    name="pw" 
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button> Log in </button>
                <Link to="/signup"><p> Don't have an account? Sign up </p></Link>
            </form>
        </div>
    )
}

export default Login