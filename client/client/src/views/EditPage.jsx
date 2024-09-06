import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPage() {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://doggieverse.dickytaruna.online/dogs/${id}`,
        { name },
        {
          headers: {
            Authorization: `Berare ${localStorage.access_token}`,
          },
        }
      );
      navigate("/");
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 shadow-lg rounded-lg bg-white"
    >
      <h2 className="text-2xl font-bold mb-4">Change Name Dog</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Save Change
      </button>
    </form>
  );
}
