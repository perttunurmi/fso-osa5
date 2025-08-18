import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {

  const blog = {
    title: 'Testi',
    author: 'Testaaja',
    user: {
      username: 'root',
      id: '123123'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Testi Testaaja')
  expect(element).toBeDefined()

  const user = screen.queryByText('root')
  expect(user).toBeNull()

  const url = screen.queryByText('url')
  expect(url).toBeNull()

  const likes = screen.queryByText('likes')
  expect(likes).toBeNull()

})
