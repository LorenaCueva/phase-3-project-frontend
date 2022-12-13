import Title from "./Title";
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Idea from "./Idea";
import Sort from "./Sort";

function User({user}){

    const [ideas, setIdeas] = useState([]);
    const [sort, setSort] = useState(false);
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

    let sortedIdeas = [...ideas]

    if(sort){
        sortedIdeas = sortedIdeas.sort((a, b) => b.likes_count - a.likes_count)
    }

    const ideasToRender = sortedIdeas.map(idea => <Idea key={idea.id} idea={idea} user_id={user.id} onIdeaDelete={handleIdeaDelete} topicName={true}/> )
    
    function handleSort(){
        setSort((sort)=> !sort)
    }
   

    if(user){
        return(
            <div >
                 <Title title={`${user.name}'s Ideas`}/>
                 <Sort onSort={handleSort} message={"Sort By Most Liked"}/>
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