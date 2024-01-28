import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const productsRes = await fetch('https://dummyjson.com/products');
    const productsData = await productsRes.json();

    console.log(productsData.products);
    setProducts(productsData.products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='text-center'>
      {
        products.map((item, index) => {
          return (
            <div key={index}>
              <h1>{item.brand}</h1>
              <p>{item.category}</p>
              <img src={item.thumbnail} alt={item.brand}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default App