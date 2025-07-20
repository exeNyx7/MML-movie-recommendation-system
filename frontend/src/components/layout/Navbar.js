import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaFilm, FaSearch, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e2e8f0;
  z-index: 1000;
  padding: 0 1rem;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #667eea;
  font-size: 1.5rem;
  font-weight: 700;
  
  svg {
    margin-right: 0.5rem;
    font-size: 2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative;

  &:hover {
    color: #667eea;
  }

  &.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &.btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  &.btn-secondary {
    background: transparent;
    color: #475569;
    border: 1px solid #e2e8f0;
  }

  &:hover {
    transform: translateY(-1px);
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1001;
  overflow: hidden;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: #475569;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f5f9;
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: none;
  background: none;
  color: #ef4444;
  cursor: pointer;
  width: 100%;
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #fef2f2;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #475569;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e2e8f0;
  padding: 1rem;
  transform: translateY(${props => props.isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease;
  z-index: 999;

  @media (min-width: 769px) {
    display: none;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  padding: 0.75rem 0;
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`;

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">
          <FaFilm />
          MML
        </Logo>

        <NavLinks>
          <NavLink to="/" className={isActive('/') ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/movies" className={isActive('/movies') ? 'active' : ''}>
            Movies
          </NavLink>
          {user && (
            <>
              <NavLink to="/wishlist" className={isActive('/wishlist') ? 'active' : ''}>
                Wishlist
              </NavLink>
              {isAdmin && (
                <NavLink to="/admin" className={isActive('/admin') ? 'active' : ''}>
                  Admin
                </NavLink>
              )}
            </>
          )}
        </NavLinks>

        {user ? (
          <UserMenu onClick={() => setShowDropdown(!showDropdown)}>
            <UserAvatar>
              {user.username?.charAt(0).toUpperCase()}
            </UserAvatar>
            <span>{user.username}</span>
            {showDropdown && (
              <DropdownMenu>
                <DropdownItem to="/profile">
                  <FaUser />
                  Profile
                </DropdownItem>
                <DropdownItem to="/wishlist">
                  <FaFilm />
                  Wishlist
                </DropdownItem>
                {isAdmin && (
                  <DropdownItem to="/admin">
                    <FaUser />
                    Admin Dashboard
                  </DropdownItem>
                )}
                <LogoutButton onClick={handleLogout}>
                  <FaSignOutAlt />
                  Logout
                </LogoutButton>
              </DropdownMenu>
            )}
          </UserMenu>
        ) : (
          <AuthButtons>
            <Button as={Link} to="/login" className="btn-secondary">
              Login
            </Button>
            <Button as={Link} to="/register" className="btn-primary">
              Register
            </Button>
          </AuthButtons>
        )}

        <MobileMenuButton onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </NavContainer>

      <MobileMenu isOpen={showMobileMenu}>
        <MobileNavLink to="/" onClick={() => setShowMobileMenu(false)}>
          Home
        </MobileNavLink>
        <MobileNavLink to="/movies" onClick={() => setShowMobileMenu(false)}>
          Movies
        </MobileNavLink>
        {user && (
          <>
            <MobileNavLink to="/wishlist" onClick={() => setShowMobileMenu(false)}>
              Wishlist
            </MobileNavLink>
            <MobileNavLink to="/profile" onClick={() => setShowMobileMenu(false)}>
              Profile
            </MobileNavLink>
            {isAdmin && (
              <MobileNavLink to="/admin" onClick={() => setShowMobileMenu(false)}>
                Admin Dashboard
              </MobileNavLink>
            )}
            <MobileNavLink as="button" onClick={handleLogout}>
              Logout
            </MobileNavLink>
          </>
        )}
        {!user && (
          <>
            <MobileNavLink to="/login" onClick={() => setShowMobileMenu(false)}>
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={() => setShowMobileMenu(false)}>
              Register
            </MobileNavLink>
          </>
        )}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 