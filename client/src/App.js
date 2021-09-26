import {Route,Switch} from 'react-router-dom'
import SignIn from './components/SignIn/SignIn.component';
import SignUp from './components/SignUp/SignUp.component';
import Home from './components/Home/Home.component';
import UsersDashboardComponent from './components/UsersDashboard/UsersDashboard.component';
import Navbar from './components/NavBar/NavBar.component';
import './App.scss'


function App() {
  return (
    <div className="App">
       <Navbar></Navbar>
      <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/all_users' component={UsersDashboardComponent}></Route>
          <Route exact path='/signin' component={SignIn}></Route>
          <Route exact path='/signup' component={SignUp}></Route>
      </Switch>
    </div>
  );
}

export default App;
