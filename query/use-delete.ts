import { useMutation } from "@tanstack/vue-query";
import { COLLECTION_DEALS, DB_ID } from "~/constants";
import { DATABASE } from "~/libs/appwrite";

export const useDelete = (refetch: Function) => {
  const toast = useToast();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-deals"],
    mutationFn: (id: string) =>
      DATABASE.deleteDocument(DB_ID, COLLECTION_DEALS, id),
    onSuccess: () => {
      refetch();
      toast.add({
        title: "Document deleted",
        description: "The deal has been deleted successfully.",
      });
    },
    onError: (error) => {
      toast.add({
        title: "Error",
        description: error.message,
        color: "rose",
      });
    },
  });

  return { deleteDeal: mutate, isDeleting: isPending };
};
