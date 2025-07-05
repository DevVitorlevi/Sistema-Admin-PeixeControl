import React, { useState } from 'react';
import api from '../../services/api';
import { Container, Form, Input, Button, Title } from './styles';
import { useNavigate } from 'react-router-dom';

export default function RegisterAdmin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleRegisterAdmin(e) {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            await api.post('/auth/register-admin', { name, email, password }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Administrador cadastrado com sucesso!');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao cadastrar administrador.');
        }
    }

    return (
        <Container>
            <Form onSubmit={handleRegisterAdmin}>
                <Title>Cadastrar Administrador</Title>
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
                <Button type="submit">Cadastrar</Button>
            </Form>
        </Container>
    );
}
