import React, { useState } from 'react';
import { Container, Form, Input, Button, Title } from './styles';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            alert(error.response?.data?.message || 'Erro ao fazer login.');
        }
    }

    return (
        <Container>
            <Form onSubmit={handleLogin}>
                <Title>Admin PeixeControl</Title>
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
                <Button type="submit">Entrar</Button>
            </Form>
        </Container>
    );
}
