import React from 'react';
import { AppUI } from './AppUI';
import {useLocalStorage} from './useLocalStorage'

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


function App() {

  const {item: todos, saveItem: saveTodos, loading, error} = useLocalStorage('TODOS_V1',[]);
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;
  
  console.log('log 3');
  
  const searchedTodos = todos.filter(
    (todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    }
  );
  
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
  console.log('Los usuarios buscan ToDos de '+ searchValue);

  return (
    <AppUI
      loading={loading}
      error={error}
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}

export default App;
