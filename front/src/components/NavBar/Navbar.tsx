'use client';
import {useState} from 'react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background-color: #212B38;
  color: #00EED0;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


const MenuIcon = styled.div`
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block; 
  }
`;

type MenuListProps = {
  open: boolean;
};

const MenuList = styled.ul<MenuListProps>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    background-color: #212b38;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    display: ${props => props.open ? 'flex' : 'none'};
  }
`;

const MenuItem = styled.li`
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <NavbarContainer>
      <MenuIcon onClick={toggleMenu}>☰</MenuIcon>
      <MenuList open={menuOpen}>
        <MenuItem>Inicio</MenuItem>
        <MenuItem>Productos</MenuItem>
        <MenuItem>Contacto</MenuItem>
      </MenuList>
    </NavbarContainer>
  );
};

export default Navbar;