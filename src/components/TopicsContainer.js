import {useEffect, useState} from 'react';
import Topic from './Topic';
import M from 'materialize-css';

function TopicsContainer() {
    const [topics, setTopics] = useState([]);

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

    const topicsToRender = topics.map(topic => <Topic key={topic.id} topic={topic} editable={true} onDelete={handleTopicDelete}/>)

    return(
        <div>
                {topicsToRender}
        </div>
    )
}
export default TopicsContainer;