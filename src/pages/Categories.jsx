import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getColumns from "../components/ui/columns";
import DataTable from "../components/ui/data-table";
import { getAllCategories } from "../redux/reducers/categorySlice";
import CategoryDialog from "../components/category/addCategoryDialog";

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);
  const isLoading = useSelector((state) => state.categories.isLoading);

  const columns = getColumns({
    keyOne: "_id",
    keyOneTitle: "Category ID",
    keyTwo: "category_name",
    keyTwoTitle: "Category",
    keyThree: "active",
    keyThreeTitle: "Category Status",
    keyFour: "createdAt",
    keyFourTitle: "Created At",
    keyFive: " ",
    keyFiveTitle: " ",
    option: "categories",
    path: "/",
  });
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      <div className="container h-full flex-1 flex-col space-y-8 sm:p-8 p-4 flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Categories Management
            </h2>
            <p className="text-muted-foreground">
              {"Here's"} a list of your categories!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <CategoryDialog/>
          </div>
        </div>
        <DataTable
          data={categories}
          columns={columns}
          isLoading={isLoading}
          option={"categories"}
        />
      </div>
    </>
  );
};

export default CategoriesPage;
