import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
    Container,
    Title,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    ButtonGroup,
    Button,
    Header
} from './styles';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    function planTypeName(planType) {
        switch (planType) {
            case 'assinatura_mensal':
                return 'Assinatura Mensal';
            case 'assinatura_anual':
                return 'Assinatura Anual';
            case 'vitalicio':
                return 'Vitalício';
            default:
                return planType;
        }
    }

    async function loadUsers() {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            if (error.response?.status === 403) {
                alert('Acesso restrito! Você não é administrador.');
                navigate('/login');
            } else {
                alert('Erro ao carregar usuários.');
            }
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <Container>
            <Header>
                <Title>Usuários do Sistema</Title>
                <ButtonGroup>
                    <Button onClick={() => navigate('/create-user')}>Criar Novo Usuário</Button>
                    <Button onClick={() => navigate('/register-admin')}>Cadastrar Admin</Button>
                    <Button onClick={handleLogout} danger>Sair</Button>
                </ButtonGroup>
            </Header>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Plano</TableHeader>
                        <TableHeader>Validade</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{planTypeName(user.planType)}</TableCell>
                            <TableCell>
                                {(user.planType === 'assinatura_mensal' || user.planType === 'assinatura_anual')
                                    ? (user.subscriptionValidUntil
                                        ? new Date(user.subscriptionValidUntil).toLocaleDateString()
                                        : 'N/A')
                                    : 'Vitalício'
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
