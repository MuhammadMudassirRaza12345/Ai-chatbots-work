// import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import {TodoItems} from './components/TodoItem';
import { Todos } from './components/Todos';
import { Footer} from './components/Footer';

function App() {
  let todos = [
    { sno: 1, title: "Go to the market", desc: "You need to go to the market to get this job done" },
    { sno: 2, title: "Go to the mall", desc: "You need to go to the mall to get this job done" },
    { sno: 3, title: "Go to the gym", desc: "You need to go to the gym to get this job done" },
    ]
  return (
    <>
      <Header title="REACT" searchBar={true} />
      <TodoItems/>
      <Todos todos={todos}/>
      <Footer/>
    
    
    
    
    </>
     
     


      
  );
}

export default App;
