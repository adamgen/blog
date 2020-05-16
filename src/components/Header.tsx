import * as React from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { colors, dimensions, heights } from '../styles/variables';
import Container from './Container';
import { brandShadow } from '../styles/mixins';

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.brand};
  background: linear-gradient(90deg, ${colors.brand} 0%, #646297 100%);
  color: ${transparentize(0.5, colors.white)};
  box-shadow: ${brandShadow};
`;

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
`;

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 0;
  //margin-right: 60px;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const Logo = styled.img`
  height: 60px;
  color: #fff;
`;

const Menu = styled.div``;

const MenuItem = styled(Link)`
  color: #fff;
  margin-left: 30px;
  font-family: 'Quattrocento', serif;
  font-size: 20px;
`;

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = () => {
  const query = graphql`
    query LogoQuery {
      file(relativePath: { eq: "logo.svg" }) {
        publicURL
      }
    }
  `;
  const logoUrl = useStaticQuery(query).file.publicURL;

  return (
    <StyledHeader>
      <HeaderInner>
        <HomepageLink to="/">
          <Logo src={logoUrl} alt="" />
        </HomepageLink>

        <Menu>
          <MenuItem to="/about">About</MenuItem>
          <MenuItem to="/about">React</MenuItem>
          <MenuItem to="/about">Angular</MenuItem>
        </Menu>
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;
