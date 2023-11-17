import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RegisterUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        sexo: '',
        email: '',
        password: '',
        telefone: '',
        country: '',
        cidade: '',
    });

    const handleCancel = () => {
        navigate('/login');
    }

    const handleClickRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/register', formData);
            if (response.data.resultQuery && response.data.resultQuery !== -1) {
                toast.success('Viajante cadastrado com sucesso, faça login para continuar!', { position: 'top-right', autoClose: 2000 });
                navigate('/login');

            } else {
                toast.error(response.data.msg || 'Erro desconhecido', { position: 'top-right', autoClose: 1000 });
                
            }
        } catch (error) {
            toast.error('Erro ao conectar com o servidor!' + error, { position: 'top-right', autoClose: 1000 });
        }
    };

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/login">Login</Navbar.Brand>
                    <Navbar.Toggle />
                </Container>
            </Navbar>

            <Container className="mt-4 mb-4">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 text-center">
                            <h2 className="h2 mb-4">Torne-se um Trip Friend!</h2>
                            <Form onSubmit={handleClickRegister} className="login-form">
                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        required
                                        type="text"
                                        className='mb-3'
                                        placeholder="Nome Completo"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        type="email"
                                        required
                                        className='mb-3'
                                        placeholder="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        type="password"
                                        required
                                        className='mb-3'
                                        placeholder="Senha"
                                        name="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </Form.Group>



                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        type="number"
                                        required
                                        className='mb-3'
                                        placeholder="Idade"
                                        name="idade"
                                        value={formData.idade}
                                        onChange={(e) => setFormData({ ...formData, idade: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="login-form-group">
                                    <Form.Label className='mr-10 text-left'>Gênero:</Form.Label>
                                    <Form.Check
                                        type="radio"
                                        inline
                                        label="Masculino"
                                        name="sexo"
                                        id="sexo-masculino"
                                        value="masculino"
                                        checked={formData.sexo === 'masculino'}
                                        onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                                    />
                                    <Form.Check
                                        type="radio"
                                        inline
                                        label="Feminino"
                                        name="sexo"
                                        id="sexo-feminino"
                                        value="feminino"
                                        checked={formData.sexo === 'feminino'}
                                        onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        type="number"
                                        required
                                        className='mb-3'
                                        placeholder="Telefone"
                                        name="telefone"
                                        value={formData.telefone}
                                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        type="text"
                                        required
                                        className='mb-3'
                                        placeholder="País"
                                        name="país"
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group className="login-form-group">
                                    <Form.Control
                                        type="text"
                                        required
                                        className='mb-3'
                                        placeholder="Cidade"
                                        name="cidade"
                                        value={formData.cidade}
                                        onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                                    />
                                </Form.Group>

                                <div className="d-flex flex-column align-items-center">
                                    <Button variant="primary" type="submit" className="w-50 mb-2 mt-4">
                                        Criar conta
                                    </Button>

                                    <Button variant="secondary" onClick={handleCancel} className="w-50 mt-2">
                                        Cancelar
                                    </Button>
                                </div>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
