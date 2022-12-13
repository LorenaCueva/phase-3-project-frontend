function TopicClosed({topic}){

    const created_at = new Date(topic.created_at).toDateString();
    const closed_on = new Date(topic.closed_on).toDateString();

    return(
        <div>
            <ul className="collection with-header grey lighten-4 left-align">
                <li className="collection-header teal lighten-2">
                        <h4>{topic.title}</h4></li>
                    <li className="collection-item grey lighten-4">Author: {topic.author}</li>
                    <li className="collection-item grey lighten-4">Created on: {created_at}</li>
                    <li className="collection-item grey lighten-4">Closed on: {closed_on}</li>
                    <li className="collection-item grey lighten-4">Number of Ideas: {topic.ideas_count}</li>
                    <li className="collection-item teal lighten-4">
                        <a className="secondary-content lighten-4">
                            <i className="padding small material-icons teal-text ">favorite</i>{topic.winner_likes} likes
                        </a>
                    <h5>Winner Idea: {topic.winner}</h5></li>
                    <li className="collection-item teal lighten-4">Author: {topic.winner_author}</li>
                </ul>
        </div>
    )
}
export default TopicClosed;