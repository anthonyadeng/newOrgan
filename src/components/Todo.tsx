import { useEffect, useRef, useState } from 'react';
import useDebounce from '../util/useDebounce';
import { css } from '@emotion/react';
import SingleSelectable from './SingleSelectable';
import EditButton from './EditButton';
type TodoProps = {
  todos: string[];
  completed: string[];
};

const Todo = (props: TodoProps) => {
  const [todos, setTodos] = useState(props.todos);
  const [completed, setCompleted] = useState(props.completed);
  const addToCompleted = (label: string) => {
    setTodos(todos.filter((todo) => todo !== label));
    setCompleted([...completed, label]);
  };
  const addToTodos = (label: string) => {
    setCompleted(completed.filter((todo) => todo !== label));
    setTodos([...todos, label]);
  };
  const editSelected = (oldLabel: string, newLabel: string) => {
    setTodos(todos.map((todo) => (todo === oldLabel ? newLabel : todo)));
  };
  const deleteFromTodos = (label: string) => {
    setTodos(todos.filter((todo) => todo !== label));
  };

  const deleteFromCompleted = (label: string) => {
    setCompleted(completed.filter((todo) => todo !== label));
  };

  const style = useRef({
    width: '500px',
    height: '100px',
    border: '1px solid black',
    borderRadius: '10px',
    highlightColor: 'lightblue',
    backgroundColor: 'gray',
    padding: '5px',
  });

  // useEffect(() => {
  //   if (debouncedCompleted) {
  //     console.log(debouncedCompleted);
  //   }
  // }, [debouncedCompleted]);

  return (
    <div
      id='todo-wrapper'
      style={{
        width: style.current.width,
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        alignItems: 'baseline safe',
        alignContent: 'flex-start',
        gap: '.5rem .5rem',
      }}
    >
      <div id='addNewWrapper'>
        <h3>Add New</h3>
        <input type='text' id='newTodo' name='newTodo' />
        <button
          onClick={() => {
            if (
              (document.getElementById('newTodo') as HTMLInputElement).value !==
              ''
            ) {
              const newTodo = (
                document.getElementById('newTodo') as HTMLInputElement
              ).value;
              setTodos([...todos, newTodo]);
              (document.getElementById('newTodo') as HTMLInputElement).value =
                '';
            }
          }}
        >
          Add
        </button>
      </div>
      <div id='todoWrapper'>
        <h3>Todo</h3>
        {todos.map((label) => (
          <SingleSelectable
            style={style.current}
            key={label}
            label={label}
            checked={false}
            handleClick={addToCompleted}
            editCallback={editSelected}
            checkable={true}
            editable={true}
            deletable={true}
            deleteCallback={deleteFromTodos}
          />
        ))}
      </div>
      <div id='completedWrapper'>
        <h3>Completed</h3>
        {completed.map((label) => (
          <SingleSelectable
            style={style.current}
            key={label}
            label={label}
            checked={true}
            handleClick={addToTodos}
            editable={false}
            checkable={true}
            deletable={true}
            deleteCallback={deleteFromCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
