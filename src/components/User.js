import Title from "./Title";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Idea from "./Idea";

function User({user}){

    const [ideas, setIdeas] = useState([]);
    const navigate = useNavigate();


    useEffect(()=>{
        if(!user){
            navigate('/');
        }
        else{
            fetch(`http://localhost:9292/ideas/user/${user.id}`)
            .then(r => r.json())
            .then(obj => {
                setIdeas(obj);
            })
            .catch(error => console.log(error))
        }
    },[])

    function handleIdeaDelete(id){
        setIdeas(ideas.filter(idea => idea.id !== id));
    }

    const ideasToRender = ideas.map(idea => <Idea key={idea.id} idea={idea} user_id={user.id} onIdeaDelete={handleIdeaDelete} topicName={true}/> )
    
   

    if(user){
        return(
            <div >
                 <Title title={`${user.name}'s Ideas`}/>
                <ul className="collection with-header grey lighten-4 left-align" >
                    <li className="collection-header teal lighten-2 left-align">
                    <h4>Ideas:</h4></li>
                    {ideasToRender}
            </ul>
                
            </div>
        )
    }
    
}
export default User;