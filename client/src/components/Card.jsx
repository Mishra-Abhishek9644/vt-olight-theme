// src/components/Card.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Card = ({ isCard }) => {
    const [diamonds, setDiamonds] = useState([]);   // array of diamonds from API
    const [loading, setLoading] = useState(true);   // loading flag
    const [error, setError] = useState(null);       // error message
    const filters = useSelector((state) => state.diamondFilters.filters);


    useEffect(() => {
        const fetchDiamonds = async () => {
            setLoading(true);
            setError(null);
            console.log(filters)
            try {
                const res = await fetch("https://server-alpha-ecru.vercel.app/api/diamonds/filter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        carat: filters.caratRange,     // your slice values
                        colorRange: filters.colorRange,
                        clarityRange: filters.clarityRange,
                        price: filters.priceRange,
                        polishRange: filters.polishRange,
                        symRange: filters.symRange,
                        flourRange: filters.flourRange,
                        depthRange: filters.depthRange,
                        lwRange: filters.lwRange
                    })
                });
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await res.json();
                setDiamonds(data || []);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load diamonds");
            } finally {
                setLoading(false);
            }
        };

        fetchDiamonds(); // run once on mount
    }, [filters]);


    if (loading) return <div className="p-4">Loading diamonds...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!diamonds.length) return <div className="p-4">No diamonds found.</div>;

    return (
        <div className="mb-4 p-1 pb-2">
            {isCard ? (
                /* CARD GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {diamonds.map((item) => (
                        <Link to={`/diamond/${item.sku}`}
                            key={item.sku}
                            className="relative border p-4 rounded shadow text-center hover:scale-105 border-brand transition group overflow-hidden"
                        >
                            <img
                                src={item.image}
                                alt={item.sku}
                                className="w-full min-h-80 object-contain"
                            />
                            <p className="font-semibold mt-2">{item.shape} Diamond</p>
                            <p className="text-sm text-gray-600">
                                {item.carat} ct • {item.color} • {item.clarity} • {item.polish}
                            </p>
                            <p className="text-brand font-bold mt-2">
                                ${Number(item.price).toFixed(2)}
                            </p>

                            {/* 🔥 HOVER OVERLAY */}
                            <div
                                className="
                                absolute bottom-0 left-0 w-full 
                                bg-white/50 backdrop-blur 
                                    p-4 h-full flex flex-col items-center gap-2 justify-center text-center
                                    translate-y-full group-hover:translate-y-0 
                                    transition-all duration-500
      "
                            >
                                <p><b>Diamond Type:</b> Natural</p>
                                <p><b>Shape:</b> {item.shape}</p>
                                <p><b>Carat:</b> {item.carat} ct</p>
                                <p><b>Color:</b> {item.color}</p>
                                <p><b>Clarity:</b> {item.clarity}</p>
                                <p><b>Polish:</b> {item.polish}</p>
                                <p><b>Symmetry:</b> {item.symmetry}</p>
                                <p><b>Fluorescence:</b> {item.fluorescence}</p>
                                <p><b>Depth:</b> {item.depth}</p>
                                <p><b>L/W::</b> {item.length}</p>

                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                /* TABLE VIEW */
                <div className="flex overflow-x-auto w-full whitespace-nowrap">
                    <table className="w-full text-center mt-4">
                        <thead className="bg-brand text-white">
                            <tr>
                                <th className="p-2">Shape</th>
                                <th className="p-2">Carat</th>
                                <th className="p-2">Color</th>
                                <th className="p-2">Clarity</th>
                                <th className="p-2">Cut</th>
                                <th className="p-2">Price</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {diamonds.map((item) => (
                                <tr key={item.sku} className="border-b border-gray-200">
                                    <td className="p-2">{item?.shape}</td>
                                    <td className="p-2">{item.carat}</td>
                                    <td className="p-2">{item.color}</td>
                                    <td className="p-2">{item.clarity}</td>
                                    <td className="p-2">{item.cut || "-"}</td>
                                    <td className="p-2">${Number(item.price).toFixed(0)}</td>
                                    <td className="p-2">
                                        <Link to={`/diamond/${item.sku}`}><button className="block bg-white text-brand border border-brand rounded-xl px-4 py-1 hover:bg-brand hover:text-white transition">

                                            View
                                        </button> </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Card;
