import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <>
      <nav className="bg-blue-400 border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://png.pngtree.com/png-clipart/20191121/original/pngtree-dog-logo-design-vector-icon-png-image_5149990.jpg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DoggieVerse
            </span>
          </button>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <button
              onClick={handleLogout}
              className="text-sm text-black dark:text-blue-500 hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/add-dogs")}
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  Add Dogs
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
