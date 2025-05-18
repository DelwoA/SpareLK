import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Info,
  ChevronRight,
  X,
} from "lucide-react";
import { TStore, TItem } from "@/types";
import { api } from "@/api/api";
import ItemCard from "@/components/ItemCard";
import { Button } from "@/components/ui/button";

export default function Store() {
  const params = useParams();
  const storeId = params.storeId;

  const [store, setStore] = useState<TStore | null>(null);
  const [items, setItems] = useState<TItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState(false);

  useEffect(() => {
    if (storeId) {
      getStoreData(storeId);
      window.scrollTo({ top: 0 });
    }
  }, [storeId]);

  const getStoreData = (storeId: string) => {
    setLoading(true);
    api
      .get("store/" + storeId)
      .then((response) => {
        setStore(response.data.data);
        getStoreItems(storeId);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getStoreItems = (storeId: string) => {
    api
      .get("item/store/" + storeId)
      .then((response) => {
        setItems(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-grow min-h-screen w-full">
        <h1 className="text-gray-400 animate-pulse text-3xl">Loading...</h1>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="flex items-center justify-center flex-grow min-h-screen w-full">
        <h1 className="text-gray-400">Store Not Found</h1>
      </div>
    );
  }

  return (
    <main className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm mb-6">
        <Link to="/" className="text-slate-500 hover:text-orange-500">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
        <Link to="/shop" className="text-slate-500 hover:text-orange-500">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4 text-slate-400 mx-1" />
        <span className="text-slate-900 font-medium truncate">
          {store.name}
        </span>
      </nav>

      {/* Store Header */}
      <div className="relative bg-slate-800 rounded-xl overflow-hidden mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url(/slider1.jpg)" }}
        />

        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                {store.name}
              </h1>
              <p className="text-slate-300 text-sm md:text-base max-w-2xl">
                Authorized dealer for quality auto parts and accessories
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0 bg-transparent border-orange-500 text-white hover:bg-orange-500 hover:text-white"
              onClick={() => setIsStoreInfoOpen(!isStoreInfoOpen)}
            >
              {isStoreInfoOpen ? (
                <X className="h-4 w-4 mr-2" />
              ) : (
                <Info className="h-4 w-4 mr-2" />
              )}
              {isStoreInfoOpen ? "Close Info" : "Store Info"}
            </Button>
          </div>

          {/* Store Info Card */}
          {isStoreInfoOpen && (
            <div className="mt-6 bg-white/95 rounded-lg p-5 animate-in fade-in duration-300 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-orange-500" />
                Contact Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm text-slate-500">Phone</p>
                    <p className="font-medium">{store.phone}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium">{store.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-slate-500 mr-3" />
                  <div>
                    <p className="text-sm text-slate-500">Address</p>
                    <p className="font-medium">{store.address}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Products ({items.length})</h2>
          <div className="flex items-center gap-2">
            {/* Additional controls could go here (sorting, filtering) */}
          </div>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {items.map((item, i) => (
              <ItemCard key={i} itm={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-xl">
            <Building2 className="h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Products Available
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              This store doesn't have any products listed at the moment. Please
              check back later.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
