import DetailPage from "../pages/DetailPage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import {
  addComment,
  deleteSuggestion,
  toggleUpvote,
  updateSuggestion,
} from "../redux/feedbackSlice";
import FeedbackModal from "./FeedbackModal";
import type {
  Comment,
  Suggestion,
  UpdateSuggestionPayload,
} from "../types/feedback";
import type { AppDispatch, RootState } from "../redux/store";

function DetailView() {
  const { id } = useParams<{ id: string }>();
  const suggestionId = Number(id);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const suggestions = useSelector(
    (state: RootState) => state.feedback.suggestions,
  );

  const comments = useSelector((state: RootState) => state.feedback.comments);

  const feedback = useMemo(() => {
    return suggestions.find((s) => s.id === suggestionId);
  }, [suggestions, suggestionId]);

  useEffect(() => {
    if (!feedback) {
      navigate("/");
    }
  }, [feedback, navigate]);

  if (!feedback) return null;

  const isEditRoute = location.pathname.endsWith("/edit");
  const closeModal = () => navigate(-1);

  const handleUpvote = () => dispatch(toggleUpvote(feedback.id));

  const handleAddComments = (suggestionId: number, comment: Comment) => {
    dispatch(addComment({ suggestionId, comment }));
  };

  const handleUpdate = (payload: UpdateSuggestionPayload) => {
  dispatch(updateSuggestion(payload));
  closeModal();
};

  const handleDelete = (id: number) => {
  dispatch(deleteSuggestion(id));
  navigate("/");
};

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Back Button */}

        {/* Detail */}
        <DetailPage
          feedback={feedback}
          comments={comments[feedback.id] || []}
          onBack={() => navigate("/")}
          onUpvote={handleUpvote}
          onOpenEdit={() => navigate(`/feedback/${feedback.id}/edit`)}
          onAddComment={handleAddComments}
        />

        <FeedbackModal
          isOpen={isEditRoute}
          onClose={closeModal}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          editingFeedback={isEditRoute ? feedback : null}
        />
      </div>
    </main>
  );
}

export default DetailView;
