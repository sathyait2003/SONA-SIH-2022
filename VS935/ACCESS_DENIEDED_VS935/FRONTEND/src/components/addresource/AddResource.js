

import DropFileInput from './DropFileInput';
import "./AddDomain.css";
import LoginAsAdminNav from '../adminnav/LoginAsAdminNav';
function AddResource() {

    const onFileChange = (files) => {
        console.log(files);
    }

    return (
     
         <div>
               <LoginAsAdminNav></LoginAsAdminNav>
               
               
               <div className="box">
            <h2 className="header">
            Drop files/pdf/ppt here
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
            <br/>
            <h2 className="header">
                Drop Your Video Files Here
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
             <br/>
            <h2 className="header">
                Drop Your Audio Files Here
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
             <br/>
        </div>
        </div>
       
       
    );
}

export default AddResource;