import {
  ArrowLeft,
  ChevronUp,
  MessageCircle,
  Send,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addComment,
  deleteSuggestion,
  toggleUpvote,
} from "../redux/feedbackSlice";
import type { AppDispatch, RootState } from "../redux/store";
import type { Suggestion } from "../types/feedback";

interface RoadmapFeedbackModalProps {
  suggestion: Suggestion;
  onClose: () => void;
}

function RoadmapFeedbackModal({
  suggestion,
  onClose,
}: RoadmapFeedbackModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector(
    (state: RootState) => state.feedback.comments[suggestion.id] || [],
  );

  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  // Add comment
  const handleAddComment = () => {
    const text = commentText.trim();

    if (!text) return;

    dispatch(
      addComment({
        suggestionId: suggestion.id,
        comment: {
          id: Date.now(),
          name: "Current User",
          username: "currentuser",
          avatar: `https://i.pravatar.cc/150?img=${(comments.length % 70) + 1}`,
          text,
        },
      }),
    );

    setCommentText("");
  };

  // Upvote
  const handleUpvote = () => {
    dispatch(toggleUpvote(suggestion.id));
  };

  // Edit feedback
  const handleEdit = () => {
    onClose();
    navigate(`/feedback/${suggestion.id}/edit`);
  };

  // Delete feedback
  const handleDelete = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this feedback?",
    );

    if (!confirmed) return;

    dispatch(deleteSuggestion(suggestion.id));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-gray-50 shadow-2xl">
        {/* Modal Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-bold text-gray-500 transition hover:text-purple-600"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close feedback"
            className="text-gray-400 transition hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
          <div className="mx-auto max-w-3xl">
            {/* Feedback Card */}
            <article className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {/* Upvote */}
                <button
                  type="button"
                  onClick={handleUpvote}
                  className={`flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition sm:flex-col sm:px-3 sm:py-3 ${
                    suggestion.upvoted
                      ? "bg-purple-100 text-purple-600"
                      : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600"
                  }`}
                >
                  <ChevronUp size={18} />

                  <span>{suggestion.upvotes}</span>
                </button>

                {/* Feedback Details */}
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-bold text-gray-800">
                    {suggestion.title}
                  </h1>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {suggestion.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-bold ${
                        suggestion.category === "Bug"
                          ? "bg-red-50 text-red-500"
                          : "bg-indigo-50 text-indigo-600"
                      }`}
                    >
                      {suggestion.category}
                    </span>

                    <span
                      className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-bold ${
                        suggestion.status === "Planned"
                          ? "bg-orange-50 text-orange-500"
                          : suggestion.status === "In Progress"
                            ? "bg-purple-50 text-purple-600"
                            : "bg-cyan-50 text-cyan-600"
                      }`}
                    >
                      {suggestion.status}
                    </span>
                  </div>
                </div>

                {/* Comments Count */}
                <div className="flex items-center gap-2 text-gray-500">
                  <MessageCircle size={18} />

                  <span className="text-sm font-bold">
                    {suggestion.comments}
                  </span>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <section className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <MessageCircle size={20} className="text-gray-500" />

                <h2 className="text-lg font-bold text-gray-800">
                  {comments.length} Comments
                </h2>
              </div>

              {/* Comments List */}
              <div className="mt-6 space-y-6">
                {comments.length === 0 ? (
                  <p className="text-sm text-gray-400">
                    No comments yet. Be the first to comment.
                  </p>
                ) : (
                  comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-3 border-b border-gray-100 pb-5 last:border-b-0 last:pb-0"
                    >
                      {/* Avatar */}
                      <img
                        src={comment.avatar}
                        alt={comment.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                      />

                      {/* Comment */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className="text-sm font-bold text-gray-800">
                              {comment.name}
                            </p>

                            <p className="text-xs text-gray-400">
                              @{comment.username}
                            </p>
                          </div>

                          <button
                            type="button"
                            className="mt-2 w-fit text-xs font-semibold text-gray-400 transition hover:text-purple-600 sm:mt-0"
                          >
                            Reply
                          </button>
                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-500">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment */}
              <div className="mt-7 border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-800">Add Comment</h3>

                <textarea
                  value={commentText}
                  onChange={(e) => {
                    if (e.target.value.length <= 250) {
                      setCommentText(e.target.value);
                    }
                  }}
                  placeholder="Write your comment here..."
                  rows={4}
                  className="mt-3 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {commentText.length}/250
                  </span>

                  <button
                    type="button"
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                    className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Send size={16} />
                    Post Comment
                  </button>
                </div>
              </div>
            </section>

            {/* Delete Feedback */}
            {/* Edit & Delete Feedback */}
            <div className="mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={handleEdit}
                className="text-sm font-semibold text-purple-600 transition hover:text-purple-700"
              >
                Edit Feedback
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="flex items-center gap-2 text-sm font-semibold text-red-500 transition hover:text-red-600"
              >
                <Trash2 size={17} />
                Delete Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoadmapFeedbackModal;
