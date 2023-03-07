import Dashboard from "../components/Dashboard/Dashboard";
import TopBar from "../components/Topbar/TopBar";
import AppLayout from "../components/Layout/AppLayout";

export default function Main() {
  return (
    <AppLayout title="Home">
      <TopBar />
      <Dashboard />
    </AppLayout>
  );
}
