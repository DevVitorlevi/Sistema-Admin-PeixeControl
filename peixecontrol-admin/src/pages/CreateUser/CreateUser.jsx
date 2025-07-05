import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Form, Input, Select, Button, Title } from './styles';
import { useNavigate } from 'react-router-dom';

export default function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [planType, setPlanType] = useState('assinatura');
    const navigate = useNavigate();

    async function handleCreateUser(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await api.post('/auth/register', { name, email, password, planType }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Usuário criado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao criar usuário.');
        }
    }

    return (
        <Container>
            <Form onSubmit={handleCreateUser}>
                <Title>Criar Novo Usuário</Title>
                <Input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Select value={planType} onChange={(e) => setPlanType(e.target.value)}>
                    <option value="assinatura">Assinatura Mensal</option>
                    <option value="vitalicio">Vitalício</option>
                </Select>
                <Button type="submit">Criar Usuário</Button>
            </Form>
        </Container>
    );
}
