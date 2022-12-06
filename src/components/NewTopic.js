import {useState} from 'react';

function NewTopic({onCreateTopic, user_id}){

    const [addNewTopic, setAddNewTopic] = useState(false);
    const [newTopicName, setNewTopicName] = useState("");


    function handleFormChange(e){
        setNewTopicName(e.target.value);
    }

    function handleCreateNewTopic(e){
        e.preventDefault();

        if(newTopicName == ""){
            window.alert("Your entry can't be empty");
        }
        else{
            fetch("http://localhost:9292/topics", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    title: newTopicName,
                    user_id: user_id
                })
            })
            .then(r => r.json())
            .then(obj => {
                setNewTopicName("");
                setAddNewTopic(false);
                onCreateTopic(obj)})
            .catch(error => console.log(error));

        }
    }

    return(
        <div>
            {addNewTopic ? 
                <div className="padding">
                    <form className="grey lighten-4" onSubmit={handleCreateNewTopic}>
                        <label className="" htmlFor="addTopic">Topic Name: </label>
                        <input type="text" id ="addTopic" className="materialize-textarea center-align" name="addTopic" value={newTopicName} onChange={handleFormChange}/>
                    </form>
                        <div className='padding right-align'>
                            <button className="waves-effect waves-light btn" onClick={handleCreateNewTopic}><i className="material-icons left">check</i>Create</button>
                            <button className="waves-effect waves-light btn" onClick={() => {setAddNewTopic(!addNewTopic); setNewTopicName("")}}><i className="material-icons left">cancel</i>Cancel</button>
                        </div>
                </div> : 
                <div className='padding'>
                    <button className="waves-effect waves-light btn" onClick={() => setAddNewTopic(!addNewTopic)}><i className="material-icons left">add_box</i>Add Topic</button>
                </div>}
        
        </div>


    )
}
export default NewTopic;