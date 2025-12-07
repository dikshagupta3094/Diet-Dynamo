
import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../Layout/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllDietExpert } from "../Redux/slice/expert.slice";

function OurExpert() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { dietExpert, isLoading, error } = useSelector((state) => state.expert);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      console.log("Dispatching getAllDietExpert");
      dispatch(getAllDietExpert())
        .unwrap()
        .then((res) => console.log("API success:", res))
        .catch((err) => console.log("API error:", err));
    }
  }, [dispatch, navigate, isLoggedIn]);

  return (
    <HomeLayout>
      <div className="mx-auto py-8 px-8">
        <h1 className="text-4xl font-extrabold text-center">Our Diet Experts</h1>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-wrap gap-4 justify-center mt-6">
        <div className="flex flex-wrap gap-4 justify-center mt-6">
  {dietExpert?.length > 0 ? (
    dietExpert.map((expert) => (
      <div key={expert._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-64">
        <img src={expert.avatar.secure_url} alt={expert.name} className="w-24 h-24 rounded-full mb-4 object-cover" />
        <h2 className="text-xl font-semibold mb-2">{expert.name}</h2>
        <p className="text-gray-600 text-center mb-4">{expert.description}</p>
        <button className="bg-blue-400 text-white hover:bg-blue-600 px-4 py-2 rounded cursor-pointer">Post Query</button>
      </div>
    ))
  ) : (
    <p>No experts found.</p>
  )}
</div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default OurExpert;
