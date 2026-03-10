// src/components/Card.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setSetting } from "../store/slices/cartSlice";

const CardSet = ({ isCard }) => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filters = useSelector((state) => state.diamondFilters.filters);
  const dispatch = useDispatch();
  console.log("FILTERS:", filters);

  console.log("SENDING FILTERS:", {
  metal: filters.selectedMetalSet?.label,
  price: filters.priceRangeSet
});
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      setSettings([]);

      try {
        const res = await fetch(
          "https://server-alpha-ecru.vercel.app/api/shopify/settings/filter",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              metal: filters.selectedMetalSet?.description,
              price: filters.priceRangeSet
            }),
          }
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await res.json();
        console.log("YO API RESPONSE:", data);
        console.log("RAW:", data);

        setSettings(data || []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [filters]);

  if (loading) return <div className="p-4">Loading settings...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;
  if (!settings.length) return <div className="p-4">No settings found.</div>;

  return (
    <div className="mb-4 p-1 pb-2">
      {isCard ? (
        // ================= CARD GRID VIEW =================
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {settings.map((item) => {
            const numericId = item.id.split("/").pop();

            return (
              <Link
                to={`/settings/${numericId}`}
                
                key={item.id}
                className="border border-brand p-4 rounded shadow text-center hover:scale-105 transition"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-52 object-contain"
                />

                <p className="font-semibold mt-2">
                  {item.title} Setting
                </p>

                <p className="text-brand font-bold mt-2">
                  ${Number(item.price || 0).toFixed(2)}
                </p>
              </Link>
            );
          })}
        </div>
      ) : (
        // ================= TABLE VIEW =================
        <div className="flex overflow-x-auto w-full whitespace-nowrap">
          <table className="w-full text-center mt-4">
            <tbody>
              {settings.map((item) => {
                const numericId = item.id.split("/").pop();

                return (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-2">
                      <img
                        src={item.image}
                        className="h-15 w-15 object-contain"
                        alt={item.title}
                      />
                    </td>

                    <td className="p-2">{item.title}</td>

                    <td className="p-2">
                      ${Number(item.price || 0).toFixed(2)}
                    </td>

                    <td>
                      <Link to={`/settings/${numericId}`}>
                        <button className="text-brand border border-brand rounded-xl px-4 py-1 hover:bg-brand hover:text-white transition">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CardSet;