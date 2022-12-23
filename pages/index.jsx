import Dashboard from "../components/Dashboard/Dashboard";
import Navbar from "../components/Navigation/Navbar";
import TopBar from "../components/Topbar/TopBar";
import GET_RENTED from "../graphql/Query/GetAllRentedProducts";
import { useQuery } from "@apollo/client";
import GET_SELLING from "../graphql/Query/GetAllSellingProducts";
import App from "../components/Layout/App";

export default function Main() {
  const rentitems = () => {
    const { loading, error, data } = useQuery(GET_RENTED);
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return data;
  };

  const sellitems = () => {
    const { loading, error, data } = useQuery(GET_SELLING);
    if (loading) return null;
    if (error) return `Error! ${error}`;

    return data;
  };

  return (
    <App>
      <TopBar className="topbar" />
      <Dashboard rent={rentitems()} sell={sellitems()} className="container"/>
    </App>
  );
}
