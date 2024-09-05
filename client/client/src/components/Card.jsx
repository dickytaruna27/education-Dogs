import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAsync } from "../features/getData";
export default function Card({ data, fetchData }) {
  const navigate = useNavigate();
  const dispacth = useDispatch();

  async function HandleDelete(e) {
    try {
      await axios.delete(`http://localhost:3000/dogs/${data.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      dispacth(fetchAsync());
    } catch (error) {}
  }

  function handleEdit() {
    navigate(`/edit-dogs/${data.id}`);
  }

  return (
    <>
      <div className="card bg-base-100 w-full sm:w-80 md:w-96 shadow-xl flex flex-col  hover:shadow-2xl hover:scale-105 transition duration-300 m-5 ">
        <figure className="w-full">
          <img
            src={data.Image}
            alt="dogs-image"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg sm:text-xl md:text-2xl text-cyan-700">
            {data.name}
          </h2>
          <h2 className="card-title text-lg sm:text-xl md:text-2xl text-red-900">
            {data.breed}
          </h2>
          <h3 className="card-title text-lg sm:text-xl md:text-2xl text-orange-300">
            {data.averangeAge}
          </h3>
          <h3 className="card-title text-lg sm:text-xl md:text-2xl text-orange-300">
            {data.averangeWeight}
          </h3>
          <p className="text-sm sm:text-base">{data.description}</p>
          <div className="card-actions justify-end">
            <button onClick={handleEdit} className="btn btn-primary">
              Change Name
            </button>
            <button
              onClick={() => HandleDelete(data.id)}
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
