import Dashboard from "../components/Dashboard/Dashboard";
import Navbar from "../components/Navigation/Navbar";
import TopBar from "../components/Topbar/TopBar";
import { useQuery } from "@apollo/client";
import FETCHPRODUCTS from "../graphql/Query/Getallproducts";
import AppLayout from "../components/Layout/AppLayout";

export default function Main() {
    
  return (
    <AppLayout>
      <TopBar />
      <Dashboard/>
    </AppLayout>
  );
}
