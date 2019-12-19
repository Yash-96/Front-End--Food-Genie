import React, { Component } from 'react';
import logo from '../logo.svg';
import { Navbar, NavbarBrand } from 'reactstrap';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';
import Dishdetails from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { DISHES } from '../shared/dishes';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
    };
  }

  onDishSelect(dishId) {
      this.setState({ selectedDish: dishId});
  }

  render(){
    const HomePage = () => {
      return (
        <Home />
      );
    }
  return (
          <div>
          <Header />
          <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
              <Redirect to="/home" />
          </Switch>
          <Footer />
          </div>
      );
    }
    }

export default Main;
