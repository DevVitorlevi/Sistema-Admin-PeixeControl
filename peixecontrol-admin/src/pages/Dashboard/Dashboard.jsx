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
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Carregar usuários
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

    // Logout
    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    // Função para renovar assinatura
    async function handleRenew(userId) {
        const newDate = prompt('Digite a nova data de validade (formato: YYYY-MM-DD)');
        if (!newDate) return;

        try {
            const token = localStorage.getItem('token');
            await api.post('/users/renew-subscription', { userId, newValidUntil: newDate }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Assinatura renovada com sucesso!');
            loadUsers(); // Atualiza a lista
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao renovar assinatura.');
        }
    }

    // Função para cancelar acesso
    async function handleCancelAccess(userId) {
        if (!window.confirm('Tem certeza que deseja cancelar o acesso deste usuário?')) return;

        try {
            const token = localStorage.getItem('token');
            await api.patch(`/users/${userId}/cancel-access`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Acesso cancelado com sucesso!');
            loadUsers(); // Atualiza a lista
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao cancelar acesso.');
        }
    }

    // Filtrar usuários pelo termo digitado
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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

            {/* Campo de Busca */}
            <input
                type="text"
                placeholder="Buscar por nome ou email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', marginBottom: '16px', width: '300px' }}
            />

            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Nome</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Plano</TableHeader>
                        <TableHeader>Validade</TableHeader>
                        <TableHeader>Ações</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map(user => (
                        <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {user.planType === 'vitalicio' && 'Vitalício'}
                                {user.planType === 'assinatura_mensal' && 'Mensal'}
                                {user.planType === 'assinatura_anual' && 'Anual'}
                                {user.planType === 'cancelado' && (
                                    <span style={{ color: 'red', fontWeight: 'bold' }}>Cancelado</span>
                                )}
                            </TableCell>
                            <TableCell>
                                {user.subscriptionValidUntil
                                    ? new Date(user.subscriptionValidUntil).toLocaleDateString()
                                    : 'N/A'}
                            </TableCell>
                            <TableCell>
                                {user.planType !== 'cancelado' ? (
                                    <>
                                        <Button onClick={() => handleRenew(user._id)}>Renovar</Button>{' '}
                                        <Button onClick={() => handleCancelAccess(user._id)} danger>
                                            Cancelar Acesso
                                        </Button>
                                    </>
                                ) : (
                                    <em>Acesso cancelado</em>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
