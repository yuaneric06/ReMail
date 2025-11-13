import './Register.css'
import axios from 'axios'

export default function Register() {
    const handleRegister = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");
        const response = await axios.post("http://localhost:8080/register", 
            {
                params: {
                    username: username,
                    password: password
                }
            }
        )
    }

    return (
        <>
            <header className="register-screen-header">
                <img src="../media/gmail-logo.png" alt="gmail logo" />
                <h1>ReMail</h1>
            </header>
            
            <form className="input" onSubmit={handleRegister}>
                <label>Register</label>
                <label>Username: <input type="text" name="username" placeholder="John Doe" /></label>
                <label>Password: <input type="password" name="password" /></label>
                <button>Submit</button>
            </form>
        </>
    )
}