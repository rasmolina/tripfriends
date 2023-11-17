import Menu from './Navbar'
import React, { useState } from 'react';
import { Form, Button, Container, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RegisterTrip() {
    const navigate = useNavigate();

    const criador = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        data_inicio: '',
        data_fim: '',
        criador: criador,
        país: '',
        cidade: '',
        local_hospedagem: '',
    });

    const handleCreateTrip = (e) => {
        e.preventDefault();
        
        if (new Date(formData.data_fim) < new Date(formData.data_inicio)) {
            toast.error('Datas inválidas: A data de ida deve ser igual ou superior à data de retorno!', { position: 'top-right', autoClose: 3000 });
            return;
        }

        try {
            axios.post("http://localhost:3001/trips", formData);
            toast.success('Viagem cadastrada com sucesso!', { position: 'top-right', autoClose: 2000 });
            navigate('/trips');
            console.log(localStorage.getItem('userId'));
        } catch (error) {
            console.error('Erro ao criar viagem:', error);
        }
    };
    

    return (
        <>
            <Menu />

            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="p-4 ">
                            <h1 className="h1 mb-4 text-center">Tire sua viagem do papel!</h1>
                            <Form onSubmit={handleCreateTrip} className="login-form">
                                <Form.Group>
                                    <Form.Label>Data de Ida:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        required
                                        placeholder="Data de Inicio"
                                        name="dataInicio"
                                        value={formData.data_inicio}
                                        onChange={(e) => setFormData({ ...formData, data_inicio: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label className='text-left'>Data de Retorno:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        required
                                        placeholder="Data de Fim"
                                        name="dataFim"
                                        value={formData.data_fim}
                                        onChange={(e) => setFormData({ ...formData, data_fim: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>País:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="País"
                                        name="país"
                                        value={formData.país}
                                        onChange={(e) => setFormData({ ...formData, país: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Cidade:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Cidade"
                                        name="cidade"
                                        value={formData.cidade}
                                        onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Local Hospedagem:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        required
                                        placeholder="Local Hospedagem"
                                        name="localHospedagem"
                                        value={formData.local_hospedagem}
                                        onChange={(e) => setFormData({ ...formData, local_hospedagem: e.target.value })}
                                    />
                                </Form.Group>
                                <div className='text-center'>

                                    <Button className="button mt-3" type="submit">
                                        Cadastrar minha viagem
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
