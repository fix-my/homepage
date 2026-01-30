import { useState } from 'react';

const initialTodos = [
  { id: '1', text: 'React 공부하기', completed: false },
  { id: '2', text: '프로젝트 배포하기', completed: false },
  { id: '3', text: '코드 리뷰하기', completed: true },
];

export function useTodos() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}
