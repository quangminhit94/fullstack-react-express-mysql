import React, { Component } from 'react'

import './App.css';

class App extends Component {
  
  state = {
    products: [],
    product: {
      name: 'sample product',
      price: 50
    }
  }

  componentDidMount() {
   this.getProducts(); 
  }

  getProducts = _ => {
    fetch('//localhost:3000/products')
      .then(response => response.json())
      .then(response => this.setState({products: response.data}))
      .catch(err => console.error(err))
  }

  async getProductsEs7() {
    try {
      let response = await fetch('//localhost:3000/products')
      let {data} = await response.json()
      console.log(data)
      this.setState({products: data})
    }
    catch(error) {
      console.error(error)
    }
  }

  addProduct = _ => {
    const {product} = this.state
    // const {product_id,name} = product

    fetch('//localhost:3000/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(product)
    })
      .then(this.getProducts)
      .catch(err => console.error(err))
  }

renderProduct = ( {product_id, name, price} ) => <li key={product_id}>{product_id}.{name} - ${price}</li>

  render() {
    const {products, product} = this.state
    return (
      <div className="App">
        <ul>
          {products.map(this.renderProduct)}
        </ul>

        <div>
          <input type="text" 
            value={product.name} 
            placeholder="Product name..." // destructing product inside state then merge by using spread syntax
            onChange={ e => this.setState({ product: {...product, name: e.target.value} }) } />          
          <input type="text" 
            value={product.price} 
            placeholder="Product name..."
            onChange={ e => this.setState({ product: {...product, price: e.target.value} }) } />
          <button onClick={this.addProduct}>Add Product</button>
        </div>
      </div>
    );
  }
}

export default App;
