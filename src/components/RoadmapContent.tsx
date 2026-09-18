import { useState } from "react";
import { ChevronUp, MessageCircle, Plus } from "lucide-react";
import type { Suggestion } from "../types/feedback";

interface RoadmapContentProps {
  suggestions: Suggestion[];
  onView: (item: Suggestion) => void;
  onAdd: () => void;
  onUpvote: (id: number) => void;
  onStatusChange: (id: number, status: Suggestion["status"]) => void;
}

function RoadmapContent({
  suggestions,
  onView,
  onAdd,
  onUpvote,
  onStatusChange,
}: RoadmapContentProps) {
  const statusCategories = [
    {
      name: "Planned" as const,
      color: "orange",
      description: "Ideas that are planned for development.",
      items: suggestions.filter((s) => s.status === "Planned"),
    },
    {
      name: "In Progress" as const,
      color: "purple",
      description: "Features currently being worked on.",
      items: suggestions.filter((s) => s.status === "In Progress"),
    },
    {
      name: "Live" as const,
      color: "cyan",
      description: "Features that are already available.",
      items: suggestions.filter((s) => s.status === "Live"),
    },
  ];

  const [draggingId, setDraggingId] = useState<number | null>(null);

  return (
    <div>
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-2xl bg-gray-800 p-5 text-white shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">Roadmap</h1>

              <p className="mt-1 text-sm text-gray-400">
                Track the progress of product feedback and upcoming
                improvements.
              </p>
            </div>

            <button
              type="button"
              onClick={onAdd}
              className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-purple-700 active:scale-[0.98]"
            >
              <Plus size={18} />
              Add Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Roadmap Columns */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {statusCategories.map((category) => (
          <section
            key={category.name}
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
            }}
            onDrop={(e) => {
              e.preventDefault();

              const id = Number(e.dataTransfer.getData("suggestionId"));

              if (!id) return;

              onStatusChange(id, category.name);
              setDraggingId(null);
            }}
          >
            {/* Category Header */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span
                  className={`h-3 w-3 rounded-full ${
                    category.color === "orange"
                      ? "bg-orange-400"
                      : category.color === "purple"
                        ? "bg-purple-500"
                        : "bg-cyan-400"
                  }`}
                ></span>

                <h2 className="text-lg font-bold text-gray-800">
                  {category.name} ({category.items.length})
                </h2>
              </div>

              <p className="mt-1 text-sm text-gray-500">
                {category.description}
              </p>
            </div>

            {/* Feedback Items */}
            <div className="space-y-4">
              {category.items.map((suggestion) => (
                <article
                  key={suggestion.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggingId(suggestion.id);
                    e.dataTransfer.setData(
                      "suggestionId",
                      String(suggestion.id),
                    );
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  onDragEnd={() => {
                    setDraggingId(null);
                  }}
                  onClick={() => onView(suggestion)}
                  className={`cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                    category.color === "orange"
                      ? "border-t-4 border-t-orange-400"
                      : category.color === "purple"
                        ? "border-t-4 border-t-purple-500"
                        : "border-t-4 border-t-cyan-400"
                  }`}
                >
                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-800 transition hover:text-purple-600">
                    {suggestion.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {suggestion.description}
                  </p>

                  {/* Category */}
                  <span
                    className={`mt-4 inline-flex rounded-lg px-3 py-1.5 text-xs font-bold ${
                      suggestion.category === "Bug"
                        ? "bg-red-50 text-red-500"
                        : "bg-indigo-50 text-indigo-600"
                    }`}
                  >
                    {suggestion.category}
                  </span>

                  {/* Bottom */}
                  <div className="mt-5 flex items-center justify-between">
                    {/* Upvote */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpvote(suggestion.id);
                      }}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition ${
                        suggestion.upvoted
                          ? "bg-purple-100 text-purple-600"
                          : "bg-gray-100 text-gray-700 hover:bg-purple-50 hover:text-purple-500"
                      }`}
                    >
                      <ChevronUp size={16} />

                      {suggestion.upvotes}
                    </button>

                    {/* Comments */}
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <MessageCircle size={17} />

                      <span className="text-xs font-bold">
                        {suggestion.comments}
                      </span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Empty State */}
              {category.items.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 text-center">
                  <p className="text-sm font-medium text-gray-400">
                    No feedback in {category.name.toLowerCase()}.
                  </p>
                </div>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default RoadmapContent;
