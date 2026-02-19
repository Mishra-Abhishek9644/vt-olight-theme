// ✅ Imports
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import BackBtn from './BackBtn'
import GIA from '../assets/Gia.svg'
import share from "../assets/share.svg"
import truck from "../assets/truck.svg"
import { useDispatch, useSelector } from 'react-redux'
import { setDiamond } from "../store/slices/cartSlice";
import { setSetting } from "../store/slices/cartSlice"


// Helper: detect if video URL is a direct .mp4 file
const isDirectVideo = (url) => url.endsWith(".mp4") || url.endsWith(".webm");

const View = () => {
  const dispatch = useDispatch();
  const { sku } = useParams();

  const [diamondData, setDiamondData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(0);
  const [media, setMedia] = useState([]);

  // ======================================================
  // ⭐ Fetch Single Diamond
  // ======================================================
  const selectedSetting = useSelector(
    (state) => state.cart.selectedSetting);

  useEffect(() => {
    const fetchDiamond = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`http://localhost:3000/api/diamonds/${sku}`);
        if (!res.ok) throw new Error("Failed to fetch diamond");

        const data = await res.json();
        setDiamondData(data);

      } catch (err) {
        console.error(err);
        setError("Failed to load diamond");
      } finally {
        setLoading(false);
      }
    };

    fetchDiamond();
  }, [sku]);

  // ======================================================
  // ⭐ Build gallery AFTER diamond is loaded
  // ======================================================
  useEffect(() => {
    if (!diamondData) return;

    const gallery = [
      { type: "video", src: diamondData.video },
      { type: "image", src: diamondData.image },
      { type: "gia", src: GIA }
    ];

    setMedia(gallery);
  }, [diamondData]);

  // ======================================================
  // ⭐ SAFE CHECKS TO PREVENT ERRORS
  // ======================================================
  if (loading) return <div className='p-4 text-xl'>Loading diamond...</div>;
  if (error) return <div className='p-4 text-red-500'>{error}</div>;
  if (!diamondData) return <div className='p-4'>No diamond found.</div>;

  // ⭐ Prevent crash when media hasn't loaded yet
  if (!media.length || !media[selected]) {
    return <div className='p-4'>Loading gallery...</div>;
  }

  const current = media[selected]; // safe now 

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
            <div className='border-2 border-brand rounded-2xl w-full h-[450px] 
                flex items-center justify-center p-5 bg-white overflow-hidden'>

              {current.type === "video" ? (
                isDirectVideo(current.src) ? (
                  <video
                    src={current.src}
                    controls
                    className='w-full h-full object-contain'
                  />
                ) : (
                  <iframe
                    src={current.src}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                )
              ) : (
                <img
                  src={current.src}
                  className='w-full h-full object-contain'
                />
              )}

            </div>

            {/* THUMBNAILS */}
            <div className='grid grid-cols-3yo gap-3 mt-4'>
              {media.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelected(index)}
                  className={`w-24 h-24 rounded-xl border cursor-pointer overflow-hidden 
                    ${selected === index ? "border-brand" : "border-gray-300"}`}
                >
                  {item.type === "video" ? (
                    <div className='w-full h-full bg-gray-200 flex items-center justify-center'>
                      <span className='text-3xl'>▶</span>
                    </div>
                  ) : (
                    <img src={item.src} className='w-full h-full object-contain' />
                  )}
                </div>
              ))}
            </div>

          </div>

          {/* ====================================================== */}
          {/* ⭐ RIGHT SIDE — Product Info */}
          {/* ====================================================== */}
          <div className='flex flex-col gap-1 p-4'>

            <h1 className='text-xl md:text-2xl font-bold'>
              {diamondData.carat} Carat {diamondData.shape} Diamond
            </h1>

            <div className='flex gap-2 items-center text-lg'>
              <p className='text-brand font-semibold'>${diamondData.price}</p>
              <p className='line-through text-gray-400'>$999.00</p>
              <p className='text-sm'>(Diamond Only)</p>
            </div>

            <p className='text-base md:text-xl my-2'>
              {diamondData.cut || "Good"} Cut · {diamondData.color} Color · {diamondData.clarity} Clarity
            </p>

            {/* Buttons */}
            <div className='flex gap-2 items-center justify-start mt-2'>

              {!selectedSetting ? (
                <Link to="/settings">
                  <button
                    className='bg-brand text-white text-base p-3 px-10 rounded-md hover:scale-105'
                    onClick={() => dispatch(setDiamond(diamondData))}
                  >
                    Select This Diamond
                  </button>
                </Link>
              ) : (
                <Link to="/complete">
                  <button
                    className='bg-brand text-white text-base p-3 px-10 rounded-md hover:scale-105'
                    onClick={() => dispatch(setDiamond(diamondData))}
                  >
                    Select This Diamond
                  </button>
                </Link>
              )}

              <button>
                <img
                  src={share}
                  className='object-contain h-11 w-12 p-2 border-2 border-brand'
                />
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
            <div className="md:mt-10">
              <h2 className="text-2xl font-semibold text-brand mb-4">Diamond Information</h2>

              <table className="w-full border border-gray-300 text-sm">
                <tbody>
                  <tr className="border border-gray-300">
                    <td className="p-2 font-medium text-brand">Lab</td>
                    <td className="p-2">GIA</td>

                    <td className="p-2 font-medium text-brand">Carat</td>
                    <td className="p-2">{diamondData.carat}</td>
                  </tr>

                  <tr className="border border-gray-300">
                    <td className="p-2 font-medium text-brand">Clarity</td>
                    <td className="p-2">{diamondData.clarity}</td>

                    <td className="p-2 font-medium text-brand">Color</td>
                    <td className="p-2">{diamondData.color}</td>
                  </tr>

                  <tr className="border border-gray-300">
                    <td className="p-2 font-medium text-brand">Polish</td>
                    <td className="p-2">{diamondData.polish}</td>

                    <td className="p-2 font-medium text-brand">Fluorescence</td>
                    <td className="p-2">{diamondData.fluorescence}</td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default View
