import { useNavigate } from "react-router-dom";

const BackBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="px-4 py-2 bg-brand text-white rounded-md hover:bg-[#6d3382] transition"
    >
      ← Go Back
    </button>
  );
};

export default BackBtn;
