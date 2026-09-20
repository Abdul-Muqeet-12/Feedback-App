import { X } from "lucide-react";
import RoadmapContent from "./RoadmapContent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleUpvote, reorderSuggestion } from "../redux/feedbackSlice";
import type { Suggestion } from "../types/feedback";
import type { RootState, AppDispatch } from "../redux/store";

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RoadmapModal({ isOpen, onClose }: RoadmapModalProps) {
  const suggestions = useSelector(
    (state: RootState) => state.feedback.suggestions,
  );

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Handle upvote
  const handleUpvote = (id: number) => {
    dispatch(toggleUpvote(id));
  };

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

  // Open feedback details
  const handleView = (item: Suggestion) => {
    onClose();
    navigate(`/feedback/${item.id}`);
  };

  // Open Add Feedback modal
  const openAdd = () => {
    onClose();
    navigate("/add");
  };

  // Don't render modal when closed
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-gray-50 shadow-2xl">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-gray-800 px-5 py-4 text-white sm:px-6">
          <div>
            <h2 className="text-xl font-bold">Roadmap</h2>

            <p className="mt-1 text-sm text-gray-300">
              Track the progress of product feedback and upcoming improvements.
            </p>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close roadmap"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-300 transition hover:bg-gray-700 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-5 sm:p-6">
          <RoadmapContent
            suggestions={suggestions}
            onView={handleView}
            onAdd={openAdd}
            onUpvote={handleUpvote}
            onReorder={handleReorder}
          />
        </div>
      </div>
    </div>
  );
}

export default RoadmapModal;
