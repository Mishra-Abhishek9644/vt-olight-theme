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
import { setDiamond } from "../store/slices/cartSlice"
import { toast } from 'react-toastify'




const View2 = () => {

    const { id } = useParams();
    const dispatch = useDispatch()

    const [settingData, setSettingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [active, setActive] = useState("video");

    const selectedDiamond = useSelector(
        (state) => state.cart.selectedDiamond);
    // ======================================================
    // ⭐ Fetch Single Diamond
    // ======================================================
    function renderContent(active, settingData) {
        switch (active) {
            case "video":
                return (<iframe
                    src={settingData.video}
                    className="w-full h-[75vh] object-contain p-2 bg-black "
                    allow="autoplay; encrypted-media"
                    allowFullScreen

                />);
            case "image1":
                return (
                    <img
                        src={settingData.additional_image_1}
                        className='w-full h-full object-contain'
                    />
                );
            case "image2":
                return (
                    <img
                        src={settingData.additional_image_2}
                        className='w-full h-full object-contain'
                    />
                );
            case "image3":
                return (
                    <img
                        src={settingData.additional_image_3}
                        className='w-full h-full object-contain'
                    />
                );

            default:
                break;
        }
    }

    useEffect(() => {

        const fetchSetting = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(`http://localhost:3000/api/settings/${id}`);
                if (!res.ok) throw new Error("Failed to fetch setting");

                const data = await res.json();
                setSettingData(data);

            } catch (err) {
                console.error(err);
                setError("Failed to load diamond");
            } finally {
                setLoading(false);
            }
        };

        fetchSetting();
    }, [id]);

    // ======================================================
    // ⭐ Build gallery AFTER diamond is loaded
    // ======================================================
    useEffect(() => {
        if (!settingData) return;
    }, [settingData]);

    // ======================================================
    // ⭐ SAFE CHECKS TO PREVENT ERRORS
    // ======================================================
    if (loading) return <div className='p-4 text-xl'>Loading diamond...</div>;
    if (error) return <div className='p-4 text-red-500'>{error}</div>;
    if (!settingData) return <div className='p-4'>No diamond found.</div>;

    // ⭐ Prevent crash when media hasn't loaded yet
    //   if (!media.length || !media[selected]) {
    //     return <div className='p-4'>Loading gallery...</div>;
    //   }

    //   const current = media[selected]; // safe now 

    return (
        <>
            <BackBtn />

            <div className='sm:container-sm md:container-md lg:container-lg mt-5'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {/* ====================================================== */}
                    {/* ⭐ LEFT: Dynamic Gallery */}
                    {/* ====================================================== */}
                    <div className='flex flex-col justify-start items-center'>

                        {/* MAIN PREVIEW WINDOW */}
                        <div className='border-2 border-brand rounded-2xl w-full h-[80vh] 
                flex items-center justify-center p-5 bg-white overflow-hidden'>

                            {renderContent(active, settingData)}

                        </div>

                        {/* THUMBNAILS */}
                        <div className='grid grid-cols-4 justify-start gap-3 mt-4'>

                            <button onClick={() => setActive("video")}
                                className={`border-2 rounded-2xl  border-gray-300 ${active === "video" ? "  border-brand" : ""}`}>
                                <p className='text-6xl hover:scale-110'><span className='hover:scale-105'>▷</span></p>
                            </button>

                            <button onClick={() => setActive("image1")}
                                className={`border-2 rounded-2xl  border-gray-300 ${active === "video" ? "  border-brand" : ""}`}>
                                <img src={settingData.additional_image_1} className='p-2' />
                            </button>

                            <button onClick={() => setActive("image2")}
                                className={`border-2 rounded-2xl  border-gray-300 ${active === "video" ? "  border-brand" : ""}`}>
                                <img src={settingData.additional_image_2} className='p-2' />
                            </button>

                            <button onClick={() => setActive("image3")}
                                className={`border-2 rounded-2xl  border-gray-300 ${active === "video" ? "  border-brand" : ""}`}>
                                <img src={settingData.additional_image_3} className='p-2' />
                            </button>

                        </div>

                    </div>

                    {/* ====================================================== */}
                    {/* ⭐ RIGHT SIDE — Product Info */}
                    {/* ====================================================== */}
                    <div className='flex flex-col gap-1 p-4'>



                        <div className='flex gap-2 justify-center items-start text-lg flex-col'>
                            <h1 className='text-xl md:text-2xl font-bold'>
                                {settingData.title}
                            </h1>
                            <p className='text-brand font-semibold text-3xl flex items-center gap-2'>{settingData.currency_symbol}{settingData.price}  <span className='text-gray-500 text-base'>( Setting Only )</span></p>

                            <p className='text-sm md:text-base my-2'>
                                Elegant and timeless, this minimalist engagement ring features a your choice of diamond. Perfect for modern love, crafted with ethically sourced materials.                        </p>
                        </div>



                        <div>
                            <div><DiamondShapeSet /></div>
                            <div><Metal /></div>
                        </div>

                        {/* Buttons */}
                        <div className='flex gap-2 items-center justify-start mt-2'>
                            {!selectedDiamond ? (
                                <Link to="/diamond"><button className='bg-brand text-white text-base p-3 px-10 rounded-md hover:scale-105'
                                    onClick={() => {
                                        dispatch(setSetting(settingData))
                                        toast.success("Setting Selected")
                                    }}
                                >
                                    Select This Setting
                                </button></Link>
                            ) : (<Link to="/complete"><button className='bg-brand text-white text-base p-3 px-10 rounded-md hover:scale-105'
                                onClick={() => {
                                    dispatch(setSetting(settingData))
                                    toast.success("Setting Selected")
                                }}
                            >
                                Select This Setting
                            </button></Link>)}

                            <button>
                                <img src={share} className='object-contain h-11 w-12 p-2 border-2 border-brand' />
                            </button>
                        </div>

                        <button className='bg-brand text-white text-base p-3 px-10 mt-3 rounded-md'>
                            Add To Cart
                        </button>

                        {/* Shipping */}
                        <p className='flex gap-2 items-center my-1'>
                            <img src={truck} className='h-6 w-6' />
                            Free insured shipping, Risk-Free Retail
                        </p>

                        <p className='flex gap-2 items-center my-1'>
                            <img src={truck} className='h-6 w-6' />
                            Free 30-Day Returns, Free Resizing, Lifetime Warranty
                        </p>

                        {/* Diamond Details */}
                        <div className="md:mt-10 flex flex-col gap-4">
                            <h2 className="text-2xl font-semibold text-brand mb-4">Diamond Information</h2>

                            <div className="grid grid-cols-2 gap-y-3">
                                <p className="font-medium">SKU</p>
                                <p>{settingData.sku}</p>

                                <p className="font-medium">Setting Style</p>
                                <p>{settingData.ring_style}</p>

                                <p className="font-medium">Sizes Available</p>
                                <p>—</p>

                                <p className="font-medium">Width Range</p>
                                <p>{settingData.sku}</p>

                                <p className="font-medium">Can Be Set With</p>
                                <p>{settingData.sku}</p>

                                <p className="font-medium">Metal</p>
                                <p>{settingData.metal}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default View2
