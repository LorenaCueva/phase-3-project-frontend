import { useState } from 'react';
import M from 'materialize-css';

function Topic({topic, editable, onDelete}){

    const [onEdit, setOnEdit] = useState(false);
    const [topicData, setTopicData] = useState(topic)

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
            .then(obj => {console.log(obj); setOnEdit(false)})
            setOnEdit(false);
        }
    }

    function handleTopicDelete(e){
        if(window.confirm("Delete topic?")){
             onDelete(topic.id)
        }
     }


    M.AutoInit();

    if(!onEdit){

        return (
            <div>
                <ul className="collection with-header grey lighten-4" onClick={()=>console.log("card")}>
                    <li className="collection-header teal lighten-2"><h4>{topicData.title}</h4></li>
                    { editable ? null : <li className="collection-item grey lighten-4">Author: {topicData.author}</li>}
                    <li className="collection-item grey lighten-4">Created on: {created_at}</li>
                    <li className="collection-item grey lighten-4">Number of Ideas: {topicData.ideas_count}</li>
                </ul>
                { editable ? 
                    <div className='right-align'>
                        <button className="waves-effect waves-light btn" onClick={(e)=>{console.log(onEdit); setOnEdit(!onEdit)}}><i className="material-icons left">edit</i>Edit</button>
                        <button className="waves-effect waves-light btn" onClick={handleTopicDelete}><i className="material-icons left">delete</i>Delete</button>
                    </div> : null}
                  
            </div>
        )
    }

    else{

        return(

            <div>
                <ul className="collection with-header grey lighten-4" onClick={()=>console.log("card")}>
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