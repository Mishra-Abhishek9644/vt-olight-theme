// src/components/Card.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";


const CardSet = ({ isCard }) => {
    const [settings, setSettings] = useState([]);   // array of diamonds from API
    const [loading, setLoading] = useState(true);   // loading flag
    const [error, setError] = useState(null);       // error message
    const filters = useSelector((state) => state.diamondFilters.filters);
    

    useEffect(() => {
        const fetchSettings = async () => {
            setLoading(true);
            setError(null);
            setSettings([])

            try {
                const res = await fetch("https://server-alpha-ecru.vercel.app/api/settings/filter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                       
                        priceRangeSet: filters.priceRangeSet,
                        selectedMetalSet: filters.selectedMetalSet,

                        
                    })
                });
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const data = await res.json();
                setSettings(data || []);
            } catch (err) {
                console.error("Fetch error:", err);
                setError("Failed to load diamonds");
            } finally {
                setLoading(false);
            }
        };

        fetchSettings(); // run once on mount
    }, [filters]);


    if (loading) return <div className="p-4">Loading diamonds...</div>;
    if (error) return <div className="p-4 text-red-600">{error}</div>;
    if (!settings.length) return <div className="p-4">No diamonds found.</div>;

    return (
        <div className="mb-4 p-1 pb-2">
            {isCard ? (
                /* CARD GRID VIEW */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {settings.map((item) => (

                        <Link to={`/settings/${item.id}`}
                            key={item.id}
                            className="border border-brand p-4 rounded shadow text-center hover:scale-105 transition"
                        >
                            <img
                                src={item.image}
                                alt={item.sku}
                                className="w-full h-52 object-contain"
                            />
                            <p className="font-semibold mt-2">{item.title} Setting</p>
                            <p className="text-sm text-gray-600">
                                {item.metal}  • {item.ring_style}
                            </p>
                            <p className="text-brand font-bold mt-2">
                                ${Number(item.price).toFixed(2)}
                            </p>
                        </Link>
                    ))}
                </div>
            ) : (
                /* TABLE VIEW */
                <div className="flex overflow-x-auto w-full whitespace-nowrap">
                    <table className="w-full text-center mt-4">
                        <tbody>
                            {settings.map((item) => (
                                <tr key={item.sku} className="border-b   border-gray-200">
                                    <td className="p-2"><img src={item.image} className="h-15 w-15"/></td>
                                    <td className="p-2">{item.display_name}</td>
                                    <td className="p-2">{item.metal}</td>
                                    <td className="p-2">{item.price}</td>
                                    
                                   <td> <Link to={`/settings/${item.id}`}>    <button className="text-brand border border-brand rounded-xl px-4 py-1 hover:bg-brand hover:text-white transition">
                                            View
                                        </button></Link>
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

export default CardSet;
