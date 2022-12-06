import {useState, useEffect} from 'react';
import Idea from "./Idea";
import NewIdea from "./NewIdea";

function IdeasContainer({topic_id, user_id, onBack}){

    const [ideas, setIdeas] = useState([]);
    const [addIdea, setAddIdea] = useState(false);

   useEffect(()=> {
    fetch(`http://localhost:9292/ideas/${topic_id}`)
    .then(r => r.json())
    .then (obj => setIdeas(obj))
    .catch(error => console.log(error))
   },[])

   function handleNewIdea(newIdea){
        setIdeas([newIdea,...ideas]);
        setAddIdea(false);
   }

   function handleAddIdeaClick(e){
        setAddIdea(true);
   }

   function handleIdeaDelete(idea_id){
     const newIdeas = ideas.filter(idea => idea.id !== idea_id);
     setIdeas(newIdeas);
   }

    const ideasToRender = ideas.map(idea => <Idea key={idea.id} idea={idea} user_id={user_id} onIdeaDelete={handleIdeaDelete}/>);

    return (
        <div>
            <ul className="collection with-header grey lighten-4" >
                    <li className="collection-header teal lighten-2 left-align">
                    <a className="padding secondary-content white-text">
                        {addIdea ? null :
                        <><i className="padding small material-icons white-text" onClick={handleAddIdeaClick}>add_box</i>Add</>
                        }
                    </a>
                    <h4>Ideas:</h4></li>
                    {addIdea ? <NewIdea user_id={user_id} topic_id={topic_id} onNewIdea={handleNewIdea} onCancel={()=>setAddIdea(false)}/> : null}
                    {ideasToRender}
            </ul>
            <div className='padding right-align'>
                <button className="waves-effect waves-light btn" onClick={onBack}><i className="material-icons left">add_box</i>Back</button>
            </div>
        </div>
    )
}
export default IdeasContainer;