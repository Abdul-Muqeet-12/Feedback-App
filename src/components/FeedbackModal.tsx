import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type {
  Category,
  Status,
  Suggestion,
  SuggestionFormData,
} from "../types/feedback";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (data: SuggestionFormData) => void;
  onUpdate?: (data: Suggestion) => void;
  onDelete?: (id: number) => void;
  editingFeedback?: Suggestion | null;
}

function FeedbackModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  onDelete,
  editingFeedback,
}: FeedbackModalProps) {
  const [formData, setFormData] = useState<SuggestionFormData>({
    title: "",
    category: "Feature",
    status: "Planned",
    description: "",
  });

  useEffect(() => {
    if (editingFeedback) {
      setFormData({
        title: editingFeedback.title || "",
        category: editingFeedback.category || "Feature",
        status: editingFeedback.status || "Planned",
        description: editingFeedback.description || "",
      });
    } else {
      setFormData({
        title: "",
        category: "Feature",
        status: "Planned",
        description: "",
      });
    }
  }, [editingFeedback, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingFeedback) {
      onUpdate && onUpdate({ ...editingFeedback, ...formData });
    } else {
      onAdd && onAdd(formData);
    }
  };

  const handleDelete = () => {
    if (!editingFeedback) return;
    if (window.confirm("Are you sure you want to delete this feedback")) {
      onDelete && onDelete(editingFeedback.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[900vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingFeedback ? "Edit Feedback" : "Create New Feedback"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-2">
            <label
              htmlFor=""
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Feedback Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Add a short, descriptive headline"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor=""
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Category,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Feature">Feature</option>
              <option value="UI">UI</option>
              <option value="UX">UX</option>
              <option value="Enhancement">Enhancement</option>
              <option value="Bug">Bug</option>
            </select>
          </div>

          <div className="mb-2">
            <label
              htmlFor=""
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as Status })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Planned">Planned</option>
              <option value="In Progress">In Progress</option>
              <option value="Live">Live</option>
            </select>
          </div>

          <div className="mb-2">
            <label
              htmlFor=""
              className="block text-sm font-bold text-gray-700 mb-2"
            >
              Feedback Details
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            {editingFeedback && (
              <button
                onClick={handleDelete}
                type="button"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Delete
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {editingFeedback ? "Save Change" : "Add Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FeedbackModal;
