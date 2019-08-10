import React from 'react';
import Navbar from './Components/Header';
import Categories from './Containers/Categories';
import Product from './Containers/Product';
import Footer from './Components/Footer';
import About from './Components/About';
import ContuctUs from './Components/ContuctUs';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ShoppingCart from './Components/ShoppingCart';
import {toast, ToastContainer, MDBNotification } from "mdbreact";
import EmptySpace from './Components/EmptySpace'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cart: [],
      totalItems: 0,
      totalAmount: 0
    };

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
  }

  addToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productTitle = selectedProducts.title;
    let productQty = selectedProducts.Quantity;
    if (this.checkProduct(productTitle)) {
      let index = cartItem.findIndex(x => x.title == productTitle);
      cartItem[index].Quantity =
        Number(cartItem[index].Quantity) + Number(productQty);
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem
    });
  }

  // notificationShow(){
  //   return (
  //     <MDBNotification
  //       show
  //       fade
  //       iconClassName="text-primary"
  //       title="Bootstrap"
  //       message="Hello, world! This is a toast message."
  //       text="11 mins ago"
  //       style={{
  //         position: "fixed",
  //         top: "10px",
  //         right: "10px",
  //         zIndex: 9999
  //       }}
  //     />
  //   );
  // }

  removeFromCart(selectedProducts){
    debugger
    let cartItem = this.state.cart;
    let productTitle = selectedProducts.title;
    let index = cartItem.findIndex(x => x.title == productTitle);
    cartItem.splice(index,1);
    this.setState({
      cart: cartItem
    });

  }

  checkProduct(productTitle) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.title === productTitle;
    });
  }

  render(){
    const ShoppingCartRoute = () => <ShoppingCart cart={this.state.cart} removeFromCart={this.removeFromCart}/>
    const Grocery = () => <Product type={'Products'} cart={this.state.cart} addToCart={this.addToCart}/>
    const BabyCare = () => <Product type={'BabyProducts'} cart={this.state.cart} addToCart={this.addToCart}/>
    const Drinks = () => <Product type={'DrinksProducts'} cart={this.state.cart} addToCart={this.addToCart}/>
    const Gifts = () => <Product type={'GiftsProducts'} cart={this.state.cart} addToCart={this.addToCart}/>

  return (
    <div className="bg-light">
       
    <Router>
        <React.Fragment>      
          <Route path="/" component={Navbar} />
          <Route path="/" component={EmptySpace} />
          <Route path="/" component={ShoppingCartRoute} />
          <Route exact path="/" component={Categories} />          
          <Route exact path="/Grocery" component={Grocery} />
          <Route exact path="/Drinks" component={Drinks} />
          <Route exact path="/Gifts" component={Gifts} />
          <Route exact path="/BabyCare" component={BabyCare} />
          <Route exact path="/About" component={About} />
          <Route exact path="/ContuctUs" component={ContuctUs} />
          <Route path="/" component={Footer} />
        </React.Fragment>
    </Router> 
    </div>
  );
  }
}

export default App;
