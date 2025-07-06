import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  color: #188cf8;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

// ✅ Correção do botão
export const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'danger'
})`
  padding: 12px 24px;
  background-color: ${({ danger }) => (danger ? '#d9534f' : '#188cf8')};
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;

  &:hover {
    background-color: ${({ danger }) => (danger ? '#c9302c' : '#0e6cd1')};
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #188cf8;
  color: white;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
`;
