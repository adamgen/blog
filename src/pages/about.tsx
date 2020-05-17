import * as React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from '@emotion/styled';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';

const Avatar = styled.img`
  max-width: 100px;
  float: left;
  margin-right: 10px;
  border-radius: 50%;
`;

const PageTwo = () => {
  const query = graphql`
    query AuthorQuery {
      file(relativePath: { eq: "author-picture-adam.jpg" }) {
        publicURL
      }
    }
  `;
  const authorUrl = useStaticQuery(query).file.publicURL;

  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>About JScripture</h1>
          <p>We're a secret society of people, working together to dispel all dark magic from JavaScript.</p>
          <p>
            We make content in the form of tutorials, in depth articles and videos. And in the form of a magical kudos to other great JS
            sources.
          </p>
          <p>
            Our source is stored on <a href="https://github.com/adamgen/blog">github</a>.
          </p>

          <h2>The Arch-Mage</h2>
          <Avatar src={authorUrl} alt="" />
          <p>Hi, I'm Adam, I started this project as a single repository to document my work and progress in a fun way.</p>
          <p>
            I've been working with JS since 2014, and I got a few opportunities to work in companies that are industry leaders in their
            fields.
          </p>
          <p>During this time I both saw how big projects are done right, and how to approach the development process.</p>
        </Container>
      </Page>
    </IndexLayout>
  );
};

export default PageTwo;
