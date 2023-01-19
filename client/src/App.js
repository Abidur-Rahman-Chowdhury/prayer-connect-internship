import './App.css';
import CreateTodo from './component/CreateTodo';
import ShowTodoList from './component/ShowTodoList';
import TodoContextProvider from './contextApi/TodoContextProvider';

function App() {
  return (
    <TodoContextProvider>
      <div className="App">
        <CreateTodo />
        <ShowTodoList />
      </div>
    </TodoContextProvider>
  );
}

export default App;
