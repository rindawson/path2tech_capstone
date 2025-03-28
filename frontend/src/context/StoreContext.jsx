import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

   const [cartItems, setCartItems] = useState({});
   // originally was http://localhost:4000
   const url = "https://theflyingsaucer-backend.netlify.app";
   const [token, setToken] = useState("");
   const [food_list,setFoodList] = useState([]);

   const addToCart = async (itemId) => {
      if(!cartItems[itemId]) {
         setCartItems((prev) => ({...prev, [itemId]: 1 }))
      }
      else {
         setCartItems((prev) => ({...prev, [itemId]: prev[itemId] + 1 }))
      }      
      if (token) {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
   }

   const removeFromCart = async (itemId) => {
      setCartItems((prev)=>({...prev, [itemId]: prev[itemId] - 1}));
      if(token) {
         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      }
   }

   // we fixed this DO NOT EDIT IF STATEMENT
   const getTotalCartAmount = () => {
      let totalAmount = 0;
      for(const item in cartItems)
      {
         if(cartItems[item]>0) {
         let itemInfo = food_list.find((product)=>product._id === item);
            if(itemInfo){
               totalAmount += itemInfo.price * cartItems[item];
            }      
         }
      }
      return totalAmount;
   }

   const fetchFoodList = async () => {
      const response = await axios.get(url+"/api/food/list")
      setFoodList(response.data.data)
   }

   const loadCartData = async (token) => {
      const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
      setCartItems(response.data.cartData);
   }

   useEffect(() => {
      async function loadData() {
         try {
            await fetchFoodList();
         if(localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
         } 
         } catch (error) {
            console.log(error.message);
         }   
      }
      loadData();
   },[])

   const contextValue = {
      food_list,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getTotalCartAmount,
      url,
      token,
      setToken
   }
   
   return (
      <StoreContext.Provider value={contextValue}>
         {props.children}
      </StoreContext.Provider>
   )
}

export default StoreContextProvider