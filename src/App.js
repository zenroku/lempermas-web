import React, { useEffect, useContext } from 'react';
import './App.css';
import Landing from './pages/Landing';
import Menu from './pages/Menu'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ScrollToTop from './functions/ScrollToTop'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme/theme'
import { LoginContext } from './context/authContext'
import MemberRoute from './privateroute/MemberRoute'
import NotFound from './pages/NotFound'
import Aos from 'aos'
import 'aos/dist/aos.css'

function App() {
  const { isLogin } = useContext(LoginContext)

  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <ScrollToTop>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/menu" component={Menu} />
              <Route path="/login">{isLogin ? <Redirect to="/dashboard/product" /> : <Login />}</Route>
              <MemberRoute path="/dashboard"><Dashboard /></MemberRoute>
              <Route path="*"><NotFound /></Route>
            </Switch>
          </ScrollToTop>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
