import { useState } from 'react';
import Idea from './Idea';
import M from 'materialize-css';
import IdeasContainer from './IdeasContainer';

function Topic({topic, onDelete, user_id}){

    const editable = user_id == topic.user_id ? true : false

    const [onEdit, setOnEdit] = useState(false);
    const [topicData, setTopicData] = useState(topic);
    const [seeIdeas, setSeeIdeas] = useState(false);

    const created_at = new Date(topic.created_at).toDateString();

    function handleFormChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setTopicData({...topicData, [name]:value})
    }

    function handleFormSubmit(e){
        e.preventDefault();
        if(topicData.title == ""){
            window.alert("Your entry can't be empty");
        }
        else{
            fetch(`http://localhost:9292/topic/${topic.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: topicData.title,
                    open: topicData.open
                })
            })
            .then(r => r.json())
            .then(obj => setOnEdit(false))
            .catch(error => console.log(error))
        }
    }

    function handleTopicDelete(e){
        if(window.confirm("Delete topic?")){
            fetch(`http://localhost:9292/topic/${topic.id}`,{
                method: "DELETE"
            })
            .then(r => r.json())
            .then(obj => {
               onDelete(topic.id)
            })
            .catch(error => console.log(error))
        }
     }

     function handleSeeIdeas(e){
        setSeeIdeas(!seeIdeas);
     }


    M.AutoInit();

    if(!onEdit){

        return (
            <div >
                <ul className="collection with-header grey lighten-4" onClick={handleSeeIdeas}>
                    <li className="collection-header teal lighten-2"><h4>{topicData.title}</h4></li>
                    <li className="collection-item grey lighten-4">Author: {topicData.author}</li>
                    <li className="collection-item grey lighten-4">Created on: {created_at}</li>
                    <li className="collection-item grey lighten-4">Number of Ideas: {topicData.ideas_count}</li>
                </ul>
                { editable ? 
                    <div className='right-align'>
                        <button className="waves-effect waves-light btn" onClick={()=>{setOnEdit(!onEdit)}}><i className="material-icons left">edit</i>Edit</button>
                        <button className="waves-effect waves-light btn" onClick={handleTopicDelete}><i className="material-icons left">delete</i>Delete</button>
                    </div> : null}
                    <div>
                        {/* {seeIdeas ? <IdeasContainer ideas={topic.ideas} user_id={user_id}/> : null} */}
                        {seeIdeas ? <IdeasContainer topic_id={topic.id} user_id={user_id}/> : null }
                    </div>
                
            </div>
        )
    }

    else{

        return(

            <div>
                <ul className="collection with-header grey lighten-4">
                    <li className="collection-header teal lighten-2">
                        <form onSubmit={handleFormSubmit}>
                            <label className="white-text" htmlFor="editTitle">Edit Topic Title</label>
                            <input type="text" id ="editTitle" className="materialize-textarea center-align" name="title" value={topicData.title} onChange={handleFormChange}/>
                        </form>
                    </li>
                    <li className="collection-item grey lighten-4">Author: {topicData.author}</li>
                    <li className="collection-item grey lighten-4">Created on: {created_at}</li>
                    <li className="collection-item grey lighten-4">Number of Ideas: {topicData.ideas_count}</li>
                </ul>
                <div className='right-align'>
                    <button className="waves-effect waves-light btn" onClick={handleFormSubmit}><i className="material-icons left">check</i>Ok</button>
                    <button className="waves-effect waves-light btn" onClick={(e) => setOnEdit(false)}><i className="material-icons left">cancel</i>Cancel</button>
                </div>  
            </div>
        )
    }

    
                    
}

export default Topic;