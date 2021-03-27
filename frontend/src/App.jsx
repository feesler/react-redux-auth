import useAuthRoute from './hooks/useAuthRoute';
import Header from './components/Header/Header.jsx';
import Content from './components/Content/Content.jsx';
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
