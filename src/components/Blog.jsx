import { useState } from "react"

const Blog = ({ blog }) => {
  const [showExtra, setShowExtra] = useState(false)

  const toggleExtra = () => {
    if (showExtra) {
      setShowExtra(false)
    } else {
      setShowExtra(true)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!showExtra) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleExtra}> show </button>
      </div >
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleExtra}> hide </button>
        </div>
        <div>
          url: {blog.url || ""}
        </div>
        <div>
          likes: {blog.likes || 0} <button> likes </button>
        </div>
        <div>
          {blog.user.name || ""}
        </div>
      </div >
    )
  }

}

export default Blog
