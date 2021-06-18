import AddItem from "./components/AddItem";
import ListItems from "./components/ListItems";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import { useContext } from "react";
import { ListContext } from "./contexts/ListContext";

export default function App() {

  const { activePage } = useContext(ListContext);
  const homeIsActive = activePage === "home" ? 'border-b-2' : '';
  const addIsActive = activePage === "add" ? 'border-b-2' : '';
  return (
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
          </ul>
        </nav>

        <Switch>
          <Route path="/add">
            <AddItem />
          </Route>
          <Route path="/list">
            <h1 className="text-xl my-3 text-center">List Items</h1>
            <ListItems />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
