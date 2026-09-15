import type { Suggestion, Comment } from "../types/feedback";

export const initialSuggestions: Suggestion[] = [
  {
    id: 1,
    title: "Add dark mode",
    description:
      "Allow users to switch between light and dark themes for a better experience.",
    category: "Feature",
    status: "Planned",
    upvotes: 112,
    upvoted: false,
    comments: 2,
  },
  {
    id: 2,
    title: "Improve search functionality",
    description:
      "Add better search and filtering options to quickly find feedback.",
    category: "Enhancement",
    status: "In Progress",
    upvotes: 89,
    upvoted: false,
    comments: 2,
  },
  {
    id: 3,
    title: "Keyboard shortcuts",
    description:
      "Add useful keyboard shortcuts for common actions throughout the application.",
    category: "UI",
    status: "Live",
    upvotes: 74,
    upvoted: false,
    comments: 1,
  },
  {
    id: 4,
    title: "Mobile navigation",
    description:
      "Improve navigation and make it easier to use on smaller screens.",
    category: "UX",
    status: "In Progress",
    upvotes: 56,
    upvoted: false,
    comments: 0,
  },
  {
    id: 5,
    title: "Profile customization",
    description:
      "Allow users to customize their profile information and preferences.",
    category: "Feature",
    status: "Planned",
    upvotes: 31,
    upvoted: false,
    comments: 0,
  },
  {
    id: 6,
    title: "Notification improvements",
    description:
      "Improve notifications so important updates are easier to notice.",
    category: "Bug",
    status: "Live",
    upvotes: 42,
    upvoted: false,
    comments: 0,
  },
];

export const initialComments : Record<number, Comment[]> = {
  1: [
    {
      id: 1,
      name: "Elijah Moss",
      username: "@elijah.bestagon",
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "Also please allow styles to be applied based on system preferences.",
    },
    {
      id: 2,
      name: "Steev Harington",
      username: "@steev.bestagon",
      avatar: "https://i.pravatar.cc/150?img=2",
      text: "I would love to be able to browse Frontend Mentor in the evening.",
    },
  ],

  2: [
    {
      id: 3,
      name: "John Smith",
      username: "@johnsmith",
      avatar: "https://i.pravatar.cc/150?img=3",
      text: "This would be a really useful improvement.",
    },
    {
      id: 4,
      name: "Sarah Williams",
      username: "@sarahw",
      avatar: "https://i.pravatar.cc/150?img=4",
      text: "I completely agree with this suggestion.",
    },
  ],

  3: [
    {
      id: 5,
      name: "Alex Johnson",
      username: "@alexj",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: "This feature would make the product much easier to use.",
    },
  ],
};
