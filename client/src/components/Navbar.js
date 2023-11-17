import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Menu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    toast.success('Logoff efetuado com sucesso!', { position: 'top-right', autoClose: 1000 });

  }

  return (

    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">TripFriends</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#">Atualizar meus dados</Nav.Link>
          <Nav.Link href="/registerTrip">Cadastrar Viagem</Nav.Link>
          <Nav.Link href="/trips">Visualizar Viagens</Nav.Link>
        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link href="#" className="ml-10" onClick={handleLogout}>Logout</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}
