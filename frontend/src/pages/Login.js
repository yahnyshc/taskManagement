import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
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
                <button disabled={isLoading}> Log in </button>
                {error && <div className="error">{error}</div>}
                <Link to="/signup"><p> Don't have an account? Sign up </p></Link>
            </form>
        </div>
    )
}

export default Login