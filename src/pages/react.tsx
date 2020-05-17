import * as React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';

import Page from '../components/Page';
import Container from '../components/Container';
import IndexLayout from '../layouts';

const query = graphql`
  query ReactPageQuery {
    allMarkdownRemark(filter: { frontmatter: { tags: { regex: "/react/" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

interface ReactPageQueryProps {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: string;
        };
        frontmatter: {
          title: string;
        };
      };
    }[];
  };
}

const ReactPage = () => {
  const data = useStaticQuery<ReactPageQueryProps>(query);

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

export default ReactPage;
