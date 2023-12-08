import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import { createCategory } from "../../redux/reducers/categorySlice";
import { useToast } from "../ui/use-toast";

const FormSchema = z.object({
    category_name: z
    .string({
      required_error: "Category name is required",
    })
    .min(2)
    .max(18),
    category_icon: z
    .string({
      required_error: "The icon is required",
    })
    .min(2)
    .max(30),
    active: z
    .string({
    })
});

export default function CategoryForm() {
  const { toast } = useToast();
  const stateError = useSelector((state) => state.user.error);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category_name: "",
      category_icon: "",
      active: "",
    },
  });

  const dispatch = useDispatch();

  const submitData = async (values) => {
    try {
      dispatch(createCategory(values));
      console.log(values);
      if (!stateError) {
        return toast({
          variant: "success",
          description: (
            <div className="flex items-center justify-between gap-3">
              <Icon icon="solar:check-circle-linear" width={23} height={23} />
              <p>Category added successfully</p>
            </div>
          ),
        });
      }
      toast({
        variant: "destructive",
        description: "Cannot add Category now. Please try again later",
      });
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitData)} className=" space-y-6">
        <div className="grid grid-cols-2 gap-x-5">
          <FormField
            control={form.control}
            name="category_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category name</FormLabel>
                <FormControl>
                  <Input className="input" {...field} />
                </FormControl>
                <FormMessage className="text-red-600 h-0" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category_icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Input name={field.name} className="input" {...field} />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent name="active">
                  <SelectItem value="true">Active</SelectItem>
                  <SelectItem value="false">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <br />
        <DialogFooter className="!justify-between flex mt-8 gap-y-4">
          <DialogClose asChild>
            <Button
              className="p-4 border border-black/5"
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
          <DialogTrigger asChild>
            <Button className="p-4" type="submit">
              Add Category
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </Form>
  );
}
