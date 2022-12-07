import {useEffect, useState} from 'react';
import Topic from './Topic';
import NewTopic from './NewTopic';
import M from 'materialize-css';
import TopicClosed from './TopicClosed';
import Title from './Title';
import { useNavigate} from 'react-router-dom';

function TopicsContainer({user, type}) {

    const [topics, setTopics] = useState([]);
    const [visible, setVisible] = useState(0);

    const navigate = useNavigate();
    

    useEffect(()=>{
        M.AutoInit();
        if (!user){
            console.log("no")
            navigate('/') 
        }
        else{
        fetch(`http://localhost:9292/topics/${type}`)
        .then(r => r.json())
        .then(obj => {
            setTopics(obj);
            setVisible(0);
        })
        .catch(error => console.log(error))
        }
    },[type, user])

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

    function handleCloseTopic(id){
        console.log("id")
    }

    

    let topicsToRender = null;

    if (type == "open"){
        const topicsList = visible == 0 ? topics : topics.filter(topic => topic.id == visible)
        topicsToRender = topicsList.map(topic => <Topic key={topic.id} topic={topic} user={user} onDelete={handleTopicDelete} setVisible={handleSetVisible} onClose={handleCloseTopic}/>)
    }
    else if (type == "closed"){
        topicsToRender = topics.map(topic => <TopicClosed key={topic.id} topic={topic}/>)
    }


    return(
        <div>
                {type == "open" ? 
                    <>
                        <Title title={"Open Topics"}/>
                        <NewTopic user={user} onCreateTopic={onCreateNewTopic}/>
                    </> : 
                        <Title title={"Closed Topics"}/>
                }
                {topicsToRender}
        </div>
    )

    
}
export default TopicsContainer;