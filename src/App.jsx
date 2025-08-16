import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (ex) {
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (e) => {
    e.preventDefault()
    setTitle('')
    setAuthor('')
    setUrl('')
    try {
      const blog = { title, author, url }
      await blogService.create(blog)
      setMessage(`Added ${title} from ${author}`)
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

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    }
    )
  }, [addBlog])

  if (!user) {
    return <form onSubmit={handleSubmit}>
      <Notification message={message} />
      <h2>log in</h2>
      <div>
        username
        <input
          value={username}
          type="text"
          name="username"
          required
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          value={password}
          type="password"
          name="password"
          required
          onChange={({ target }) => setPassword(target.value)}
        />

      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
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
        <form onSubmit={addBlog}>
          <div>
            title:
            <input
              value={title}
              type="text"
              name="title"
              required
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              value={author}
              type="text"
              name="author"
              required
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              value={url}
              type="text"
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">add blog</button>
        </form>
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
