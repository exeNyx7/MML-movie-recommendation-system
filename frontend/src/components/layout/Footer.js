import React from 'react';
import styled from 'styled-components';
import { FaFilm, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #f8fafc;
  }

  p {
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: white;
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 0.5rem;
    font-size: 2rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  text-align: center;
  color: #cbd5e1;
  font-size: 0.875rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo>
              <FaFilm />
              My Movie List
            </Logo>
            <p>
              Your personal movie discovery platform. Find, rate, and organize your favorite films.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="GitHub">
                <FaGithub />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Features</h3>
            <ul>
              <li><a href="/movies">Browse Movies</a></li>
              <li><a href="/recommendations">Get Recommendations</a></li>
              <li><a href="/wishlist">Create Wishlist</a></li>
              <li><a href="/reviews">Write Reviews</a></li>
              <li><a href="/profile">Manage Profile</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Categories</h3>
            <ul>
              <li><a href="/movies?genre=action">Action</a></li>
              <li><a href="/movies?genre=comedy">Comedy</a></li>
              <li><a href="/movies?genre=drama">Drama</a></li>
              <li><a href="/movies?genre=horror">Horror</a></li>
              <li><a href="/movies?genre=sci-fi">Sci-Fi</a></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/about">About MML</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; 2024 My Movie List (MML). All rights reserved.</p>
          <p>Made with ❤️ for movie enthusiasts</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 