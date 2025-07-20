import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFilm, FaHome } from 'react-icons/fa';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const NotFoundCard = styled.div`
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const Icon = styled.div`
  font-size: 6rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const ErrorCode = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
  }
`;

const NotFound = () => {
  return (
    <Container>
      <NotFoundCard>
        <Icon>
          <FaFilm />
        </Icon>
        <ErrorCode>404</ErrorCode>
        <Title>Page Not Found</Title>
        <Description>
          Oops! The page you're looking for doesn't exist.
          It might have been moved or deleted.
        </Description>
        <HomeButton to="/">
          <FaHome />
          Go Home
        </HomeButton>
      </NotFoundCard>
    </Container>
  );
};

export default NotFound; 