import {useEffect, useState} from 'react';
import Topic from './Topic';
import NewTopic from './NewTopic';
import { setActiveLink } from './NavBar';
import M from 'materialize-css';
import TopicClosed from './TopicClosed';
import Title from './Title';

function TopicsContainer({user_id, type}) {

    const [topics, setTopics] = useState([]);
    const [visible, setVisible] = useState(0);

    console.log(visible)

    useEffect(()=>{
        M.AutoInit();
        fetch(`http://localhost:9292/topics/${type}`)
        .then(r => r.json())
        .then(obj => {
            setTopics(obj);
            setVisible(0);
        })
        .catch(error => console.log(error))
    },[type])

    function handleTopicDelete(topicId){
        const newTopics = topics.filter(topic => topic.id !== topicId);
        setTopics(newTopics);
    }

    function onCreateNewTopic(newTopic){
        setTopics([newTopic, ...topics])
    }

    function handleSetVisible(id){
        visible == 0 ? setVisible(id) : setVisible(0)
    }

    let topicsToRender = null;

    if (type == "open"){
        const topicsList = visible == 0 ? topics : topics.filter(topic => topic.id == visible)
        topicsToRender = topicsList.map(topic => <Topic key={topic.id} topic={topic} user_id={user_id} onDelete={handleTopicDelete} setVisible={handleSetVisible}/>)
    }
    else if (type == "closed"){
        topicsToRender = topics.map(topic => <TopicClosed key={topic.id} topic={topic}/>)
    }


    return(
        <div>
                {type == "open" ? 
                    <>
                        <Title title={"Open Topics"}/>
                        <NewTopic user_id={user_id} onCreateTopic={onCreateNewTopic}/>
                    </> : 
                        <Title title={"Closed Topics"}/>
                }
                {topicsToRender}
        </div>
    )
}
export default TopicsContainer;