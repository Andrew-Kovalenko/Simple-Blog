import {useRouter} from "next/router";
import {MainLayout} from "../../components/MainLayout";
import React, {useState, useEffect} from "react";
import {NextPageContext} from "next";
import {MyPost} from "../../interfaces/post";
import Comments from '../comments'
import styled from 'styled-components'
import Link from "next/link";

const PostContainer = styled.div`
  border: 2px solid black;
  padding: 1rem;
  box-shadow: 2px 4px 10px black;
`

interface PostPageProps {
  post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {
  const [post, setPost] = useState(serverPost)

  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.ARI_URL}/posts/${router.query.postId}`)
      const data = await response.json()

      setPost(data)
    }

    if (!serverPost) {
      load()
    }
  }, [])

  if (!post) {
    return(
      <MainLayout title=''>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Post'}>
      <PostContainer>
        <h2>{post.title}</h2>
        <hr />
        <p>{post.body}</p>
        <Link href={'/'}><a>Back to all latest posts</a></Link>
        <Comments />
      </PostContainer>

    </MainLayout>
  )
}

interface PostNextPageContext extends NextPageContext {
  query: {
    postId: string
  }
}

Post.getInitialProps = async ({query, req}: PostNextPageContext) => {
  if (!req) {
    return {post: null}
  }

  const response = await fetch(`${process.env.ARI_URL}/posts/${query.postId}`)
  const post: MyPost = await response.json()

  return {
    post
  }
}
