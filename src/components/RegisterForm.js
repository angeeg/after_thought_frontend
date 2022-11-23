function RegisterForm(props) {
  return (
    <form onSubmit={props.register}>
      <strong>REGISTER </strong> 
      <label htmlFor="name">Username</label>
      <input id="username" type="text" name="username" />
      <label htmlFor="email">Email</label>
      <input id="email" type="text" name="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type="text" name="password" />
      <input value="Register" type="submit" />
    </form>
  );
}

export default RegisterForm;
