export type Category = "UI" | "UX" | "Enhancement" | "Bug" | "Feature";

export type CategoryFilter = "All" | Category;

export type Status = "Planned" | "In Progress" | "Live";

export interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: Status;
  upvotes: number;
  comments: number;
  upvoted: boolean;
}

export interface Comment {
  id: number;
  name: string;
  username: string;
  avatar: string;
  text: string;
}

export type SuggestionFormData = {
  title: string;
  category: Category;
  status: Status;
  description: string;
};

export interface UpdateSuggestionPayload {
  id: number;
  title?: string;
  description?: string;
  category?: Category;
  status?: Status;
  upvotes?: number;
  upvoted?: boolean;
  comments?: number;
}
