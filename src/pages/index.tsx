import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';

const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
            layout
          }
          frontmatter {
            title
            layout
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  const data = useStaticQuery<{ allMarkdownRemark: { edges: { node: { fields: { slug: string }; frontmatter: { title: string } } }[] } }>(
    query
  );

  const posts = data.allMarkdownRemark.edges;
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>Hi people</h1>
          <p>Here are my latest posts</p>

          <ul>
            {posts.map(post => (
              <li key={post.node.fields.slug}>
                <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </Page>
    </IndexLayout>
  );
};

export default IndexPage;
