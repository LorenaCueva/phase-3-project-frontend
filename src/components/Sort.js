import {useState} from 'react';

function Sort({onSort}){

    const [sort, setSort] = useState(false);

    function handleSort(e){
        setSort(!sort);
        onSort();
    }

    return (
        <div>
             <form>
             <p>
                <label>
                    <input type="checkbox" className="filled-in" checked={sort} onChange={handleSort} />
                    <span>See Only My Topics</span>
                </label>
            </p>
             </form>
            
        </div>
    )
}
export default Sort;