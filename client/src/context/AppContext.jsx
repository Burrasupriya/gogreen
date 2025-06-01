import { createContext, useContext ,useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
export const AppContext = createContext();

export const AppContextProvider = ({children})=>{
    const currency = import.meta.VITE_CURRENCY;
    const navigate = useNavigate();// This is from react-router-dom.
    const [user,setUser] = useState(null)
    const [isSeller,setIsSeller] = useState(false)
    const [showUserLogin,setShowUserLogin] = useState(false)
    const [products,setProducts] = useState([])
 
    const [cartItems,setCartItems] = useState({})
    const [searchQuery,setSearchQuery] = useState({})

    //fetch all products
    const fetchProducts=  async()=>{
        setProducts(dummyProducts)
    }

    //add product to cart
    const addToCart = (ItemId)=>{
        let cartData = structuredClone(cartItems)
        if(cartData[ItemId]){
            cartData[ItemId] += 1
        }else{
            cartData[ItemId] = 1
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    


// update cart item quantity
const updateCartItem=(ItemId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[ItemId] = quantity;
    setCartItems(cartData)
    toast.success("Cart Updated")
}

// remove product from cart
const removeFromCart=(ItemId)=>{
    let cartData = structuredClone(cartItems);
    if(cartData[ItemId]){
        cartData[ItemId] -= 1;
        if(cartData[ItemId] === 0){
            delete cartData[ItemId]
        }
    }
    toast.success("Removed from cart")
    setCartItems(cartData)
}


// get cart item count
const getCartCount =()=>{
    let totalCount = 0
    for(const item in cartItems){
        totalCount+=cartItems[item];
    }
    return totalCount;
}



//return total cart amount
 const getCartAmount =()=>{
    let totalAmount =0;
    for(const items in cartItems){
        let itemInfo = products.find((product)=>product._id === items);
        if(cartItems[items]>0){
            totalAmount+= itemInfo.offerPrice * cartItems[items]
        }
    }
    return Math.floor(totalAmount * 100)/100;
 }


    useEffect(()=>{
        fetchProducts()
    },[])
    const value = {
        navigate,user,setUser,setIsSeller,isSeller,showUserLogin,setShowUserLogin,
        products,currency,addToCart,updateCartItem,removeFromCart,cartItems,
        searchQuery,setSearchQuery,getCartAmount,getCartCount
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}

