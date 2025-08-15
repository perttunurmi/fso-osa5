const Login = ({ }) => (
  <form onSubmit={""}>
    <div>
      <label for="username">username</label>
      <input id="username" type="text" required />
    </div>
    <div>
      <label for="password">password</label>
      <input id="password" type="text" required />
    </div>
    <div>
      <button type="submit">login</button>
    </div>
  </form>
)

export default Login
