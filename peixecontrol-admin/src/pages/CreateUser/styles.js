import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

export const Title = styled.h1`
  margin-bottom: 24px;
  text-align: center;
  color: #188cf8;
`;

export const Input = styled.input`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  margin-bottom: 16px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  padding: 12px;
  background-color: #188cf8;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background-color: #0e6cd1;
  }
`;
