import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        error_list: [],
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    const registerUser = async (e) => {
        e.preventDefault();

        const data = {
            name: user.name,
            email: user.email,
            password: user.password,
            confirmPassword: user.confirmPassword,
        }

        const res = await axios.post(`http://127.0.0.1:8000/api/register`, data);
             if (res.data.status === 200) {
                // swal("Success!", res.data.message, "success");
                 swal({
                        title: "Success!",
                        text: "Account Created Successfully",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    error_list: [],
                });
                navigate('/');
            }
            else if (res.data.status === 422) {
                setUser({ ...user, error_list: res.data.validate_err });
            }
        }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5 mx-auto">
                        <div className="card">
                            <div className="card-header">
                                <h4>
                                    Sign Up
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerUser}>
                                    <div className="form-group mb-3">
                                        <label className="pr-3">Name</label> <br />
                                        <input type="text" className="form-item form-control" onChange={handleInput} name="name" value={user.name} />
                                        <span className="text-danger">{user.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email </label>
                                        <input type="email" className="form-control" onChange={handleInput} name="email" value={user.email} />
                                        <span className="text-danger">{user.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password </label>
                                        <input type="password" className="form-control" onChange={handleInput} name="password" value={user.password} />
                                        <span className="text-danger">{user.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Confirm Password</label>
                                        <input type="password" className="form-control" onChange={handleInput} name="confirmPassword" value={user.confirmPassword} />
                                        <span className="text-danger">{user.error_list.confirmPassword}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <Link to="/" >Already Have An Account ?</Link>
                                        <button type="submit" className="btn btn-success float-end">Register</button>
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

    export default Register;
