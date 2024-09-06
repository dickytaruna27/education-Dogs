import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddForm() {
  const navigate = useNavigate();
  const [Image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3hTQwsrGuYW0XGXbIB4d2noVL1ZhL7llERA&s"
  );
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [averangeAge, setAverageAge] = useState("");
  const [averangeWeight, setAverageWeight] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("img", file);
    try {
      const { data } = await axios.post(
        "https://doggieverse.dickytaruna.online/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(file);
      console.log(data.aiResponse);
      setImage(data.imageUrl);
      setName(data.aiResponse.name);
      setBreed(data.aiResponse.breed);
      setAverageAge(data.aiResponse.averangeAge);
      setAverageWeight(data.aiResponse.averangeWeight);
      setDescription(data.aiResponse.description);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {
        name,
        breed,
        averangeAge,
        averangeWeight,
        description,
        Image,
      };
      await axios.post("https://doggieverse.dickytaruna.online/dogs", body, {
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setImage();
      setName("");
      setBreed("");
      setAverageAge("");
      setAverageWeight("");
      setDescription("");

      console.log(body);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Dog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700 flex flex-col items-center"
            htmlFor="image"
          >
            Image
            <img
              src={Image}
              alt="dogs-image"
              className="object-cover w-32 h-32 mt-2 rounded border border-gray-300"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="breed"
          >
            Breed
          </label>
          <input
            type="text"
            id="breed"
            name="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="averageAge"
          >
            Average Age
          </label>
          <input
            type="text"
            id="averageAge"
            name="averageAge"
            value={averangeAge}
            onChange={(e) => setAverageAge(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="averageWeight"
          >
            Average Weight (kg)
          </label>
          <input
            type="text"
            id="averageWeight"
            name="averageWeight"
            value={averangeWeight}
            onChange={(e) => setAverageWeight(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
        >
          Add to public
        </button>
      </form>
    </div>
  );
}
