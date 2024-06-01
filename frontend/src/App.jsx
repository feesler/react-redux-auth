import useAuthRoute from './hooks/useAuthRoute';
import Header from './components/Header.jsx';
import Content from './components/Content.jsx';
import './App.css';

function App() {
  useAuthRoute();

  return (
    <>
      <Header />
      <Content />
    </>
  );
}

export default App;
