import React, { useRef } from "react"
import{Button, Form} from 'react-bootstrap'
import "./Login.css"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import { Link } from "react-router-dom"


const Login = props => {
    const username = useRef()
    const password = useRef()
    const { login } = useSimpleAuth()

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the username and password that
            the customer enters into local storage.
        */
        const credentials = {
            "username": username.current.value,
            "password": password.current.value
        }

        login(credentials)
            .then(() => {
                props.history.push({
                    pathname: "/"
                })
            })
    }

    return (
        <>
        {props.toggle? null:
        <main style={{ textAlign: "center" }}>
            <div className='login-container'>
            <Form className="form--login" onSubmit={handleLogin}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <fieldset>
                    <label htmlFor="inputUsername"> Username </label>
                    <input ref={username} type="username"
                        className="form-control"
                        placeholder="Username"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required />
                </fieldset>
                <div className='button-container'>
                    <Button className='btn-success' type="submit">
                        Sign in
                    </Button>
                    <div>
                    <Link to="/register">Create Account</Link>
                    </div>
                </div>
            </Form>
        </div>
        </main>
        }  
        </>     
    )
}
export default Login