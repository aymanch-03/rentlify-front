/* eslint-disable react/prop-types */
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { DeleteListing } from "../../redux/reducers/listingSlice";
import { useToast } from "../ui/use-toast";

export default function RemoveListing({ id }) {
  const dispatch = useDispatch();
  const { toast } = useToast();
  // eslint-disable-next-line no-unused-vars
  const [cookie, setCookie, removeCookie] = useCookies();

  const handleSubmit = async (id) => {
    try {
      const result = await dispatch(DeleteListing(id));
      if (result.payload._id) {
        return setTimeout(() => {
          toast({
            variant: "success",
            description: "Listing deleted successfully",
          });
          <Navigate to="/office/listings" />;
        }, 800);
      } else {
        toast({
          variant: "destructive",
          description: result.payload,
        });
      }
    } catch (error) {
      console.error("Error Deleting category", error);
      toast({
        variant: "destructive",
        description: "Something went wrong",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-red-500 flex items-center gap-2 focus:bg-red-100 focus:text-red-800  h-8 w-8 p-0 data-[state=open]:bg-muted "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Listing</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            listing with the ID:&quot;{id}&quot; and remove the data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            className="p-4"
            variant="destructive"
            onClick={() => handleSubmit(id)}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
