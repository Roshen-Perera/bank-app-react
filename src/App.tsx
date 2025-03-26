
import Container from '@mui/material/Container';
import './App.css'
import Form from './components/Form';
import Title from './components/Title';

function App() {

  return (
    <>
      <Container className='container mt-3 ' maxWidth="sm" >
        <Title/>
        <Form />
      </Container>
    </>
  );
}

export default App
