import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import Menu from './Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Trips() {
    const [trips, setTrips] = useState([]);
    const [viajantes, setViajantes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState([]);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        fetchTrips();
        findViajante();
    }, []);

    //carrega lista das viagens
    const fetchTrips = async () => {
        try {
            const response = await axios.get('http://localhost:3001/trips');
            setTrips(response.data);
        } catch (error) {
            console.error('Erro ao buscar viagens:', error);
        }
    };

    //Busca viajante pelo id
    const findViajante = async () => {
        const organizers = [];
        const ages = [];
        trips.forEach((trip) => {
            axios.get(`http://localhost:3001/viajante/id/${trip.criador}`)
                .then((response) => {
                    organizers.push(response.data.nome)
                    ages.push(response.data.idade)
                })
                .catch((error) => {
                    console.error('Error fetching organizer data:', error);
                });
        });
    };

    //Adicionar o usuário logado a uma viagem
    const joinTrip = (tripId, organizer) => {
        

        // Faz a requisição para adicionar o usuário à viagem
        axios.post(`http://localhost:3001/trips/${tripId}/join`, { viajante_id: userId })
            .then(response => {
                fetchTrips();
                // Atualiza o estado ou realiza outras ações conforme necessário
                toast.success(`Legal, você vai viajar com ${organizer}!`, { position: 'top-right', autoClose: 2000 });
            })
            .catch(error => {
                console.error('Erro ao se juntar à viagem:', error);
                if (error.response && error.response.data && error.response.data.msg) {
                    // Verifica se a mensagem de erro contém uma indicação de violação de chave primária
                    const errorMsg = error.response.data.msg;
                    if (errorMsg.includes('Viagem já possui esse viajante')) {
                        toast.error('Você já se juntou nessa viagem!', { position: 'top-right', autoClose: 1000 });
                    } else {
                        toast.error('Erro ao se juntar à viagem :(', { position: 'top-right', autoClose: 1000 });
                    }
                } else {
                    toast.error('Erro desconhecido :(', { position: 'top-right', autoClose: 1000 });
                }
            });
    };


    // Requisição para obter a lista de viajantes para a viagem específica
    const loadViajantesList = (tripId, tripPais, tripCidade) => {
        const dadosTrip = [tripPais, " - ", tripCidade];
        axios.get(`http://localhost:3001/tripviajantes/${tripId}`)
            .then(response => {
                setViajantes(response.data);
                setSelectedTrip(dadosTrip);
                setShowModal(true);
            })
            .catch(error => {
                console.error('Erro ao obter a lista de viajantes para a viagem:', error);
            });
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTrip(null);
    };

    const deleteTrip = (tripId) => {
        const confirmDelete = window.confirm("Tem certeza de que deseja cancelar esta viagem?");
        
        if (confirmDelete) {
            axios.delete(`http://localhost:3001/trip/delete/${tripId}`)
                .then(response => {
                    toast.warning('Que pena, sua viagem foi cancelada :(', { position: 'top-right', autoClose: 2000 });
                    fetchTrips();
                })
                .catch(error => {
                    console.error('Erro ao remover viagem!', error);
                });
        }
    };
    



    return (
        <>
            <Menu />
            <Container className="mt-5">
                <h1 className="mb-4 text-center">Próximas Viagens!</h1>
                {trips.map((trip) => (
                    <Card key={trip.id} className="mb-4">
                        <Card.Body>
                            <Card.Text>
                                <h3 className='h3' style={{ color: 'blue' }}> {trip.país} - {trip.cidade}</h3>

                                <strong>Organizador:</strong> {trip.criador_nome}


                                <br />
                                <strong>Data de Ida:</strong> {format(new Date(trip.data_inicio), 'dd/MM/yyyy')}
                                <br />
                                <strong>Data de Retorno:</strong> {format(new Date(trip.data_fim), 'dd/MM/yyyy')}
                                <br />
                                <strong>Local Hospedagem:</strong> {trip.local_hospedagem}
                            </Card.Text>

                            <div >
                                <Button variant="primary" type="submit" className="w-auto mt-2" onClick={() => joinTrip(trip.id, trip.criador_nome)}>
                                    Quero me juntar!
                                </Button>
                                <br />

                                <Button variant="success" className="w-auto mt-2" onClick={() => loadViajantesList(trip.id, trip.país, trip.cidade)}>
                                    Ver viajantes
                                </Button>
                                <br />

                                {trip.criador == userId && (
                                    <Button variant="danger" className="w-auto mt-2" onClick={() => deleteTrip(trip.id)}>
                                        Cancelar Viagem
                                    </Button>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                ))}

                {/* Modal para exibir lista de viajantes */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Lista de Viajantes: {selectedTrip}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {viajantes.map((viajante) => (
                            <div key={viajante.id}>
                                <p>{viajante.nome} - {viajante.idade} anos - email: {viajante.email}</p>
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        </>
    )
}
