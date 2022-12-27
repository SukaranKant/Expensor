import './App.css';
import Navbar from './components/Navbar';
import TransactionForm from './components/TransactionForm';
import TransactionsList from './components/TransactionList';
import { Container } from "@mui/system";

function App() {
  return (
    <>
      <Navbar/>
      <Container>
      <TransactionForm/>
      <TransactionsList/>
      </Container>
    </>
  );
}

export default App;
