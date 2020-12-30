import React, {useState} from "react";
import Router from 'next/router'
import {MainLayout} from "../components/MainLayout";
import {useDispatch} from 'react-redux'
import {createPost} from "../redux/actions/postAction";
import styled from 'styled-components'

const Form = styled.form`
width: 75%;
padding: 2rem;
background: rgb(51%, 51%, 51%, 0.3);
box-shadow: 2px 4px 10px gray;
display: flex;
flex-direction: column;
margin: 0 auto;

.form-item_container {
  width: 90%
  display: flex;
}
`
const FormItem = styled.div`
width: 45%;
margin: 0 auto;

input {
  width: 90%;
  margin: 0 auto;
}
`

const Button = styled.button`
width: 20%;
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
`

export default function New() {
  const [post, setPost] = useState({ title: '', body: ''})


  const dispatch = useDispatch()

  const goHomeHandler = () => {
    Router.push('/')
  }

  const handleChange = (event) => {
    setPost({...post, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    dispatch(createPost(post))
    setPost({...post, title: '', body: ''})
  }

  return (
    <MainLayout title={'Create new post'} >
        <h2>CreatePost Page</h2>

        <Form onSubmit={handleSubmit}>
          <div className="form-item_container">
            <FormItem>
              <p>Please enter title of post</p>
              <input type="text" name="title" value={post.title} onChange={handleChange} />
            </FormItem>

            <FormItem>
              <p>Please enter text of post</p>
              <input type="text" name="body" value={post.body} onChange={handleChange}/>
            </FormItem>
          </div>

          <Button type="submit" >Create new Post</Button>
        </Form>
    </MainLayout>
  )
}