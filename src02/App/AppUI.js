import React from 'react';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import {TodosLoading} from '../TodosLoading';
import {TodosError} from '../TodosError';
import {EmptyTodos} from '../EmptyTodos';
import {TodoContext} from '../TodoContext';

function AppUI(){
    return(
        <React.Fragment>
            <TodoCounter/>
            <TodoSearch/>

            <TodoContext.Consumer>
                {({
                    loading,
                    error,
                    searchedTodos,
                    completeTodo,
                    deleteTodo,
                })=>(
                    <TodoList>
                        {loading && <TodosLoading/>}
                        {error && <TodosError/>}
                        {(!loading && searchedTodos.length===0) && <EmptyTodos/>}

                        {searchedTodos.map(todo =>(
                        <TodoItem
                            key={todo.text}
                            text={todo.text}
                            completed={todo.completed}
                            onComplete={()=>completeTodo(todo.text)}
                            onDelete={()=>deleteTodo(todo.text)}
                        />
                        ))}
                    </TodoList>
                )}
                
            </TodoContext.Consumer>

            <CreateTodoButton/>
        </React.Fragment>
    )
}
export {AppUI}