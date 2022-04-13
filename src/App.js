import { useMutation, useLazyQuery } from '@apollo/client'
import { GET_STORE_QUERY, BUY_ITEM } from './graphql/queries'

import { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { addToCart, checkout, updateInventory } from './actions'

function App() {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const [getStore, { loading: loading_getStore, data: data_getStore, error: error_getStore }] = useLazyQuery(GET_STORE_QUERY)
  const [buyItem] = useMutation(BUY_ITEM);

  useEffect(() => {
    getStore();
  }, [])

  return (
    <div className="App">
      <h1>Cart</h1>
      <h2>{cart.length === 0 ? "Empty cart :(" : cart}</h2>

      { (data_getStore) ? data_getStore.items.map((item, i) => {
        return (
          <div key={i}>
            <p>id: {item.id}</p>
            <p>stock: {item.stock}</p>
            <p>title: {item.title}</p>
            <p>description: {item.description}</p>
            <button onClick={()=>{
              data_getStore.items.map((a, i) => {
                if (i == item.id) {
                  if (a.stock >= 1) {
                    dispatch(addToCart({id: item.id}))
                  } else {
                    alert("Unfortunately we are out of stock")
                  }
                }
              })
              
              }}>add {item.title} to cart</button>
            <br/>
          </div>
        )
      }) : "hmm... there appears to be no items... weird" }
      <br/>
      <button onClick={() => {
        for (let i = 0; i < cart.length; i++) {
          buyItem({variables: {
            id: cart[i],
            payload: 1
          }})
        }
        dispatch(checkout())
      }}>checkout</button>
    </div>
  );
}

export default App;
