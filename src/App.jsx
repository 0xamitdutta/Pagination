import { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const productsRes = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const productsData = await productsRes.json();

    console.log(productsData);
    setProducts(productsData.products);
    setTotalProducts(productsData.total);
  }

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <div>
      <div className='text-center'>
        {
          products.map((item, index) => {
            return (
              <div key={index}>
                <h1>{item.brand}</h1>
                <p>{item.category}</p>
                <img src={item.thumbnail} alt={item.brand} />
              </div>
            )
          })
        }
      </div>
      <div className='text-center'>
        {
          page > 1 && (
            <button onClick={() => setPage(page - 1)} className='mx-2 p-2 bg-slate-400 rounded' disabled={page === 1}>Previous</button>
          )
        }

        {
          Array(Math.ceil(totalProducts / 10)).fill().map((_, index) => {
            return (
              <button className={`m-2 p-2 border-solid border-2 border-black rounded-sm ${page == index + 1 ? 'bg-slate-600' : ''}`} key={index} onClick={() => setPage(index + 1)}>{index + 1}</button>
            )
          })
        }
        {
          page < Math.ceil(totalProducts / 10) && (
            <button onClick={() => setPage(page + 1)} className='mx-2 p-2 bg-slate-400 rounded' disabled={page === Math.ceil(totalProducts / 10)}>Next</button>
          )
        }

      </div>
    </div>
  )
}

export default App