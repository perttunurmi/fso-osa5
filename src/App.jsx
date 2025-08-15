import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      alert('wrong credentials')
      setTimeout(() => {
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
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  if (!user) {
    return <form onSubmit={handleSubmit}>
      <h2>log in</h2>
      <div>
        username
        <input
          value={username}
          type="text"
          required
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>

      <div>
        password
        <input
          value={password}
          type="password"
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
        <h2>blogs</h2>
        <div>
          logged in as {user.username}
          <button onClick={() => { window.localStorage.removeItem('loggedBlogappUser'); setUser(null) }}> logout </button>
        </div>
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
