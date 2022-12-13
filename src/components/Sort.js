import {useState} from 'react';

function Sort({onSort, message}){

    const [sort, setSort] = useState(false);

    function handleSort(e){
        setSort((sort)=>!sort);
        onSort();
    }

    return (
        <div>
             <form>
             <p>
                <label>
                    <input type="checkbox" className="filled-in" checked={sort} onChange={handleSort} />
                    <span>{message}</span>
                </label>
            </p>
             </form>
            
        </div>
    )
}
export default Sort;