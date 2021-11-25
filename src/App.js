import React from 'react';
import './components/navigationBar'
import './App.css';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './components/style.css'
import './components/Admin/admin.css'
import Register from './components/Register'
import Login from './components/Login'
import AdminLogin from './components/Admin/AdminLogin'
import NavBar from './components/navigationBar'
import Dashboard from './components/Dashboard'
import Hotel from './components/Hotel'
import Place from './components/Place'
import Weather from './components/climate'
import Maps from './components/gmaps'
import PrivateRoute from './components/PrivateRouter';
import sidenav from './components/Admin/sidenav';
import Profile from './components/Profileupdate';


// AdminSection
import AdminDashboard from './components/Admin/AdminDashboard'
import AdminHotelList from './components/Admin/HotelList'
import AdminPlaceList from './components/Admin/PlaceList'
import AdminTrekkingList from './components/Admin/TrekkingList'
import AdminGuideList from './components/Admin/GuideList'


function App() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
        
        <Route exact path ='/'> <Login /> </Route>
        <Route path ='/Admin'> <AdminLogin /> </Route>
        <Route path = '/Register' component={Register} />

        <PrivateRoute path = '/Dashboard' component={Dashboard} />
        <PrivateRoute path = '/Hotel' component={Hotel} />
        <PrivateRoute path = '/Place' component={Place} />
        <PrivateRoute path = '/Weather' component={Weather} />
        <PrivateRoute path = '/Maps' component={Maps} />
        <PrivateRoute path ='/Profile' component={Profile}/>

{/* AdminSection */}
        <Route path = '/AdminDashboard' exact component={AdminDashboard} />
        <Route path = '/HotelList' exact component={AdminHotelList} />
        <Route path = '/PlaceList' exact component={AdminPlaceList} />
        <Route path = '/TrekkingList' exact component={AdminTrekkingList} />
        <Route path = '/GuideList' component={AdminGuideList} />
        <Route path = '/sidenav' component={sidenav} />
         />


 <NavBar />

               
         
        </Switch>
      </BrowserRouter>

    </Container>
  );


}

export default App;
