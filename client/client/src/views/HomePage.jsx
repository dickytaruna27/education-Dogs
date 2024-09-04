import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

export default function HomePage() {
  const [Dog, setDog] = useState([]);
  async function fetchData() {
    try {
      const { data } = await axios.get("http://localhost:3000/dogs", {
        headers: {
          Authorization: ` Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data.dataDogs);
      setDog(data.dataDogs);
    } catch (error) {}
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-slate-50 flex flex-wrap justify-around">
        {Dog.map((dogs) => (
          <Card data={dogs} key={dogs.id} />
        ))}
      </div>
    </>
  );
}
