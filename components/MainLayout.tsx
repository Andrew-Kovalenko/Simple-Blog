import Link from "next/link";
import Head from "next/head";
import styled from 'styled-components'

const Wrapper = styled.div`

  width: 80%;
  margin: 0 auto;
`;

const WrapperBody = styled(Wrapper) `
  margin-top: 60px;
  padding: 1rem 0;
`;

const Heading = styled.div`
  position: fixed;
  height: 60px;
  left: 0;
  right: 0;
  top: 0;
  background: darkblue;
  display: flex;
  align-items: center;
`;

const NavItem = styled.div`
  display: inline-block;

  a {
    color: #fff;
    text-decoration: none;
    padding-right: 15px 
  }
`;

export function MainLayout({children, title}) {
  const titleText = title ? `Blog | ${title}` : 'Blog'

  return (
    <>
      <Head>
        <title>{titleText}</title>
        <meta name="keywords" content="next, react, redux, typescript, ssr" />
        <meta name="description" content="Simple of blog were you can see posts, commented they and create new one" />
        <meta charSet="utf-8" />
      </Head>

      <Heading>
        <Wrapper>
            <NavItem>
              <Link href={'/'}><a>Latest Posts</a></Link>
            </NavItem>
            <NavItem>
              <Link href={'/new'}><a>Create new Post</a></Link>
            </NavItem>
        </Wrapper>
      </Heading>

      <main>
        <WrapperBody>
          {children}
        </WrapperBody>
      </main>
    </>
  )
}