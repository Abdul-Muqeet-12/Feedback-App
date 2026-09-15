import {
  ArrowLeft,
  ChevronUp,
  Edit3,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import type { Comment, Suggestion } from "../types/feedback";

interface DetailPageProps {
  feedback: Suggestion;
  comments: Comment[];
  onBack: () => void;
  onUpvote: () => void;
  onOpenEdit: () => void;
  onAddComment: (suggestionId: number, comment: Comment) => void;
}

function DetailPage({
  feedback,
  comments,
  onBack,
  onUpvote,
  onOpenEdit,
  onAddComment,
}: DetailPageProps) {
  const [newComment, setNewComment] = useState<string>("");

  const handlePost = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      name: "Current User",
      username: "@currentuser",
      avatar: "https://i.pravatar.cc/150?img=8",
      text: newComment,
    };

    onAddComment(feedback.id, comment);
    setNewComment("");
  };

  return (
    <div className="space-y-5">
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-sm font-bold text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          Go Back
        </button>

        <button
          onClick={onOpenEdit}
          className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100"
        >
          Edit Feedback
        </button>
      </div>

      {/* Feedback Card */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          {/* Vote */}
          <div>
            <button
              onClick={onUpvote}
              className={`flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition sm:flex-col sm:px-3 sm:py-3
                ${feedback.upvoted ? "bg-purple-600 text-white" : "bg-gray-100 hover:text-purple-600 hover:bg-purple-100 text-gray-700"}
                `}
            >
              <ChevronUp size={19} />
              <span>{feedback.upvotes}</span>
            </button>
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              {feedback.title}
            </h1>

            <p className="mt-3 text-sm leading-7 text-gray-500 sm:text-base">
              {feedback.description}
            </p>

            <span className="mt-5 inline-flex rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
              {feedback.category}
            </span>
          </div>

          {/* Edit */}
          <div>
            <button
              onClick={onOpenEdit}
              className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-bold text-indigo-600 transition hover:bg-indigo-100"
            >
              <Edit3 size={16} />
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <MessageCircle size={20} className="text-purple-600" />

          <h2 className="text-lg font-bold text-gray-800">{comments.length}</h2>
        </div>

        {/* Comment */}
        {comments.length > 0 && (
          <div className="border-b border-gray-100 pb-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                {/* Avatar */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-600">
                  <img
                    src={comment.avatar}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800">
                        {comment.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        {comment.username}
                      </p>
                    </div>

                    <button className="mt-2 text-xs font-bold text-purple-600 hover:underline sm:mt-0">
                      Reply
                    </button>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-gray-500">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment */}
        <div className="pt-6">
          <label
            htmlFor="comment"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Add Comment
          </label>

          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10"
          />

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-gray-400">
              {250 - newComment.length} characters left
            </span>

            <button
              onClick={handlePost}
              disabled={!newComment.trim()}
              className="rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700 active:scale-[0.98]"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Delete */}
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-100">
          <Trash2 size={16} />
          Delete Feedback
        </button>
      </div>
    </div>
  );
}

export default DetailPage;
