import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Blogform from './components/Blogform'
import Loginform from './components/Loginform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((newBlogs) => {
      setBlogs(newBlogs)
    }
    )
  }, [])

  const Notification = ({ message }) => {
    if (!message) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObj)
      setBlogs(blogs.concat(newBlog))
      setMessage(`Added ${blogObj.title} from ${blogObj.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (ex) {
      setMessage('Error while adding the blog')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginUser = async (userObj) => {
    try {
      const user = await loginService.login(userObj)
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (ex) {
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  if (!user) {
    return (
      <Loginform loginUser={loginUser}>
        <Notification message={message} />
      </Loginform>
    )
  } else {
    return (
      <div>
        <Notification message={message} />
        <h2>blogs</h2>
        <div>
          logged in as {user.username}
          <button onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser');
            setUser(null)
          }}
          > logout </button>
        </div>
        <br />
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
          <Blogform createBlog={addBlog} />
        </Togglable>
        <br />
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    )
  }
}

export default App
