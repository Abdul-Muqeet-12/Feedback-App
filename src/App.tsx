import { Route, Routes } from "react-router-dom";
import DetailView from "./components/DetailView";
import HomePage from "./pages/HomePage";
import RoadmapView from "./pages/RoadmapView";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feedback/:id" element={<DetailView />} />
            <Route path="/feedback/:id/edit" element={<DetailView />} />
            <Route path="/roadmap" element={<RoadmapView />} />

            <Route path="/add" element={<HomePage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
