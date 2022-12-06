import {useEffect, useState} from 'react';
import Topic from './Topic';
import NewTopic from './NewTopic';
import M from 'materialize-css';

function TopicsContainer({user_id}) {

    const [topics, setTopics] = useState([]);
    // const [visible, setVisible] = useState(false);
    // const [filter, setFilter] = useState(null);


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
        const newTopics = topics.filter(topic => topic.id !== topicId);
        setTopics(newTopics);
    }

    function onCreateNewTopic(newTopic){
        setTopics([newTopic, ...topics])
    }

    
    const topicsToRender = topics.map(topic => <Topic key={topic.id} topic={topic} user_id={user_id} onDelete={handleTopicDelete} />)
    const myTopics = topics.filter(topic => topic.id == user_id)

    return(
        <div>
                <NewTopic user_id={user_id} onCreateTopic={onCreateNewTopic}/>
                {topicsToRender}
        </div>
    )
}
export default TopicsContainer;