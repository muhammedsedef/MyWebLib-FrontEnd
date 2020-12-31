// TODO 
// self profile --düzenle
// follow butonu --style düzenle, bildirim koy
// routeları protected yap
// search modülü hazırla


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Landing from './components/Landing'
import Login from './components/Login'
import Entry from './components/Entry'
import UserInfo from './components/UserInfo'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import SelfProfile from './components/SelfProfile'
import Button from './components/Button'
import Search from './components/Search'
import SearchResult from './components/SearchResult'
import AddContent from './components/AddContent'
import SelfUserInfo from './components/SelfUserInfo'
import { ToastProvider } from "react-toast-notifications";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Landing}/>
        <Route path="/login" exact component={Login}/>
        <Route path="/lib">
          <Navbar/>
          <Route path="/lib/home" exact component={Home}/>
          <Route path="/lib/profile" exact component={SelfProfile}/>
          <Route path="/lib/profile/:id" exact component={Profile}/>
          <Route path="/lib/userinfo" exact component={UserInfo}/>
          <Route path="/lib/search/:query" exact component={Search}/>
        </Route>
        <Route path="/test">
          <Route path="/test/addcontent" component={AddContent} />
          <Route path="/test/self" component={SelfUserInfo}/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
