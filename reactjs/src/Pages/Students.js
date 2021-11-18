import React, {useState, useEffect} from 'react';
import {Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function Students() {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const Auth_token = localStorage.getItem('token');

    useEffect(() => {

        axios.get(`http://127.0.0.1:8000/api/students`, {
             headers: {
                'Accept':'application/json',
                'Authorization': `Bearer ${Auth_token}` 
                 }
        }).then(res=>{
            if(res.status === 200)
            {
                console.log(res);
                setStudents(res.data.students)
            }
        });

    }, []);
    

    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        swal({
            title: "Are you sure?",
            text: "You want to delete this Record?",
            icon: "warning",
            dangerMode: true,
        })
        .then(willDelete => {
            if (willDelete) {
                axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}` ,{
                headers: {
                    'Accept':'application/json',
                    'Authorization': `Bearer ${Auth_token}` 
                    }
                }).then(res=>{
                if(res.data.status === 200)
                {
                    thisClicked.closest("tr").remove();
                        swal({
                                title: "Done!",
                                text: "Record Deleted",
                                icon: "success",
                                timer: 2000,
                                button: false
                            })
                }

                else if(res.data.status === 404)
                {
                    swal("Error",res.data.message,"error");
                }
              });

            }
        });

    }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
   
    
        var student_HTMLTABLE = "";
       
        student_HTMLTABLE = students.map( (item, index) => {
            return (
                
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.course}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                        <Link to={`/edit-student/${item.id}`} className="btn btn-primary btn-sm">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteStudent(e, item.id)} className="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            );
        });

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 mx-auto">
                        <div className="card mb-2">
                        <div className="card-header">
                            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
                        </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h4>Students Data
                                    <Link to={'/add-student'} className="btn btn-success btn-sm float-end"> Add Student</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Course</th>
                                            <th>Email Id</th>
                                            <th>Phone</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student_HTMLTABLE}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Students;