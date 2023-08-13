import { useState } from "react";

const Login = () => {

    let [email, setEmail] = useState<null | string>(null);
    let [password, setPassword] = useState<null | string>(null);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form className="login" onSubmit={handleLogin}>
            <label htmlFor="email">email address</label>
            <input onChange={(e) => { setEmail(e.target.value) }} type="email" name="email" />
            <label htmlFor="password">password</label>
            <input onChange={(e) => { setPassword(e.target.value) }} type="password" />
            <button>login</button>
        </form>
    )
}

export default Login;