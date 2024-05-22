"use client"

import AddTodo from "./AddTodoList"
import TodoList from "./TodoList"
import { ToDosProvider } from "./todosProvider"


export default function Todos() {
    return(
        <ToDosProvider>
            <AddTodo/>
            <TodoList/>
        </ToDosProvider>
    )
}