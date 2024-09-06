import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
export default function BaseLayOut() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
