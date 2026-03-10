// ✅ Imports
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackBtn from './BackBtn'
import share from "../assets/share.svg"
import truck from "../assets/truck.svg"
import Metal from './Metal'
import DiamondShapeSet from './DiamondShapeSet'
import { useDispatch, useSelector } from 'react-redux'
import { setSetting } from "../store/slices/cartSlice";
import { toast } from 'react-toastify'

const View2 = () => {

    const { id } = useParams();
    const dispatch = useDispatch()

    const [settingData, setSettingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectedDiamond = useSelector(
        (state) => state.cart.selectedDiamond
    );

    // ======================================================
    // ⭐ Fetch Shopify Setting
    // ======================================================
    useEffect(() => {

        const fetchSetting = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `https://server-alpha-ecru.vercel.app/api/shopify/settings/${encodeURIComponent(id)}`
                );

                if (!res.ok) throw new Error("Failed to fetch setting");

                const data = await res.json();
                setSettingData(data);

            } catch (err) {
                console.error(err);
                setError("Failed to load setting");
            } finally {
                setLoading(false);
            }
        };

        fetchSetting();
    }, [id]);

    // ======================================================
    // ⭐ Safe Guards
    // ======================================================
    if (loading) return <div className='p-4 text-xl'>Loading setting...</div>;
    if (error) return <div className='p-4 text-red-500'>{error}</div>;
    if (!settingData) return <div className='p-4'>No setting found.</div>;

    const images = settingData.images || [];
    const currentImage = images[activeIndex] || images[0];

    return (
        <>
            <BackBtn />

            <div className='sm:container-sm md:container-md lg:container-lg mt-5'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    {/* ================= LEFT: GALLERY ================= */}
                    <div className='flex flex-col items-center'>

                        {/* Main Image */}
                        <div className='border-2 border-brand rounded-2xl w-full h-[75vh] 
                            flex items-center justify-center p-5 bg-white overflow-hidden'>

                            {currentImage && (
                                <img
                                    src={currentImage}
                                    alt={settingData.title}
                                    className='w-full h-full object-contain'
                                />
                            )}

                        </div>

                        {/* Thumbnails */}
                        <div className='flex gap-3 mt-4 flex-wrap justify-center'>
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`border-2 rounded-xl p-1 
                                    ${activeIndex === index ? "border-brand" : "border-gray-300"}`}
                                >
                                    <img
                                        src={img}
                                        alt="thumb"
                                        className='w-20 h-20 object-contain'
                                    />
                                </button>
                            ))}
                        </div>

                    </div>

                    {/* ================= RIGHT: INFO ================= */}
                    <div className='flex flex-col gap-3 p-4'>

                        <h1 className='text-2xl font-bold'>
                            {settingData.title}
                        </h1>

                        <p className='text-brand font-semibold text-3xl'>
                            ${Number(settingData.price || 0).toLocaleString()}
                            <span className='text-gray-500 text-base ml-2'>
                                (Setting Only)
                            </span>
                        </p>

                        <p className='text-sm text-gray-600'>
                            Elegant and timeless, this engagement ring setting
                            is crafted with premium materials and designed
                            to pair beautifully with your chosen diamond.
                        </p>

                        <div>
                            <DiamondShapeSet />
                            <Metal />
                        </div>

                        {/* Buttons */}
                        <div className='flex gap-3 mt-4'>

                            {!selectedDiamond ? (
                                <Link to="/diamond">
                                    <button
                                        className='bg-brand text-white px-8 py-3 rounded-md hover:scale-105 transition'
                                        onClick={() => {
                                            dispatch(setSetting(settingData))
                                            toast.success("Setting Selected")
                                        }}
                                    >
                                        Select This Setting
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/complete">
                                    <button
                                        className='bg-brand text-white px-8 py-3 rounded-md hover:scale-105 transition'
                                        onClick={() => {
                                            dispatch(setSetting(settingData))
                                            toast.success("Setting Selected")
                                        }}
                                    >
                                        Select This Setting
                                    </button>
                                </Link>
                            )}

                            <button>
                                <img
                                    src={share}
                                    className='h-11 w-11 p-2 border-2 border-brand'
                                    alt="share"
                                />
                            </button>
                        </div>

                        <button className='bg-brand text-white px-8 py-3 mt-3 rounded-md'>
                            Add To Cart
                        </button>

                        {/* Shipping */}
                        <div className='mt-4 text-sm text-gray-600 space-y-2'>
                            <p className='flex gap-2 items-center'>
                                <img src={truck} className='h-5 w-5' alt="" />
                                Free insured shipping, Risk-Free Retail
                            </p>

                            <p className='flex gap-2 items-center'>
                                <img src={truck} className='h-5 w-5' alt="" />
                                Free 30-Day Returns, Free Resizing, Lifetime Warranty
                            </p>
                        </div>

                        {/* Product Details */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-brand mb-4">
                                Product Information
                            </h2>

                            <div className="grid grid-cols-2 gap-y-3 text-sm">
                                <p className="font-medium">SKU</p>
                                <p>{settingData.sku || "—"}</p>

                                <p className="font-medium">Product Type</p>
                                <p>{settingData.productType || "Ring Setting"}</p>

                                <p className="font-medium">Vendor</p>
                                <p>{settingData.vendor || "—"}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default View2;