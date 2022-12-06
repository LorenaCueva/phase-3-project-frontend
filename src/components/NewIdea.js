import {useState} from 'react'

function NewIdea({user_id, topic_id, onNewIdea, onCancel}){

    // const [seeIdeaBtn, setSeeIdeaBtn] = useState(true);
    const [newIdea, setNewIdea] = useState("")

    function handleFormChange(e){
        setNewIdea(e.target.value)
    }

    function handleNewIdeaSubmit(e){
        e.preventDefault();

        if(newIdea == ""){
            window.alert("Your entry can't be empty");
        }
        else{
            fetch(`http://localhost:9292/ideas/${topic_id}`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    body: newIdea,
                    user_id: user_id
                })
            })
            .then(r => r.json())
            .then(obj => {
                setNewIdea("");
                onNewIdea(obj)
            })
            .catch(error => console.log(error))
        }
    }

    return(
        <div>
                <div className='padding'>
                    <form className="grey lighten-4" onSubmit={handleNewIdeaSubmit}>
                        <label className="" htmlFor="addIdea">Add Idea: </label>
                        <input type="text" id ="addIdea" className="materialize-textarea center-align" name="addIdea" value={newIdea} onChange={handleFormChange}/>
                    </form>
                    <div className='padding right-align'>
                            <button className="waves-effect waves-light btn" onClick={handleNewIdeaSubmit}><i className="material-icons left">check</i>Add Idea</button>
                            <button className="waves-effect waves-light btn" onClick={() => {setNewIdea(""); onCancel()}}><i className="material-icons left">cancel</i>Cancel</button>
                    </div>
                </div> 
        </div>
    )
}
export default NewIdea;