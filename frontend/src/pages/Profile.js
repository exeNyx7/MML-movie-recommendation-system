import React from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';

const Container = styled.div`
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const ComingSoonCard = styled.div`
  text-align: center;
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
`;

const Icon = styled.div`
  font-size: 4rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  color: #64748b;
  font-size: 1.125rem;
  line-height: 1.6;
`;

const Profile = () => {
  return (
    <Container>
      <ComingSoonCard>
        <Icon>
          <FaUser />
        </Icon>
        <Title>Profile Page</Title>
        <Description>
          This page will allow users to manage their profile, preferences, and account settings.
        </Description>
      </ComingSoonCard>
    </Container>
  );
};

export default Profile; 