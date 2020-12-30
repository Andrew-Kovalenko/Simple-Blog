import {MainLayout} from "../components/MainLayout";
import React, {useEffect, useState} from "react";
import {useRouter} from 'next/router'
import Link from "next/link";
import {MyPost} from '../interfaces/post'
import {useDispatch, useSelector} from 'react-redux'
import {fetchPosts} from '../redux/actions/postAction'
import styled from 'styled-components'

const PostBlockContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const PostBlock = styled.div`
  width: 45%;
  background: lightgray;
  padding: 10px 20px;
  align-item: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid black;
  margin: 20px 0;
  box-sizing: border-box;
  box-shadow: 2px 4px 10px black;


  .post-title:after {
    background: black;
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    bottom: 5px;
    left: 0;
  }

  p {
    color: gray;
  }
`;

interface PostsPageProps {
  posts: MyPost[]
}


export default function Index({ posts: serverPosts }: PostsPageProps) {
  const [posts, setPosts] = useState(serverPosts)
  const router = useRouter()

  const dispatch = useDispatch()
  const fetchedPosts = useSelector(state => state.posts.posts)

  useEffect(() => {
    dispatch(fetchPosts())

    async function load() {
      const response = await fetch(`${process.env.ARI_URL}/posts`)
      const data = await response.json()

      setPosts(data)
      dispatch(fetchPosts())
    }
    if (!serverPosts) {
      load()
    }
  },[])

  if (!posts) {
    return(
      <MainLayout title=''>
        <p>Loading...</p>
      </MainLayout>
    )
  }

    return (
      <MainLayout title={'Create new post'} >
        <h2>Latest Posts Page</h2>

        <PostBlockContainer>
          {fetchedPosts.map(post => {
            if (post.title) {
              return (
                <Link href={'post/[id]'} as={`post/${post.id}`} key={post.id}>
                <PostBlock >
                  <h3 className="post-title">{post.title}</h3>
                  <p>{post.body}</p>
                </PostBlock>
                </Link>
              )
            }
          })}
        </PostBlockContainer>
      </MainLayout>
    )
  }
