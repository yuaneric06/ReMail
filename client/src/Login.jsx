import './Login.css'
import axios from 'axios'

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");
        console.log("username, password: ", username, password);
        const response = await axios.post("http://localhost:8080/login", 
            {
                username: username,
                password: password
            }
        );
        console.log(response);
        console.log(response.data);

    }

    return (
        <>
            <header className="login-screen-header">
                <img src="../media/gmail-logo.png" alt="gmail logo" />
                <h1>ReMail</h1>
            </header>
            
            <form className="input" onSubmit={handleSubmit}>
                <label>Login</label>
                <label>Username: <input type="text" name="username" placeholder="John Doe" /></label>
                <label>Password: <input type="password" name="password" /></label>
                <button>Submit</button>
            </form>
        </>
    )
}