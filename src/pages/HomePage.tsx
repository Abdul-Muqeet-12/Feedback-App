import { ChevronDown, ChevronUp, MessageCircle, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import FeedbackModal from "../components/FeedbackModal";
import { addSuggestion, toggleUpvote } from "../redux/feedbackSlice";
import type {
  CategoryFilter,
  Suggestion,
  SuggestionFormData,
} from "../types/feedback";
import type { AppDispatch, RootState } from "../redux/store";

type SortOption =
  | "Most Upvotes"
  | "Least Upvotes"
  | "Most Comments"
  | "Least Comments";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  // Redux state
  const suggestions = useSelector(
    (state: RootState) => state.feedback.suggestions,
  );

  // Local UI state
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("Most Upvotes");
  const [filterCategory, setFilterCategory] = useState<CategoryFilter>("All");
  const filteredSuggestions =
    filterCategory === "All"
      ? suggestions
      : suggestions.filter(
          (suggestion) => suggestion.category === filterCategory,
        );

  const sortOptions: SortOption[] = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  // Modal state based on URL
  const modelOpen = location.pathname === "/add";

  // Roadmap counts
  const roadmapCount = useMemo(
    () => ({
      planned: suggestions.filter((s) => s.status === "Planned").length,
      inProgress: suggestions.filter((s) => s.status === "In Progress").length,
      live: suggestions.filter((s) => s.status === "Live").length,
    }),
    [suggestions],
  );

  // Open Add Feedback modal
  const openAdd = () => navigate("/add");

  // Close Add Feedback modal
  const closeModel = () => navigate(-1);

  // Add new suggestion
  const handleAdd = (payload: SuggestionFormData) => {
    dispatch(addSuggestion(payload));
    closeModel();
  };

  // Handle upvote
  const handleVotes = (id: number) => {
    dispatch(toggleUpvote(id));
  };

  // Open feedback details
  const handleView = (item: Suggestion) => {
    navigate(`/feedback/${item.id}`);
  };

  // Sort suggestions
  const sortedSuggestions = [...filteredSuggestions].sort((a, b) => {
    switch (sortBy) {
      case "Most Upvotes":
        return b.upvotes - a.upvotes;

      case "Least Upvotes":
        return a.upvotes - b.upvotes;

      case "Most Comments":
        return b.comments - a.comments;

      case "Least Comments":
        return a.comments - b.comments;

      default:
        return 0;
    }
  });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <Sidebar
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            roadmapCount={roadmapCount}
            openRoadmap={() => navigate("/roadmap")}
            openAdd={openAdd}
          />

          {/* Main Content */}
          <section className="lg:col-span-3">
            {/* Top Bar */}
            <div className="mb-5 flex flex-col gap-4 rounded-2xl bg-gray-800 p-5 text-white shadow-sm sm:flex-row sm:items-center sm:justify-between">
              {/* Left Side */}
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm text-gray-300">Product Feedback</p>

                  <h1 className="mt-1 text-lg font-bold">
                    {suggestions.length} Suggestions
                  </h1>
                </div>

                <div className="hidden h-8 w-px bg-gray-600 sm:block"></div>

                {/* Sort Dropdown */}
                <div className="relative flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-400">
                    Sort by:
                  </span>

                  <button
                    type="button"
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-white transition hover:bg-gray-700"
                  >
                    {sortBy}

                    <ChevronDown
                      size={17}
                      className={`transition-transform duration-200 ${
                        sortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Options */}
                  {sortOpen && (
                    <div className="absolute left-14 top-10 z-50 w-44 overflow-hidden rounded-xl border border-gray-600 bg-gray-700 py-1 shadow-xl">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSortBy(option);
                            setSortOpen(false);
                          }}
                          className={`block w-full px-4 py-2.5 text-left text-sm transition ${
                            sortBy === option
                              ? "bg-purple-600 font-semibold text-white"
                              : "text-gray-200 hover:bg-gray-600"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Add Feedback */}
              <button
                type="button"
                onClick={openAdd}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700 active:scale-[0.98]"
              >
                <Plus size={18} />
                Add Feedback
              </button>
            </div>

            {/* Feedback List */}
            <div className="space-y-4">
              {sortedSuggestions.map((suggestion) => (
                <article
                  key={suggestion.id}
                  onClick={() => handleView(suggestion)}
                  className="group cursor-pointer rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-purple-200 hover:shadow-md sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                    {/* Vote Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVotes(suggestion.id);
                      }}
                      className={`flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition sm:flex-col sm:px-3 sm:py-3 ${
                        suggestion.upvoted
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-600"
                      }`}
                    >
                      <ChevronUp size={18} />

                      <span>{suggestion.upvotes}</span>
                    </button>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h2 className="text-base font-bold text-gray-800 transition group-hover:text-purple-600 sm:text-lg">
                        {suggestion.title}
                      </h2>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {suggestion.description}
                      </p>

                      <span
                        className={`mt-4 inline-flex rounded-lg px-3 py-1.5 text-xs font-bold ${
                          suggestion.category === "Bug"
                            ? "bg-red-50 text-red-500"
                            : "bg-indigo-50 text-indigo-600"
                        }`}
                      >
                        {suggestion.category}
                      </span>
                    </div>

                    {/* Comments */}
                    <div className="flex items-center gap-2 text-gray-500">
                      <MessageCircle size={18} />

                      <span className="text-sm font-bold">
                        {suggestion.comments}
                      </span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Empty State */}
              {sortedSuggestions.length === 0 && (
                <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                  <h2 className="text-lg font-bold text-gray-800">
                    No suggestions found
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    There are no feedback suggestions to display.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Feedback Modal */}
        {modelOpen && (
          <FeedbackModal
            isOpen={modelOpen}
            onClose={closeModel}
            onAdd={handleAdd}
            editingFeedback={null}
          />
        )}
      </div>
    </main>
  );
}

export default HomePage;
