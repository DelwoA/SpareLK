import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { RootState } from "@/store/store";
import { api } from "@/api/api";
import { cartActions } from "@/reducers/cartSlice";
import { EUserRole, TItem, TReview } from "@/types";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductPricing } from "@/components/product/ProductPricing";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductRatings } from "@/components/product/ProductRatings";

function Item() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemId = params.itemId;
  const { cartId } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.user);
  const [item, setItem] = useState<TItem | null>(null);
  const [itemQty, setItemQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<TReview[]>([]);

  function getItemRequest() {
    setLoading(true);
    api
      .get("item/" + itemId)
      .then((result) => {
        setItem(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function addItemCart() {
    api
      .put(`cart/add/${cartId}`, { itemId: itemId, qty: itemQty })
      .then(() => {
        dispatch(cartActions.addItemToCart({ itemId: itemId, qty: itemQty }));
        toast.success("Item added to cart", {
          action: {
            label: "View Cart",
            onClick: () => navigate("/cart"),
          },
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add item to cart");
      });
  }

  function getReviews(id: string | undefined) {
    if (!id) return;

    api
      .get("order/reviews/" + id)
      .then((result) => {
        setReviews(result.data.data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getItemRequest();
    getReviews(itemId);
    window.scrollTo({ top: 0 });
  }, [params.itemId]);

  const handleBuyNow = () => {
    navigate(`/item/place-order/${item?._id}/${itemQty}`);
  };

  const handleQuantityChange = (quantity: number) => {
    setItemQty(quantity);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow min-h-screen w-full">
        <h1 className="text-gray-400 animate-pulse text-3xl">Loading...</h1>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex items-center justify-center flex-grow min-h-screen w-full">
        <h1 className="text-gray-400">Item Not Found</h1>
      </div>
    );
  }

  const discountedPrice = Math.round(
    item.price * ((100 - item.discount) / 100)
  );
  const deliveryFee = 100; // Fixed for now

  return (
    <main className="container max-w-7xl mx-auto px-4 py-8">
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-slate-500 hover:text-orange-500">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
        <Link to="/shop" className="text-slate-500 hover:text-orange-500">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
        <Link
          to={`/shop?category=${item.category}`}
          className="text-slate-500 hover:text-orange-500"
        >
          {item.category}
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
        <span className="text-slate-900 font-medium truncate">{item.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        <div>
          <ImageGallery
            mainImage={`http://localhost:3000/images/${item.image}`}
            additionalImages={[]}
            images360={item.images360}
          />
        </div>

        <div className="space-y-8">
          <ProductInfo
            name={item.name}
            brand={item.brand}
            condition={item.condition}
            vehicleModel={item.vehicleModel}
            rating={item.rating}
            reviewCount={reviews.length}
            storeId={item.store?._id}
            storeName={item.store?.name}
          />

          <ProductPricing
            price={discountedPrice}
            originalPrice={item.price}
            discount={item.discount}
            quantity={itemQty}
            stockCount={item.stock}
            deliveryFee={deliveryFee}
            deliveryDate={{ start: "Feb 26", end: "Feb 29" }}
            onQuantityChange={handleQuantityChange}
          />

          {user?.role !== EUserRole.SELLER && (
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                onClick={addItemCart}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-12">
        <ProductDescription description={item.description} />
      </div>

      <div className="mb-16">
        <ProductRatings
          rating={item.rating}
          reviewCount={reviews.length}
          reviews={reviews}
        />
      </div>
    </main>
  );
}

export default Item;
