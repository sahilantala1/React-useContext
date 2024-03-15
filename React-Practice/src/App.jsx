import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Create from "./components/Create";
import Postlist from "./components/Postlist";
// import PostListProvider from "./store/post-list-store";

function App() {
  const [selectedTab, setSelectedTab] = useState("Home");

  return (
    // <PostListProvider >
    <div className="app-container">
      <Sidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      ></Sidebar>
      <div className="content">
        <Header></Header>
        {selectedTab === "Home" ? <Postlist></Postlist> : <Create></Create>}
        <Footer></Footer>
      </div>
    </div>
    // </PostListProvider>
  );
}

export default App;
