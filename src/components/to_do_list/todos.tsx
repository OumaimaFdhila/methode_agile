"use client"

import AddTodo from "./AddTodoList"
import TodoList from "./TodoList"
import { ToDosProvider } from "./todosProvider"


export default function Todos() {
    return(
        <ToDosProvider>
            <div className="flex flex-col w-full h-full px-5">
                <AddTodo/>
                <TodoList/>
            </div>
        </ToDosProvider>
    )
}