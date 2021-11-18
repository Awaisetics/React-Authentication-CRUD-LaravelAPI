import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';

function AddStudent() {

    const navigate = useNavigate();
    const Auth_token = localStorage.getItem('token');
    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: "",
        phone: "",
        error_list: [],
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    }

    const saveStudent = async (e) => {
        e.preventDefault();

        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        }

        const res = await axios.post(`http://127.0.0.1:8000/api/add-student`, data,{
                headers: {
                    'Accept':'application/json',
                    'Authorization': `Bearer ${Auth_token}` 
                    }
                });
             if (res.data.status === 200) {
                // swal("Success!", res.data.message, "success");
                 swal({
                        title: "Success!",
                        text: "Student record is added Successfully",
                        icon: "success",
                        timer: 2000,
                        button: false
                    })
                setStudent({
                    name: '',
                    course: '',
                    email: '',
                    phone: '',
                    error_list: [],
                });
                navigate('/students');
            }
            else if (res.data.status === 422) {
                // swal("All fields are mandetory","","error");
                setStudent({ ...student, error_list: res.data.validate_err });
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
                                    Add Student
                                    <Link className="btn btn-primary float-end" to={"/students"}>Go Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={saveStudent}>
                                    <div className="form-group mb-3">
                                        <label className="pr-3">Name</label> <br />
                                        <input type="text" className="form-item form-control" onChange={handleInput} name="name" value={student.name} />
                                        <span className="text-danger">{student.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email </label>
                                        <input type="email" className="form-control" onChange={handleInput} name="email" value={student.email} />
                                        <span className="text-danger">{student.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Course </label>
                                        <input type="text" className="form-control" onChange={handleInput} name="course" value={student.course} />
                                        <span className="text-danger">{student.error_list.course}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Phone </label>
                                        <input type="text" className="form-control" onChange={handleInput} name="phone" value={student.phone} />
                                        <span className="text-danger">{student.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-success float-end">Submit</button>
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

    export default AddStudent;
