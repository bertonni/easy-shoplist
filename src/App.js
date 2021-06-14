import AddItem from "./components/AddItem";
import ListItems from "./components/ListItems";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  Route,
} from 'react-router-dom';
import { ListProvider } from "./contexts/ListContext";

export default function App() {
  return (
    <Router>
      <ListProvider>

        <div>
          <nav>
            <ul className="flex items-center py-2 justify-center gap-4">
              <li>
                <Link className="font-semibold" to="/">Home</Link>
              </li>
              <li>
                <Link className="font-semibold" to="/add">Add Item</Link>
              </li>
              <li>
                <Link className="font-semibold" to="/list">List Items</Link>
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
      </ListProvider>
    </Router>
  );
}
