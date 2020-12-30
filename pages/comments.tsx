import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from 'react-redux'
import {createComment, getComments} from '../redux/actions/commentsAction'
import {MainLayout} from "../components/MainLayout";
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-top: 2rem;
  background: lightgray;
  padding: 1rem;
  box-shadow: 2px 4px 10px gray;
`;

const CommentContainer = styled.div`
  display: flex;
  align-item: center;
  flex-direction: column;
`
const Comment = styled.div`
  border: 2px solid gray;
  background: white;
  padding: 1rem;
  margin-bottom: 1rem;

  textarea {
    width: 80%;
    height: 75px;
  }

  button {
    width: 80%;
    height: 75px;
    width: 20%;
    margin: 30px auto 0;
    height: 30px;
    border: 2px solid darkblue;
    color: white;
    background: darkblue;
    cursor: pointer;
  }
    button:hover {
      color: darkblue;
      background: white;
    }
`

const TextArea = styled.textarea`
  width: 80%;
  height: 75px;
`;

const Button = styled.button`
  width: 15%;
  margin: 30px auto 0;
  height: 30px;
  border: 2px solid darkblue;
  color: white;
  background: darkblue;
  cursor: pointer;

  &:hover {
    color: darkblue;
    background: white;
  }
`;

const AddCommentContainer = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  padding: 1rem;
`

export default function Comments({comments: serverComments}) {
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()
  const [localComments, setLocalComments] = useState()
  const {comments} = useSelector(state => state.comments)
  const router = useRouter()
  const currentPostId = router.query.postId

  const onChangeCommentHandler = (event) => {
    setCommentText(event.target.value)
  }

  const sendCommentHandler = () => {
    dispatch(createComment({postId: currentPostId, body: commentText}))
    setCommentText('')
    setLocalComments(null)
    dispatch(getComments())
    setLocalComments(comments)
  }

  useEffect(() => {
    dispatch(getComments())
    setLocalComments(comments)
  }, [])

  if (!localComments) {
    return(
      <MainLayout title=''>
        <p>Loading...</p>
      </MainLayout>
    )
  }

  return (
    <>
    <Wrapper>
      <h3>Comments: </h3>
      <CommentContainer>
      
        <AddCommentContainer>
          <TextArea onChange={onChangeCommentHandler} value={commentText} name="" id="" />
          <Button onClick={sendCommentHandler}>Add comment</Button>
        </AddCommentContainer>

        {comments && comments.map(comment => {
          if (comment && comment.postId === currentPostId) {

            return (
              <Comment key={comment.id}>
                <div >
                  <h3>Comment id: {comment.id}</h3>
                  <hr />
                  <p>{comment.body}</p>
                </div>
              </Comment>
            )
          }
        })}
      </CommentContainer>
    </Wrapper>
    </>
  )
}

