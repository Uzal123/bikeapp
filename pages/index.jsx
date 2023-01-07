import Dashboard from "../components/Dashboard/Dashboard";
import Navbar from "../components/Navigation/Navbar";
import TopBar from "../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import App from "../components/Layout/App";
import FETCHPRODUCTS from "../graphql/Query/Getallproducts";

export default function Main() {
    
  const { loading, error, data } = useQuery(FETCHPRODUCTS, {
    variables: {
      fetchInput: {
        offerType: ["re", "se"],
        pageNo: 1,
        count: 10,
      },
    },
  });

  console.log(data);

  return (
    <App>
      <TopBar />
      <Dashboard data={data} />
    </App>
  );
}
