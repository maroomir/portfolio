import styled from '@emotion/styled';

const Button = styled.button`
  padding: 0.8em 1.5em;
  border-radius: 25px;
  border: 2px solid white;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default Button;
