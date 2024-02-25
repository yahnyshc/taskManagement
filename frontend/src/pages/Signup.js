import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div className="auth-wrap">
            <h2>Sign up</h2>
            
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
                <button disabled={isLoading}> Sign up </button>
                {error && <div className="error">{error}</div>}
                <Link to="/login"><p> Already have an account? Login </p></Link>
                
            </form>
        </div>
    )
}

export default Signup