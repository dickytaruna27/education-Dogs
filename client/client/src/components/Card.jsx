export default function Card({ data }) {
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
          <h2 className="card-title text-lg sm:text-xl md:text-2xl">
            {data.name}
          </h2>
          <p className="text-sm sm:text-base">{data.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Edit</button>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
}
