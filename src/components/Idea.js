import {useState} from "react";

function Idea({idea, user_id, onIdeaDelete}){

    const [liked, setLiked] = useState(idea.liked_by.includes(user_id));
    const [edit, setEdit] = useState(false);
    const [ideaBody, setIdeaBody] = useState(idea.body);
    const [likes, setLikes] = useState(idea.likes_count);

    const editable = idea.user_id == user_id

    // console.log(editable)

    function handleChooseIdea(){
        if(window.confirm("Close Topic and Choose as Winner?")){
            console.log("star")
        }
    }


    function handleLikeClick(){
        if(liked) {
            fetch(`http://localhost:9292/idea/${idea.id}/${user_id}/unlike`, {
                method: "DELETE"
            })
            .then(r => r.json())
            .then(obj => {
                setLiked(false);
                setLikes(obj.likes_count);
                })
            .catch(error => console.log(error))
        }

        else{
            fetch(`http://localhost:9292/idea/${idea.id}/${user_id}/like`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idea_id: idea.id,
                    user_id: user_id
                })
            })
                .then(r =>r.json())
                .then(obj => {
                    setLiked(true);
                    setLikes(obj.likes_count);
                })
                .catch(error => console.log(error))
            }
        }

        function handleEditIdeaSubmit(e){
            e.preventDefault();
            if(ideaBody == ""){
                window.alert("Your entry can't be empty");
            }
            else{ 
                fetch(`http://localhost:9292/idea/${idea.id}`, {
                    method: "PATCH",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        body: ideaBody
                    })
                })
                .then(r => r.json())
                .then(obj => {
                    setEdit(false)
                })
                .catch(error => console.log(error))
            }
        }
        function handleFormChange(e){
            setIdeaBody(e.target.value)
        }

        function handleIdeaDelete(e){
            if(window.confirm("Delete idea?")){
                fetch(`http://localhost:9292/idea/${idea.id}`,{
                method:"DELETE"
                })
                .then(r => r.json())
                .then(obj => {
                onIdeaDelete(obj.id)
                })
            }
        }
       
        if(edit){
            return(
                <div>
                    <form className="grey lighten-4" onSubmit={handleEditIdeaSubmit}>
                        <label className="" htmlFor="editIdea">Idea: </label>
                        <input type="text" id ="editIdea" className="materialize-textarea center-align" name="editIdea" value={ideaBody} onChange={handleFormChange}/>
                    </form>
                    <div className='padding right-align'>
                            <button className="waves-effect waves-light btn" onClick={handleEditIdeaSubmit}><i className="material-icons left">check</i>Edit</button>
                            <button className="waves-effect waves-light btn" onClick={() => {setEdit(false); setIdeaBody(idea.body)}}><i className="material-icons left">cancel</i>Cancel</button>
                    </div>
                </div>
            )
        }
        else{
            return (
                <>
                    <li className="collection-item grey lighten-4">
                        <a className="secondary-content">
                            {editable ?
                                <>
                                    <i className="padding small material-icons" onClick={()=>setEdit(true)}>edit</i>
                                    <i className="padding small material-icons" onClick={handleIdeaDelete}>delete</i>
                                </>
                                    
                                : null}
                            <i className="padding small material-icons" onClick={handleLikeClick}>{liked ? "favorite" : "favorite_border"}</i>{likes} likes
                        </a>
                        <p>{ideaBody} <br/> 
                            By: {idea.author}
                        </p>
                        </li>
                </>
        )}
}
export default Idea;