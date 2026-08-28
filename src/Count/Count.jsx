import React, {useState, useEffect} from 'react'

function Count() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

    function Increment() {
        setCount(c => c + 1);
    };

    function Reset() {
        setCount(0);
    };

    function Descrement() {
        setCount(c => c - 1);
    };

    return(
        <div className='Box'>
            <h1 className='MyH1'>{count}</h1>
            <button onClick={Descrement} className='Btns'>Descrase</button>
            <button onClick={Reset} className='Btns'>Reset</button>
            <button onClick={Increment} className='Btns'>Increase</button>
        </div>
    );
}


export default Count