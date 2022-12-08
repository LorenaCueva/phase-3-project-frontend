import {useEffect, useState} from 'react';
import Topic from './Topic';
import NewTopic from './NewTopic';
import M from 'materialize-css';
import TopicClosed from './TopicClosed';
import Title from './Title';
import { useNavigate} from 'react-router-dom';
import Sort from './Sort';

function TopicsContainer({user, type}) {

    const [topics, setTopics] = useState([]);
    const [visible, setVisible] = useState(0);
    const [sort, setSort] = useState(false)

    const navigate = useNavigate();
    

    useEffect(()=>{
        M.AutoInit();
        if (!user){
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
        setVisible(0);
    }

    function onCreateNewTopic(newTopic){
        setTopics([newTopic, ...topics])
        setVisible(0);
    }

    function handleSetVisible(id){
        visible == 0 ? setVisible(id) : setVisible(0)
    }

    function handleSort(){
        setSort(!sort)
    }

    

    let topicsToRender = null;

    let sortedTopics = sort ? topics.filter(topic => topic.user_id == user.id) : topics


    if (type == "open"){
        const topicsList = visible == 0 ? sortedTopics : sortedTopics.filter(topic => topic.id == visible)
        topicsToRender = topicsList.map(topic => <Topic key={topic.id} topic={topic} user={user} onDelete={handleTopicDelete} setVisible={handleSetVisible}/>)
    }
    else if (type == "closed"){
        topicsToRender = sortedTopics.map(topic => <TopicClosed key={topic.id} topic={topic}/>)
    }



    return(
        <div>
                {type == "open" ? 
                    <>
                        <Title title={"Open Topics"}/>
                        {!visible ? <Sort onSort={handleSort}/> : null}
                        <NewTopic user={user} onCreateTopic={onCreateNewTopic}/>
                    </> :
                    <>
                        <Title title={"Closed Topics"}/>
                        {!visible ? <Sort onSort={handleSort}/> : null}
                    </>
                       
                }
                {topicsToRender}
        </div>
    )

    
}
export default TopicsContainer;