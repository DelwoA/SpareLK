import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faEmptyStar } from "@fortawesome/free-regular-svg-icons";
import { TItem } from "../types";
import { brands } from "../data/brands";

type Props = {
  itm: TItem;
};

export default function ItemCard({ itm }: Props) {
  const navigate = useNavigate();
  const [item] = useState<TItem>(itm);

  return (
    <div
      onClick={() => navigate(`/item/${itm._id}`)}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col border border-gray-200 h-full cursor-pointer"
    >
      {/* Item image container with hover effect */}
      <div className="relative h-48 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-00"
          src={`http://localhost:3000/images/${item.image}`}
          alt={item.name}
        />
        {item.discount > 0 && (
          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-2 py-1 m-2 rounded">
            -{item.discount}% OFF
          </div>
        )}
        {item.condition === "New" && (
          <div className="absolute left-0 top-0 bg-black text-white text-xs font-bold px-2 py-1 m-2 rounded">
            NEW
          </div>
        )}
      </div>

      {/* Item details section */}
      <div className="p-4 flex-grow flex flex-col">
        {/* Code and category */}
        <div className="flex items-center text-gray-600 mb-1">
          <FontAwesomeIcon icon={faTag} className="h-3 w-3 mr-1" />
          <p className="text-xs line-clamp-1">
            {item.code} | {item.category}
          </p>
        </div>

        {/* Item name */}
        <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">
          {item.name}
        </h3>

        {/* Ratings section */}
        <div className="flex items-center mb-3 mt-auto">
          <div className="flex items-center">
            {Array(1, 2, 3, 4, 5).map((n, i) => (
              <FontAwesomeIcon
                key={i}
                icon={
                  item.rating > i && item.rating < n
                    ? faStarHalfStroke
                    : item.rating >= n
                    ? faStar
                    : faEmptyStar
                }
                className="text-amber-400"
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-2">({item.sold} Sold)</span>
        </div>

        {/* Price and brand display */}
        <div className="flex justify-between items-end mt-1">
          <div>
            <span className="text-lg font-bold text-gray-800">
              Rs.
              {parseFloat(
                item.price * ((100 - item.discount) / 100) + ""
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
            {item.discount > 0 && (
              <div className="text-gray-500 text-xs line-through">
                Rs.
                {item.price.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            )}
          </div>
          {item.brand ? (
            <img
              src={brands.find((b) => b.brand == item.brand)?.url}
              alt={item.brand}
              className="h-5 max-w-16"
              title={item.brand}
            />
          ) : (
            <span className="text-xs text-gray-500">No Brand</span>
          )}
        </div>
      </div>
    </div>
  );
}
