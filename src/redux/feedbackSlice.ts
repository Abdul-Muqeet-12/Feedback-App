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

    updateSuggestionStatus: (
      state,
      action: PayloadAction<{
        id: number;
        status: Status;
      }>,
    ) => {
      const { id, status } = action.payload;

      const suggestion = state.suggestions.find((s) => s.id === id);

      if (suggestion) {
        suggestion.status = status;
      }
    },

    reorderSuggestion: (
      state,
      action: PayloadAction<{
        id: number;
        status: Status;
        newIndex: number;
      }>,
    ) => {
      const { id, status, newIndex } = action.payload;

      const currentIndex = state.suggestions.findIndex(
        (suggestion) => suggestion.id === id,
      );

      if (currentIndex === -1) return;

      // Remove the dragged card
      const [movedSuggestion] = state.suggestions.splice(currentIndex, 1);

      // Update status
      movedSuggestion.status = status;

      // Find all cards belonging to the destination status
      const destinationIndexes = state.suggestions
        .map((suggestion, index) => (suggestion.status === status ? index : -1))
        .filter((index) => index !== -1);

      // If destination column is empty
      if (destinationIndexes.length === 0) {
        state.suggestions.push(movedSuggestion);
        return;
      }

      // Insert before the card at the requested position
      const targetIndex =
        newIndex >= destinationIndexes.length
          ? destinationIndexes[destinationIndexes.length - 1] + 1
          : destinationIndexes[newIndex];

      state.suggestions.splice(targetIndex, 0, movedSuggestion);
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
  updateSuggestionStatus,
  reorderSuggestion,
  deleteSuggestion,
  toggleUpvote,
  addComment,
  replaceAll,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
