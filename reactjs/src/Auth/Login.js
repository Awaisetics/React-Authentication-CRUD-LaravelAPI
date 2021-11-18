import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

function Login() {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        error_list: [],
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const authenticate = (e) => {
        e.preventDefault();
        const data = {
            email: credentials.email,
            password: credentials.password,
        }

        axios.post(`http://127.0.0.1:8000/api/login`, data , {
              headers: {
                'Accept':'application/json',
                'credentials' : 'include'
                 }
        }).then(res=>{
            if (res.data.status === 200) {
                const Auth_token=res.data.message;
                localStorage.setItem('token',Auth_token);
                console.log(res.data.message);
                swal({
                    title: "Success!",
                    text: "Logged In Successfully",
                    icon: "success",
                    timer: 2000,
                    button: false
                })
                setCredentials({
                    email: '',
                    password: '',
                    error_list: [],
                });
                navigate('/students');
                }
                else if (res.data.status === 422)
                {
                    setCredentials({ ...credentials, error_list: res.data.validate_err });
                }
                else if (res.data.status === 401)
                {
                     swal("Invalid Credentials","Email and Password do not Match","error");
                }
        });
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Login
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={authenticate}>
                                        <div className="form-group mb-3">
                                        <label>Email </label>
                                        <input type="email" className="form-control" onChange={handleInput} name="email" value={credentials.email} />
                                        <span className="text-danger">{credentials.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password </label>
                                        <input type="password" className="form-control" onChange={handleInput} name="password" value={credentials.password} />
                                        <span className="text-danger">{credentials.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <Link to="/register" >Don't Have An Account ?</Link>
                                        <button type="submit" className="btn btn-success float-end">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

    export default Login;
