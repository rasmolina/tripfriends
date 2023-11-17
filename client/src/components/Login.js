import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      //Login
      const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/login', formData);
            if (response.status === 200) {
                toast.success('Login efetuado com sucesso!', { position: 'top-right',autoClose: 1000 });
                navigate('/home');
                localStorage.setItem('userId', response.data.userId);
            } else {
                toast.error(response.data.msg || 'Erro desconhecido', { position: 'top-right', autoClose: 1000 });
                navigate('/login');
            }
          } catch (error) {
            toast.error('Erro ao conectar com o servidor!'+ error, { position: 'top-right',autoClose: 1000 });
          }
        
      };
    
      //Cadastro de usuário
      const handleRegister = () => {
        navigate('/registerUser');
      };      

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4">
            <h2 className="h2 mb-4 text-center" style={{color:'blue'}}>TripFriends</h2>
            <h4 className="h4 mb-4 text-center">Faça login ou crie sua conta para continuar!</h4>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Digite sua senha"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <div className="d-flex flex-column align-items-center">
                <Button variant="primary" type="submit" className="w-50 mb-2 mt-4">
                  Login
                </Button>

                <Button variant="success" onClick={handleRegister} className="w-50 mt-2">
                  Criar Conta
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    
  );
}
