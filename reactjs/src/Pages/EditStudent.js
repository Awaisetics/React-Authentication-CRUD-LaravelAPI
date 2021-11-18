import React, {useState, useEffect} from 'react';
import {Link , useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function EditStudent() {

    const navigate = useNavigate();
    const [studentInput, setStudent] = useState([]);
    const [errorInput, setError] = useState([]);
    const {id} = useParams();
    const Auth_token = localStorage.getItem('token');


    useEffect(() => {
        
        axios.get(`http://127.0.0.1:8000/api/edit-student/${id}`,{
                headers: {
                    'Accept':'application/json',
                    'Authorization': `Bearer ${Auth_token}` 
                    }
                }).then( res => {

            if(res.data.status === 200)
            {
                setStudent(res.data.student);
            }
            else if(res.data.status === 404)
            {
                navigate('/students');
            }
        });

    }, [navigate]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setStudent({ ...studentInput, [name]: value });
    }

    const updateStudent = (e) => {
        e.preventDefault();
        
        const data = {
            name: studentInput.name,
            course: studentInput.course,
            email: studentInput.email,
            phone: studentInput.phone,
        }

        axios.put(`http://127.0.0.1:8000/api/update-student/${id}`, data,{
                headers: {
                    'Accept':'application/json',
                    'Authorization': `Bearer ${Auth_token}` 
                    }
                }).then(res=>{
            if(res.data.status === 200)
            {
                swal({
                        title: "Success!",
                        text: "Student Record Updated",
                        icon: "success",
                        timer: 2000,
                        button: false
                })
                setError([]);
                navigate('/students');
            }
              else if(res.data.status === 422)
            {
                // swal("All fields are mandetory","","error");
                setError(res.data.validationErrors);
            }
            else if(res.data.status === 404)
            {
                swal("Error",res.data.message,"error");
                navigate('/students');
            }
        });
    }

    return (
    <div>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Edit Student
                                <Link to={'/students'} className="btn btn-primary btn-sm float-end"> BACK</Link>
                            </h4>
                        </div>
                        <div className="card-body">
                            
                            <form onSubmit={updateStudent} >
                                <div className="form-group mb-3">
                                    <label>Name</label>
                                    <input type="text" name="name" onChange={handleInput} value={studentInput.name} className="form-control" />
                                    <span className="text-danger">{errorInput.name}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Email</label>
                                    <input type="email" name="email" onChange={handleInput} value={studentInput.email}  className="form-control" />
                                    <span className="text-danger">{errorInput.email}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Course</label>
                                    <input type="text" name="course" onChange={handleInput} value={studentInput.course}  className="form-control" />
                                    <span className="text-danger">{errorInput.course}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Phone</label>
                                    <input type="text" name="phone" onChange={handleInput} value={studentInput.phone}  className="form-control" />
                                    <span className="text-danger">{errorInput.phone}</span>
                                </div>
                                <div className="form-group mb-3">
                                    <button type="submit" id="updatebtn" className="btn btn-success float-end">Update</button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default EditStudent;