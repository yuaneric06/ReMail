import './Login.css'

export default function Login() {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target();
        const formData = new formData(form);
        const username = formData.get("username");
        const password = formData.get("password");
    }

    return (
        <>
            <header className="login-screen-header">
                <img src="../media/gmail-logo.png" alt="gmail logo" />
                <h1>ReMail</h1>
            </header>
            
            <form className="input">
                <label>Login</label>
                <label>Username: <input type="text" name="username" placeholder="John Doe" /></label>
                <label>Password: <input type="password" name="password" /></label>
                <button>Submit</button>
            </form>
        </>
    )
}