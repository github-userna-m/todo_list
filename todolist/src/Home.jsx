import { useEffect, useState } from 'react';
import axios from 'axios';
import Create from './Create';
import { BsCircleFill ,BsFillCheckCircleFill ,BsFillTrashFill} from 'react-icons/bs'; // Import the icon

function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete= (id)=>{
    axios.get('http://localhost:3001/delete/'+id) // Added a slash before ${id}
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err));
  }

  const handleEdit = (id) => {
    axios.get('http://localhost:3001/update/'+id) // Added a slash before ${id}
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='home'>
      <h2>Todo List</h2>
      <Create />
      <br/>
      {
       todos.length === 0
        ? 
        <div>
          <h2>No Record</h2>
        </div>
       : 
        todos.map(todo => (
          <div className="task" key={todo._id}> {/* Added key prop */}
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done? 
               <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
               :<BsCircleFill className='icon' />
              }
              <p className={todo.task ? "line-through" : " "}>{todo.task}</p>
            </div>
            <div>
              <span>
                <BsFillTrashFill  className="icon" onClick={()=> handleDelete(todo._id)}></BsFillTrashFill>
              </span>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Home;
