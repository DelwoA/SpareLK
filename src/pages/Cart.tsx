import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { api } from "../api/api";
import { cartActions } from "../reducers/cartSlice";
import { ShoppingBag, Info, Tag, Package, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.user);
  const items = useSelector((state: RootState) => state.cart.cartItems);
  const cart = useSelector((state: RootState) => state.cart);

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    getCartItems();
  }, []);

  useEffect(() => {
    // Calculate total when items change
    let newTotal = 0;
    cartItems.forEach((item) => {
      if (item.item?.isActive) {
        const discountPrice =
          item.item.price * ((100 - item.item.discount) / 100);
        newTotal += discountPrice * item.cartItem.qty;
      }
    });
    setTotal(newTotal);
  }, [cartItems]);

  const updateCart = async () => {
    try {
      const res = await api.put(`cart/items/${cart.cartId}`, items);
      if (res.status === 200) {
        return true;
      }
      return false;
    } catch (err) {
      console.log("Failed to update cart:", err);
      return false;
    }
  };

  const getCartItems = () => {
    api
      .get("cart/" + user!._id)
      .then((result) => {
        dispatch(cartActions.addToCart(result.data.data.items));

        // Fetch details for each item
        const fetchedItems = result.data.data.items;
        Promise.all(
          fetchedItems.map((cartItem: any) =>
            api
              .get("item/" + cartItem.itemId)
              .then((res) => ({
                cartItem,
                item: res.data.data,
              }))
              .catch((err) => {
                console.log(err);
                return { cartItem, item: null };
              })
          )
        ).then((itemsWithDetails) => {
          setCartItems(itemsWithDetails.filter((item) => item.item?.isActive));
        });
      })
      .catch((err) => console.log(err));
  };

  const updateQuantity = (
    itemId: string,
    newQty: number,
    currentQty: number
  ) => {
    // Update in Redux state
    const updatedItems = items.map((item) => {
      if (item.itemId === itemId) {
        return { ...item, qty: newQty };
      }
      return item;
    });
    dispatch(cartActions.addToCart(updatedItems));

    // Update in component state
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItem.itemId === itemId) {
          return { ...item, cartItem: { ...item.cartItem, qty: newQty } };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId: string) => {
    api
      .delete(`cart/${cart.cartId}/${itemId}`)
      .then(() => {
        dispatch(cartActions.removeFromCart(itemId));
        setCartItems((prev) =>
          prev.filter((item) => item.cartItem.itemId !== itemId)
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCheckout = () => {
    updateCart().then((res) => {
      if (res) {
        navigate(`/cart/place-order/${cart.cartId}`);
      } else {
        alert("Failed to update cart. Please try again.");
      }
    });
  };

  if (items.length === 0 || cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-svh w-full pt-4">
        <div className="container py-12 mx-auto flex flex-col items-center justify-center">
          <div className="flex flex-col items-center text-gray-500 gap-3">
            <ShoppingBag className="w-16 h-16 text-orange-500 opacity-70" />
            <h2 className="text-2xl font-medium">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button
              variant="outline"
              onClick={() => navigate("/shop")}
              className="bg-orange-500 hover:bg-orange-400 text-white hover:text-white mt-3 px-5 py-5 mb-14 text-base font-medium transition-all duration-200"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-svh w-full">
      <div className="container py-12 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-orange-500" />
            Shopping Cart{" "}
            <span className="text-slate-400">({cartItems.length})</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Review your items before checkout
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.cartItem._id}
                className="rounded-xl border bg-white shadow-sm overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-32 h-32 p-4 flex items-center justify-center bg-slate-50">
                    <img
                      src={`http://localhost:3000/images/${item.item.image}`}
                      alt={item.item.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg">
                          {item.item.name}
                        </h3>
                        <span className="font-semibold">
                          Rs.{" "}
                          {parseFloat(
                            item.item.price *
                              ((100 - item.item.discount) / 100) +
                              ""
                          ).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                        <Tag className="h-4 w-4" />
                        <span>{item.item.category}</span>
                        <span className="text-slate-300">|</span>
                        <Package className="h-4 w-4" />
                        <span>Only {item.item.stock} item(s) left</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center">
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-l border border-r-0 bg-slate-50 text-slate-500 hover:bg-slate-100"
                          onClick={() => {
                            if (item.cartItem.qty <= 1) return;
                            updateQuantity(
                              item.cartItem.itemId,
                              item.cartItem.qty - 1,
                              item.cartItem.qty
                            );
                          }}
                          disabled={item.cartItem.qty <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="text"
                          value={item.cartItem.qty}
                          className="w-10 h-8 text-center border-y focus:outline-none"
                          readOnly
                        />
                        <button
                          className="w-8 h-8 flex items-center justify-center rounded-r border border-l-0 bg-slate-50 text-slate-500 hover:bg-slate-100"
                          onClick={() => {
                            if (item.cartItem.qty >= item.item.stock) return;
                            updateQuantity(
                              item.cartItem.itemId,
                              item.cartItem.qty + 1,
                              item.cartItem.qty
                            );
                          }}
                          disabled={item.cartItem.qty >= item.item.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        className="text-sm text-red-500 hover:text-red-600 font-medium"
                        onClick={() => removeItem(item.cartItem.itemId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => navigate("/shop")}
                className="px-5 py-5 mb-14 text-base font-medium hover:bg-slate-100 transition-all duration-200"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border bg-white shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between pb-4 border-b">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">
                    Rs.{" "}
                    {total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between pb-4 border-b">
                  <span className="text-gray-500">Shipping estimate</span>
                  <span className="font-medium">Rs. 100.00</span>
                </div>
                <div className="flex justify-between pb-4 border-b">
                  <span className="text-gray-500">Tax estimate</span>
                  <span className="font-medium">Rs. 0.00</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-semibold">Order Total</span>
                  <span className="font-semibold text-lg">
                    Rs.{" "}
                    {(total + 100).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors font-semibold text-lg"
                >
                  Proceed to Checkout
                </button>
                <div className="flex items-center flex-wrap gap-1 text-xs text-gray-500 mt-4 justify-center">
                  <Info className="h-3 w-3" />
                  <span>Learn more about</span>
                  <Link
                    to="#"
                    className="text-orange-500 hover:text-orange-500 hover:underline"
                  >
                    Taxes
                  </Link>
                  <span>and</span>
                  <Link
                    to="#"
                    className="text-orange-500 hover:text-orange-500 hover:underline"
                  >
                    Shipping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
