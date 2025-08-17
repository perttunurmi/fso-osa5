import { useState } from "react"
import blogs from "../services/blogs"

const Blog = ({ blog: initialBlog, user, handleDelete }) => {
  const [showExtra, setShowExtra] = useState(false)
  const [blog, setBlog] = useState(initialBlog)

  const toggleExtra = () => {
    if (showExtra) {
      setShowExtra(false)
    } else {
      setShowExtra(true)
    }
  }

  const addLike = async () => {
    initialBlog.likes++
    const response = await blogs.update(initialBlog)
    response.likes++
    setBlog(response)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  console.log(blog)
  console.log(initialBlog)

  if (!showExtra) {
    return (
      <div style={blogStyle}>
        {blog.title} {initialBlog.author} <button onClick={toggleExtra}> show </button>
      </div >
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {initialBlog.title} {initialBlog.author} <button onClick={toggleExtra}> hide </button>
        </div>
        <div>
          url: {initialBlog.url || ""}
        </div>
        <div>
          likes: {blog.likes || 0} <button onClick={addLike}> likes </button>
        </div>
        <div>
          {initialBlog.user.username || ""}
        </div>
        <div>
          {user.username === initialBlog.user.username && <button onClick={() => {
            window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
              ? handleDelete(blog)
              : null
          }
          }> remove </button>}
        </div>
      </div >
    )
  }

}

export default Blog
