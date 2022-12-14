import {useState} from 'react';

function Sort({onSort, message, isOn}){

    const [sort, setSort] = useState(isOn);

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