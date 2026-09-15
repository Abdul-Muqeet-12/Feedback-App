import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  Suggestion,
  Comment,
  Category,
  Status,
  UpdateSuggestionPayload,
} from "../types/feedback";
import { initialSuggestions, initialComments } from "../data/initialData";

interface FeedbackState {
  suggestions: Suggestion[];
  comments: Record<number, Comment[]>;
}

interface AddSuggestionPayload {
  title: string;
  description: string;
  category?: Category;
  status?: Status;
}

interface AddCommentPayload {
  suggestionId: number;
  comment: Comment;
}

const initialState: FeedbackState = {
  suggestions: initialSuggestions,
  comments: initialComments,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addSuggestion: (state, action: PayloadAction<AddSuggestionPayload>) => {
      const payload = action.payload;

      const newSuggestion: Suggestion = {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        category: payload.category || "Feature",
        status: payload.status || "Planned",
        upvotes: 0,
        comments: 0,
        upvoted: false,
      };

      state.suggestions.push(newSuggestion);
    },

    updateSuggestion: (
      state,
      action: PayloadAction<UpdateSuggestionPayload>,
    ) => {
      const updated = action.payload;

      const ids = state.suggestions.findIndex((s) => s.id === updated.id);

      if (ids !== -1) {
        state.suggestions[ids] = {
          ...state.suggestions[ids],
          ...updated,
        };
      }
    },

    deleteSuggestion: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      state.suggestions = state.suggestions.filter((s) => s.id !== id);

      delete state.comments[id];
    },

    toggleUpvote: (state, action: PayloadAction<number>) => {
      const id = action.payload;

      const item = state.suggestions.find((s) => s.id === id);

      if (item) {
        item.upvoted = !item.upvoted;

        item.upvotes = item.upvoted
          ? item.upvotes + 1
          : Math.max(0, item.upvotes - 1);
      }
    },

    addComment: (state, action: PayloadAction<AddCommentPayload>) => {
      const { suggestionId, comment } = action.payload;

      if (!state.comments[suggestionId]) {
        state.comments[suggestionId] = [];
      }

      state.comments[suggestionId].push(comment);

      const item = state.suggestions.find((s) => s.id === suggestionId);

      if (item) {
        item.comments = item.comments + 1;
      }
    },

    replaceAll: (state, action: PayloadAction<FeedbackState>) => {
      return action.payload;
    },
  },
});

export const {
  addSuggestion,
  updateSuggestion,
  deleteSuggestion,
  toggleUpvote,
  addComment,
  replaceAll,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
