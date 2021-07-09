import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useList } from '../hooks/useList';

export default function SignIn() {

  const { signInWithEmail, registerUser, error, setError, loggedUser } = useAuth();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errors, setErrors] = useState(null);

  const { handleActivePage } = useList();

  useEffect(() => {
    handleActivePage('signin');
  }, [handleActivePage]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    const keepSession = e.target.remember.checked ?? false;

    if (email.trim() === '' || password.trim() === '') {
      setErrors('Todos os campos devem ser preenchidos');
      return;
    }
    if (isSignIn) await signInWithEmail(email, password, keepSession);
    if (!isSignIn) await registerUser(email, password);
  }

  if (loggedUser) return <Redirect to="/" />

  return (
    <div className="mt-20 w-screen flex items-center justify-center">
      <div className="w-11/12 sm:w-9/12 md:w-6/12 flex flex-col border rounded p-3">
        <h1 className="text-3xl text-center my-2 text-gray-700">{isSignIn ? 'Entrar' : 'Registrar'}</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <label className="text-sm text-gray-500">E-mail:</label>
              <input type="email"
                name="email"
                placeholder="josealberto@gmail.com"
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
            {isSignIn &&
              <div>
                <label className="flex gap-2 items-center text-sm text-gray-500">
                  <input type="checkbox"
                    name="remember"
                    className="rounded px-2 border"
                  />
                  Manter login
                </label>
              </div>
            }
          </div>
          <div className="flex items-center justify-center gap-4 mt-3">
            <button
              type="submit"
              className="rounded focus:outline-none border border-gray-500 text-gray-700 px-4 py-1"
            >
              {isSignIn ? 'Entrar' : 'Registrar'}
            </button>
          </div>
        </form>
        {isSignIn ?
          <span className="text-sm text-gray-700 mt-2 text-center">Não tem uma conta?
            <button
              onClick={() => { setIsSignIn(false); setErrors(null); setError(null); }}
              className="text-blue-500 font-medium ml-1 focus:outline-none hover:underline"
            > Cadastre-se</button>
          </span>
          :
          <span className="text-sm text-gray-700 mt-2 text-center">Já tem uma conta?
            <button
              onClick={() => { setIsSignIn(true); setErrors(null); setError(null); }}
              className="text-blue-500 font-medium ml-1 focus:outline-none hover:underline"
            > Entre</button>
          </span>
        }
        {errors &&
          <div className="mt-3 px-8 py-3 border rounded border-red-700 bg-red-300">
            <p className="text-sm text-red-700 m-auto text-center">{errors}</p>
          </div>
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
