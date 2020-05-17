import * as React from 'react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';
import { graphql, Link, useStaticQuery } from 'gatsby';

import { colors, dimensions, heights } from '../styles/variables';
import Container from './Container';
import { brandShadow } from '../styles/mixins';
import { aboveMobile, belowMobile } from '../styles/breakpoints';

const StyledHeader = styled.header`
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
  flex-wrap: wrap;
  ${belowMobile} {
    justify-content: center;
  }
`;

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 0;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`;

const Logo = styled.img`
  height: ${heights.header}px;
  color: #fff;
`;

const MenuItem = styled(Link)`
  color: #fff;
  font-family: 'Quattrocento', serif;
  font-size: 20px;
  padding: 0px 10px;
`;

const Menu = styled.div`
  margin-top: 5px;
  ${aboveMobile} {
    ${MenuItem} {
      margin-left: 30px;
    }
  }
  ${belowMobile} {
    display: flex;
    align-content: space-between;
    flex-grow: 1;
    ${MenuItem} {
      margin: auto;
    }
  }
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
          {/* <MenuItem to="/react">React</MenuItem> */}
          {/* <MenuItem to="/angular">Angular</MenuItem> */}
        </Menu>
      </HeaderInner>
    </StyledHeader>
  );
};

export default Header;
