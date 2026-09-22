import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import RoadmapContent from "../components/RoadmapContent";
import RoadmapFeedbackModal from "../components/RoadmapFeedbackModal";

import { toggleUpvote, reorderSuggestion } from "../redux/feedbackSlice";

import type { Suggestion } from "../types/feedback";
import type { RootState, AppDispatch } from "../redux/store";

function RoadmapView() {
  const suggestions = useSelector(
    (state: RootState) => state.feedback.suggestions,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Handle upvote
  const handleUpvote = (id: number) => {
    dispatch(toggleUpvote(id));
  };

  // Handle reorder
  const handleReorder = (
    id: number,
    status: Suggestion["status"],
    newIndex: number,
  ) => {
    dispatch(
      reorderSuggestion({
        id,
        status,
        newIndex,
      }),
    );
  };

  const [selectedSuggestion, setSelectedSuggestion] =
    useState<Suggestion | null>(null);

  const handleView = (item: Suggestion) => {
    setSelectedSuggestion(item);
  };

  // Open Add Feedback
  const openAdd = () => {
    navigate("/add");
  };

  return (
    <div>
      {/* Back to Home */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-purple-600"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <RoadmapContent
        suggestions={suggestions}
        onView={handleView}
        onAdd={openAdd}
        onUpvote={handleUpvote}
        onReorder={handleReorder}
      />

      {selectedSuggestion && (
        <RoadmapFeedbackModal
          suggestion={selectedSuggestion}
          onClose={() => setSelectedSuggestion(null)}
        />
      )}
    </div>
  );
}

export default RoadmapView;
