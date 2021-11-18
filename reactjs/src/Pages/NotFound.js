import React from "react";      
import { Link } from "react-router-dom";

const NotFound = () => {
    return(
        <div className="card col-6 mx-auto">
         <h2 className = "card-body p-5 mx-auto"> Error 404 , Requested Page Not Found</h2>
         <Link to="/" className="btn bg-dark text-warning card-footer" >Click Here To Go Back To HomePage</Link>
        </div>
    );
}

export default NotFound;