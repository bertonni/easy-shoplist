import AddItem from "./components/AddItem";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import { useList } from "./hooks/useList";
import { useAuth } from "./hooks/useAuth";
import SignIn from "./components/SignIn";

export default function App() {

  const { activePage } = useList();
  const { loggedUser, signOut } = useAuth();
  const homeIsActive = activePage === "home" ? 'border-b-2' : '';
  const addIsActive = activePage === "add" ? 'border-b-2' : '';

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      {loggedUser ?
      <Router>
        <div>
          <nav>
            <ul className="flex items-center py-4 justify-center gap-4">
              <li>
                <Link
                  className={`${homeIsActive} py-1 px-2 font-medium text-lg border-gray-500 text-gray-700`}
                  to="/"
                  >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  className={`${addIsActive} py-1 px-2 font-medium text-lg border-gray-500 text-gray-700`}
                  to="/add"
                  >
                  Adicionar Item
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleSignOut()}
                  className={`focus:outline-none py-1 px-2 font-medium text-lg border-gray-500 text-gray-700`}
                >
                  Sair
                </button>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/add">
              <AddItem />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      :
      <SignIn />
      }
    </>
    );
  }