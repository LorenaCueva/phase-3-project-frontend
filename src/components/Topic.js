import { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import M from 'materialize-css';
import IdeasContainer from './IdeasContainer';

function Topic({topic, onDelete, user_id, setVisible, onClose}){

    const editable = user_id == topic.user_id ? true : false

    const [onEdit, setOnEdit] = useState(false);
    const [topicData, setTopicData] = useState(topic);
    const [seeIdeas, setSeeIdeas] = useState(false);

    const navigate = useNavigate();
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
        setSeeIdeas((seeIdeas) => !seeIdeas);
        setVisible(topic.id)
     }

     function handleCloseTopic(){

        fetch(`http://localhost:9292/topic/${topic.id}/close`)
        .then(r => r.json())
        .then(obj => {
            if(obj.ideas.length == 0){
                window.alert("Topic can't be closed without ideas")
            }
            else{
                let winnersCount = Math.max(...obj.ideas.map(idea => idea.likes_count));
                let winnerIdeas = obj.ideas.filter(idea => idea.likes_count == winnersCount);
                let winner_id = Math.floor(Math.random()* winnerIdeas.length)
            
                fetch(`http://localhost:9292/topic/${topic.id}/close`,{
                    method:"PATCH",
                    headers:{
                        "Content-type": "Application/json"
                    },
                    body: JSON.stringify({
                        winner_idea: winnerIdeas[winner_id].id                    
                    })
                })
                .then(r => r.json())
                .then(obj => {
                    console.log(obj);
                    navigate('/topics/closed');
                })
            }

        })

     }


    M.AutoInit();

    if(!onEdit){

        return (
            <div >
                <ul className="collection with-header grey lighten-4 left-align" onClick={handleSeeIdeas} >
                    <li className="collection-header teal lighten-2">
                    <a className="secondary-content">
                        {editable ?
                            <div className="padding white-text">
                                <i className="padding small material-icons white-text" onClick={()=>{setOnEdit(!onEdit)}}>edit</i>
                                <i className="padding small material-icons white-text" onClick={handleTopicDelete}>delete</i>
                                <i className="padding small material-icons white-text" onClick={handleCloseTopic}>close</i>Close
                            </div>
                        : null}
                    </a>
                        <h4>{topicData.title}</h4></li>
                    <li className="collection-item grey lighten-4">Author: {topicData.author}</li>
                    <li className="collection-item grey lighten-4">Created on: {created_at}</li>
                    <li className="collection-item grey lighten-4">Number of Ideas: {topicData.ideas_count}</li>
                </ul>
                    <div>
                        {seeIdeas ? <IdeasContainer topic_id={topic.id} user_id={user_id} onBack={handleSeeIdeas}/> : null }
                    </div>
                
            </div>
        )
    }

    else{
        return(
            <div>
                <ul className="collection with-header grey lighten-4 left-align ">
                    <li className="collection-header teal lighten-2 ">
                        <a className="secondary-content">
                            <i className="padding small material-icons white-text" onClick={handleFormSubmit}>check</i>
                            <i className="padding small material-icons white-text" onClick={(e) => setOnEdit(false)}>cancel</i>
                        </a>
                        <form onSubmit={handleFormSubmit}>
                            <label className="white-text" htmlFor="editTitle">Edit Topic Title</label>
                            <input type="text" id ="editTitle" className="materialize-textarea center-align" name="title" value={topicData.title} onChange={handleFormChange}/>
                        </form>
                    </li>
                    <li className="collection-item grey lighten-4">Author: {topicData.author}</li>
                    <li className="collection-item grey lighten-4">Created on: {created_at}</li>
                    <li className="collection-item grey lighten-4">Number of Ideas: {topicData.ideas_count}</li>
                </ul>
            </div>
        )
    }

    
                    
}

export default Topic;