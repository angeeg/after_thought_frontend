
import '../App.css'

function LoginForm(props) {
    return (
      <div className='login-form'>
        <form onSubmit={props.login}>
          {/* <label htmlFor="name">Username</label>
          <input type="text" id="name" name="username"/> */}
          
          <label htmlFor="name">Email</label>
          <input type="text" id="email" name="email"/>
          <br/>
          

          <label htmlFor="name">Password</label>
          <input type="text" id="password" name="password"/>
          
          <br/>
          <input type="submit" value="Login" />
      </form>
      </div>
    )
}

export default LoginForm
