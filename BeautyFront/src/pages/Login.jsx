import LoginForm from "../components/LoginForm";
function Login({ setUpdate, setError, error, update }) {
  return (
    <>
      <LoginForm
        setUpdate={setUpdate}
        setError={setError}
        error={error}
        update={update}
      />
    </>
  );
}

export default Login;
