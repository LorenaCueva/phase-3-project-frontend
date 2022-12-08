import {useState} from "react";
import { useNavigate} from 'react-router-dom';
import Title from "./Title";


function LogIn({onLogIn}){

    const [credentials, setCredentials] = useState({name: "", password: ""});

    const navigate = useNavigate();

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({...credentials, [name]:value})
    }

    function handleFormSubmit(e){
        e.preventDefault();
        fetch(`http://localhost:9292/login/${credentials.name}/${credentials.password}`)
        .then(r => r.json())
        .then(obj => {
            if(obj.length > 0){
                onLogIn(obj[0])
                navigate("/topics/open")
            }
            else{
                window.alert("Wrong name or password")
                setCredentials({name: "", password: ""})
            } 
            })
        .catch(error => console.log(error))
    }

    return(
        <div>
            <Title title={"Log In"}/>
            <div className="row">
             <div className="card-panel grey lighten-4">
                <form className="col s6 offset-s3" onSubmit={handleFormSubmit}>
                    <div className="row">
                        <div className="input-field col s6">
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" name="name" className="validate" value={credentials.name} onChange={handleFormChange}/>
                        </div>
                        <div className="input-field col s6">
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" name="password"  value={credentials.password} onChange={handleFormChange} />
                        </div>
                    </div>
                </form>
            <div className="row">
                <div className="col s6 offset-s3">
                    <button className="btn waves-effect waves-light" onClick={handleFormSubmit}>LogIn</button>
                </div>
            </div>
          </div>
       </div>
        </div>

        
        );

  
      }
    
    export default LogIn;