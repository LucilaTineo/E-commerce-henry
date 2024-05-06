'use client';
import React from 'react';
import styled from 'styled-components';


const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;
`;


const Footer = () => {
  return (
    <FooterContainer>
      <p>mi footer</p>
      <p>© 2024 Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;

