import {
  Lightbulb,
  CheckCircle2,
  Clock3,
  CircleDot,
  Plus,
  ArrowRight,
} from "lucide-react";

import type { CategoryFilter, StatusFilter } from "../types/feedback";

interface SidebarProps {
  filterCategory: CategoryFilter;
  setFilterCategory: (category: CategoryFilter) => void;

  filterStatus: StatusFilter;

  setFilterStatus: React.Dispatch<React.SetStateAction<StatusFilter>>;

  roadmapCount: {
    planned: number;
    inProgress: number;
    live: number;
  };

  openRoadmap: () => void;
  openAdd: () => void;
}

function Sidebar({
  filterCategory,
  setFilterCategory,
  filterStatus,
  setFilterStatus,
  roadmapCount,
  openRoadmap,
  openAdd,
}: SidebarProps) {
  const categories: CategoryFilter[] = [
    "All",
    "UI",
    "UX",
    "Enhancement",
    "Bug",
    "Feature",
  ];

  return (
    <aside className="space-y-5 lg:col-span-1">
      {/* Brand Card */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 p-6 text-white shadow-lg">
        <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10"></div>

        <div className="absolute -bottom-10 -right-4 h-24 w-24 rounded-full bg-white/5"></div>

        <div className="relative">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Lightbulb size={22} />
          </div>

          <h1 className="text-xl font-bold tracking-tight">Frontend Mentor</h1>

          <p className="mt-1 text-sm text-white/70">Product Feedback Board</p>
        </div>
      </div>

      {/* Categories */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-gray-800">Categories</h2>

          <span className="text-xs font-medium text-gray-400">Filter</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilterCategory(category)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                filterCategory === category
                  ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-gray-800">Roadmap</h2>

            <p className="mt-1 text-xs text-gray-400">Track product progress</p>
          </div>

          <button
            type="button"
            onClick={openRoadmap}
            className="group flex items-center gap-1 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            View
            <ArrowRight
              size={15}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>

        <div className="space-y-4">
          {/* Planned */}
          <button
            type="button"
            onClick={() =>
              setFilterStatus(filterStatus === "Planned" ? "All" : "Planned")
            }
            className={`flex w-full items-center justify-between rounded-lg p-2 transition ${
              filterStatus === "Planned" ? "bg-orange-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400"></span>

              <div className="flex items-center gap-2">
                <Clock3 size={15} className="text-gray-400" />

                <span className="text-sm text-gray-600">Planned</span>
              </div>
            </div>

            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-500">
              {roadmapCount.planned}
            </span>
          </button>

          {/* In Progress */}
          <button
            type="button"
            onClick={() =>
              setFilterStatus(
                filterStatus === "In Progress" ? "All" : "In Progress",
              )
            }
            className={`flex w-full items-center justify-between rounded-lg p-2 transition ${
              filterStatus === "In Progress"
                ? "bg-purple-50"
                : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>

              <div className="flex items-center gap-2">
                <CircleDot size={15} className="text-gray-400" />

                <span className="text-sm text-gray-600">In Progress</span>
              </div>
            </div>

            <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-bold text-purple-500">
              {roadmapCount.inProgress}
            </span>
          </button>

          {/* Live */}
          <button
            type="button"
            onClick={() =>
              setFilterStatus(filterStatus === "Live" ? "All" : "Live")
            }
            className={`flex w-full items-center justify-between rounded-lg p-2 transition ${
              filterStatus === "Live" ? "bg-cyan-50" : "hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>

              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-gray-400" />

                <span className="text-sm text-gray-600">Live</span>
              </div>
            </div>

            <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-500">
              {roadmapCount.live}
            </span>
          </button>
        </div>

        {/* Add Feedback */}
        <button
          type="button"
          onClick={openAdd}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-purple-700 hover:shadow-md active:scale-[0.98]"
        >
          <Plus size={18} />
          Add Feedback
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
