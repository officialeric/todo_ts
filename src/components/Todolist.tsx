import './style.css'
import { Todo } from '../models'

 interface Props {
    todos : Todo[];
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>;
 }

const Todolist = ({todos , setTodos} : Props) => {
  return (
    <div className='todos'>
        {todos.map((todo) => (
            <li>
                {todo.todo}
            </li>
        ))}
    </div>
  )
}

export default Todolist