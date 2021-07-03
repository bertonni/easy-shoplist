import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function SignIn() {

  const { signInWithEmail, registerUser } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [error, setError] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(email.trim() === '' || password.trim() === '') {
      setError('Todos os campos devem ser preenchidos');
      return;
    }
    if (isSignIn) signInWithEmail(email, password);
    if (!isSignIn) registerUser(email, password);
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-11/12 flex flex-col border rounded p-3">
        <h1 className="text-3xl text-center my-2 text-gray-700">{isSignIn ? 'Entrar' : 'Registrar'}</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">E-mail:</label>
              <input type="email"
                name="email"
                placeholder="josepaz@gmail.com"
                autoComplete="off"
                className="rounded px-2 border h-10 w-full mt-1"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm text-gray-500">Senha:</label>
              <input type="password"
                name="password"
                placeholder="*********"
                className="rounded px-2 border h-10 w-full mt-1"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button
              type="submit"
              className="rounded focus:outline-none border border-gray-500 text-gray-700 px-4 py-2"
            >
              {isSignIn ? 'Entrar' : 'Registrar'}
            </button>
          </div>
        </form>
        {isSignIn ?
          <span className="text-sm text-gray-700 mt-2 text-center">Não tem uma conta? 
            <button
              onClick={() => { setIsSignIn(false); setError(null); }}
              className="text-blue-500 font-medium ml-1 focus:outline-none hover:underline"
              > Cadastre-se</button>
          </span>
          :
          <span className="text-sm text-gray-700 mt-2 text-center">Já tem uma conta?
            <button
              onClick={() => { setIsSignIn(true); setError(null); }}
              className="text-blue-500 font-medium ml-1 focus:outline-none hover:underline"
            > Entre</button>
          </span>
        }
        {error &&
          <div className="mt-3 px-8 py-3 border rounded border-red-700 bg-red-300">
            <p className="text-sm text-red-700 m-auto text-center">{error}</p>
          </div>
        }
      </div>
    </div>
  )
}
