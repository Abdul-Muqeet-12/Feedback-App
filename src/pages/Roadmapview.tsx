import RoadmapContent from "../components/RoadmapContent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleUpvote } from "../redux/feedbackSlice";
import type { Suggestion } from "../types/feedback";
import type { RootState, AppDispatch } from "../redux/store";

function RoadmapView() {
  const suggestions = useSelector(
    (state: RootState) => state.feedback.suggestions,
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleUpvote = (id: number) => {
    dispatch(toggleUpvote(id));
  };

  const handleView = (item: Suggestion) => {
    navigate(`/feedback/${item.id}`);
  };
  const openAdd = () => {
    navigate("/add");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      {/* Roadmap */}
      <RoadmapContent
        suggestions={suggestions}
        onBack={() => navigate("/")}
        onView={handleView}
        onAdd={openAdd}
        onUpvote={handleUpvote}
      />
    </main>
  );
}

export default RoadmapView;
