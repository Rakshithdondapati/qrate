"use client";
import { useEffect, useState } from "react";
import { foodItems } from "@/data/foodItem";

export default function MenuPage() {
  const [user, setUser] = useState<{
    tableCode: number;
    userName: string;
  } | null>(null);
  const [expandedIds, setExpandedIds] = useState<number[]>([]); // allow multiple expanded
  const [activeTabs, setActiveTabs] = useState<Record<number, string>>({});

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const isExpanded = prev.includes(id);
      const newArr = isExpanded ? prev.filter((x) => x !== id) : [...prev, id];
      return newArr;
    });

    setActiveTabs((prev) => {
      if (!prev[id]) return { ...prev, [id]: "Ingredients" };
      return prev;
    });
  };
  type CartItem = {
    count: number;
    total: number;
    category: string;
    customization?: string;
  };

  const [cart, setCart] = useState<Record<number, CartItem>>({});

  const categoryTotals = Object.values(cart).reduce((acc, item) => {
  if (!acc[item.category]) acc[item.category] = 0;
  acc[item.category] += item.total;
  return acc;
}, {} as Record<string, number>);

  const increaseItem = (item: any) => {
    setCart((prev) => {
      const existing = prev[item.id];
      const count = existing ? existing.count + 1 : 1;
      return {
        ...prev,
        [item.id]: {
          count,
          total: item.price * count,
          category: item.category || "Main Course", // fallback
          customization: existing?.customization || "",
        },
      };
    });
  };

  const decreaseItem = (item: any) => {
    setCart((prev) => {
      const existing = prev[item.id];
      if (!existing || existing.count <= 1) {
        const newCart = { ...prev };
        delete newCart[item.id];
        return newCart;
      }
      const count = existing.count - 1;
      return {
        ...prev,
        [item.id]: {
          ...existing,
          count,
          total: item.price * count,
        },
      };
    });
  };

  const isInCart = (id: number) => !!cart[id];

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-gray-900 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-lg">🍖 BBQ Inn</h1>
        <div className="text-right text-sm">
          <p className="text-gray-600">table code</p>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-semibold">
            {user?.tableCode}
          </span>
          <br />
          <span className="font-semibold">{user?.userName}</span>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">Start adding your meals!</h2>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-3">
        {["All", "Starters", "Main Course", "Dessert"].map((cat) => (
          <button
            key={cat}
            className={`px-4 py-1 rounded-full border text-sm ${
              cat === "Main Course"
                ? "bg-green-600 text-white"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
        <button className="ml-auto px-3 border rounded-lg">🔍</button>
        <button className="px-3 border rounded-lg">⬇️</button>
      </div>

      {/* Food List */}
      <div className="space-y-4 mt-4">
        {foodItems.map((item) => {
          const isExpanded = expandedIds.includes(item.id);
          const tab = activeTabs[item.id];
          return (
            <div
              key={item.id}
              className="bg-gray-50 border rounded-xl p-4 transition-all duration-300"
            >
              {/* Expanded Card */}
              {isExpanded ? (
                <>
                  <div className="relative">
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="absolute top-0 right-0 text-gray-500 text-sm"
                    >
                      ❌
                    </button>
                    <img
                      src="/biryani-banner.jpg"
                      alt={item.name}
                      className="rounded-xl mb-3 h-40 w-full object-cover"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-right font-bold text-green-800">
                      ₹{item.price}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 mt-1">
                    ⏱ {item.time} mins • {item.spicy ? "🌶 Spicy" : "🧈 Mild"} •
                    ⭐ {item.rating} • 🍽 2 serves
                  </p>

                  {/* <div className="flex gap-2 mt-4 flex-wrap">
                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">Ingredients</span>
                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">Allergen Info</span>
                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">Preparation</span>
                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded">Nutritional Values</span>
                  </div>

                  <p className="text-sm mt-3 text-gray-700">
                    Basmati rice, chicken, onions, tomatoes, yogurt, ginger, garlic, biryani masala, mint, coriander.
                  </p> */}

                  {/* Tab Buttons */}
                  <div className="flex gap-2 mt-4 flex-wrap text-sm">
                    {[
                      "Ingredients",
                      "Allergen Info",
                      "Preparation",
                      "Nutritional Values",
                    ].map((label) => (
                      <button
                        key={label}
                        onClick={() =>
                          setActiveTabs((prev) => ({
                            ...prev,
                            [item.id]: label,
                          }))
                        }
                        className={`px-3 py-1 rounded-full border transition ${
                          tab === label
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="mt-4 text-sm text-gray-700">
                    {tab === "Ingredients" && (
                      <div className="flex flex-wrap gap-2">
                        {item.details.ingredients.slice(0, 6).map((ing, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 px-2 py-1 rounded text-xs truncate max-w-[120px]"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    )}

                    {tab === "Allergen Info" && (
                      <div className="flex flex-wrap gap-2">
                        {item.details.allergens.map((a, i) => (
                          <span
                            key={i}
                            className="bg-yellow-100 px-2 py-1 rounded text-xs"
                          >
                            ⚠️ {a}
                          </span>
                        ))}
                      </div>
                    )}

                    {tab === "Preparation" && (
                      <p className="text-xs text-gray-600 truncate">
                        {item.details.preparation}
                      </p>
                    )}

                    {tab === "Nutritional Values" && (
                      <div className="flex flex-wrap gap-4 text-xs text-gray-700">
                        <span>🔥 {item.details.nutrition.calories}</span>
                        <span>💪 {item.details.nutrition.protein}</span>
                        <span>🥖 {item.details.nutrition.carbs}</span>
                        <span>🧈 {item.details.nutrition.fat}</span>
                      </div>
                    )}
                  </div>

                  {isInCart(item.id) && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-1">
                        Customizations
                      </label>
                      <textarea
                        placeholder="Ex: More onions, less spicy etc"
                        className="w-full border rounded-lg p-2 text-sm"
                        rows={2}
                        value={cart[item.id]?.customization || ""}
                        onChange={(e) => {
                          const text = e.target.value;
                          setCart((prev) => ({
                            ...prev,
                            [item.id]: {
                              ...prev[item.id],
                              customization: text,
                            },
                          }));
                        }}
                      ></textarea>
                      <button className="mt-2 bg-green-600 text-white px-4 py-2 rounded text-sm">
                        Done
                      </button>
                    </div>
                  )}
                  {isInCart(item.id) ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decreaseItem(item)}
                        className="bg-red-500 text-white px-2 rounded text-sm"
                      >
                        −
                      </button>
                      <span className="font-medium">{cart[item.id].count}</span>
                      <button
                        onClick={() => increaseItem(item)}
                        className="bg-green-600 text-white px-2 rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => increaseItem(item)}
                      className="bg-green-600 text-white px-3 py-1 rounded mt-1 text-sm"
                    >
                      Add
                    </button>
                  )}
                </>
              ) : (
                /* Minimized Card */
                <div
                  className="flex justify-between items-center"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      ⏱ {item.time} mins • {item.spicy ? "🌶 Spicy" : "🧈 Mild"}{" "}
                      • ⭐ {item.rating} • 🍽 2 serves
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{item.price}</p>
                    {isInCart(item.id) ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseItem(item)}
                          className="bg-red-500 text-white px-2 rounded text-sm"
                        >
                          −
                        </button>
                        <span className="font-medium">
                          {cart[item.id].count}
                        </span>
                        <button
                          onClick={() => increaseItem(item)}
                          className="bg-green-600 text-white px-2 rounded text-sm"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => increaseItem(item)}
                        className="bg-green-600 text-white px-3 py-1 rounded mt-1 text-sm"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Order Summary Sticky Bar (ABOVE bottom nav) */}
      <div className="fixed bottom-14 left-0 right-0 bg-white border-t p-4 flex justify-between items-center z-50 shadow-inner rounded-t-lg">
        <div>
          <h4 className="font-bold text-lg">Order Summary</h4>
          <div className="text-sm">
            {Object.entries(cart).map(
              ([cat, data]) =>
                data.count > 0 && (
                  <p key={cat}>
                    ₹{data.total} <span className="text-gray-500">{cat}</span>
                  </p>
                )
            )}
          </div>
        </div>

        <div className="text-right">
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium mb-1">
            Order
          </button>
          <p className="text-base font-bold">
            Total ₹
            {Object.values(cart).reduce((acc, cat) => acc + cat.total, 0)}
          </p>
        </div>

        {/* 🔔 Alert Button */}
        <button className="ml-3 bg-green-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          🔔
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-2 flex justify-around z-50">
        <button className="flex flex-col items-center text-green-600 font-semibold">
          🏠<span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-700">
          🍽️<span className="text-xs">Menu</span>
        </button>
        <button className="flex flex-col items-center text-gray-700">
          🧾<span className="text-xs">Order</span>
        </button>
      </div>
    </div>
  );
}
