import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import { fetchAsync } from "../features/getData";

export default function HomePage() {
  const dispact = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.getData);
  useEffect(() => {
    dispact(fetchAsync());
  }, []);

  return (
    <>
      <div className="bg-slate-50 flex flex-wrap justify-around">
        {!error &&
          reviews.map((data) => {
            return <Card data={data} key={data.id} />;
          })}
      </div>
    </>
  );
}
