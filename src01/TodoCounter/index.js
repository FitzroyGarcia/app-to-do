import "./TodoCounter.css";

function TodoCounter({total, completed}){
    return(
        <h1 className="TodoCounter">
        {total === completed ?  
            <div>Felicidades Completaste Todo</div> 
            : 
            <div>Has completado <span>{completed}</span> de <span>{total}</span> TODOs</div>
        }
        </h1>
    );
}

export {TodoCounter};