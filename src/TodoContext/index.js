import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({children}){
    const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1',[]);
    const [searchValue, setSearchValue] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;
    
    const searchedTodos = todos.filter(
        (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
        }
    );

    const addTodo = (text)=>{
        const newTodos = [...todos];
        newTodos.push({text, completed:false})
        saveTodos(newTodos);
    };
    
    const completeTodo = (text)=>{
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex((todo)=>todo.text===text);
        newTodos[todoIndex].completed=true;
        saveTodos(newTodos);
    }

    const deleteTodo = (text)=>{
        const newTodos = [...todos];

        const todoIndex = newTodos.findIndex((todo)=>todo.text===text);
        newTodos.splice(todoIndex,1);
        saveTodos(newTodos);

        //const deleteTodos = newTodos.filter((todo)=>todo.text!=text);
        //setTodos(deleteTodos);
    }


    return(
        <TodoContext.Provider value={{
            loading,
            error,
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            addTodo,
            deleteTodo,
            openModal,
            setOpenModal
        }}>
            {children}
        </TodoContext.Provider>
    );
     
}

export {TodoContext, TodoProvider};

/* localStorage.removeItem('TODOS_V1'); */
/* const defaultTodos=[
  {text:'Cortar Cebolla', completed: true},
  {text:'Tomar Curso React', completed: false},
  {text:'Llorar con la Llorona', completed: true},
  {text:'Lalalala', completed: false},
  {text:'Todo4', completed: false},
  {text:'Todo5', completed: false}
]
localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos)); */