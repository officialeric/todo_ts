import { useEffect, useRef, useState } from "react";
import { Todo } from "../models";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";


interface Props {
    todo : Todo;
    todos : Todo[];
    setTodos :React.Dispatch<React.SetStateAction<Todo[]>> ;
}

const SingleTodo = ({todo , todos , setTodos} : Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleDone = (id: number) => {
        setTodos(
          todos.map((todo) => {
            return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
          })
        )
      }

    const handleDelete = (id : number) =>{
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
      };

     const inputRef = useRef<HTMLInputElement>(null);

     useEffect(() => {
        inputRef.current?.focus();
     }, [edit])
     

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text text">{todo.todo}</s>
          ) : (
            <span className="todos__single--text text">{todo.todo}</span>
          )}
        <div className="icons">
            <div className="icon">
                <CiEdit  onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}/>
            </div>
            <div className="icon">
                <MdDelete onClick={()=> handleDelete(todo.id)}/>
            </div>
            <div className="icon">
                <MdDone onClick={()=> handleDone(todo.id)}/>
            </div>
        </div>
    </form>
  )
}

export default SingleTodo