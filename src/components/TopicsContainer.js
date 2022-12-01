import {useEffect, useState} from 'react';
import Topic from './Topic';
import NewTopic from './NewTopic';
import M from 'materialize-css';

function TopicsContainer() {

    const [topics, setTopics] = useState([]);
    // const [filter, setFilter] = useState(null);

    const user = 1

    useEffect(()=>{
        M.AutoInit();
        fetch(`http://localhost:9292/topics/open`)
        .then(r => r.json())
        .then(obj => {
            setTopics(obj);
        })
        .catch(error => console.log(error))
    },[])

    function handleTopicDelete(topicId){
        fetch(`http://localhost:9292/topic/${topicId}`,{
                 method: "DELETE"
             })
             .then(r => r.json())
             .then(obj => {
                const newTopics = topics.filter(topic => topic.id !== topicId);
                setTopics(newTopics);
             })
             .catch(error => console.log(error))
    }

    function onCreateNewTopic(newTopic){
        setTopics([newTopic, ...topics])
    }
    
    const topicsToRender = topics.map(topic => <Topic key={topic.id} topic={topic} editable={user == topic.user_id ? true : false} onDelete={handleTopicDelete}/>)
    const myTopics = topics.filter(topic => topic.id == user)

    return(
        <div>
                <NewTopic user_id={user} onCreateTopic={onCreateNewTopic}/>
                {topicsToRender}
        </div>
    )
}
export default TopicsContainer;