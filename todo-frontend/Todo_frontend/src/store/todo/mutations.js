export function setTodos(state, payload) {
  state.todos = payload.getTodos;
}

export function removeTodo(state, id) {
  const index = state.todos.findIndex(todo => todo.id === id);
  state.todos.splice(index, 1);
}

export function addTodo(state, payload) {
  state.todos.push(payload.createTodo);
}

export function editTodo(state, payload){
  const index = state.todos.findIndex(todo => todo.id === payload.id);
  state.todos.splice(index, 1, payload);
}