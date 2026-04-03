import {
  deleteFeedback,
  getFeedback,
  getFeedbacks,
  retriggerFeedbackAnalysis,
  updateFeedback,
} from "@/lib/api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useFeedbacksQuery = (
  category?: string,
  status?: string,
  page?: number,
) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["feedbacks", { category, status, page }],
    queryFn: () =>
      getFeedbacks({
        category,
        status,
        page,
        limit: 10,
      }),
    placeholderData: (previousData) => previousData,
  });

  return {
    feedbacks: data?.feedbacks ?? [],
    paginationrInfo: data?.pagination ?? null,
    loading: isLoading,
    error,
  };
};

export const useFeedbackQuery = (feedbackId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: () => getFeedback(feedbackId),
  });

  return {
    feedback: data,
    loading: isLoading,
    error,
  };
};

export const useUpdateFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      updateFeedback(data.id, { status: data.status }),

    onSuccess: () => {
      toast.success("Status updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },

    onError: () => {
      toast.error("Failed to update feedback!");
    },
  });
};

export const useAnalyzeFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) => retriggerFeedbackAnalysis(feedbackId),

    onSuccess: () => {
      toast.success("AI analysis completed");
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },

    onError: () => {
      toast.error("AI analysis failed!");
    },
  });
};

export const useDeleteFeedbackMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (feedbackId: string) => deleteFeedback(feedbackId),

    onSuccess: () => {
      toast.success("Delete successfully!");
    },

    onError: () => {
      toast.error("Failed to delete feedback!");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbacks"] });
    },
  });
};
