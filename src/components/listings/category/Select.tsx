import { useCategories } from "../../../hooks";
import Select from "../../common/Select";

interface Props {
  register: any;
}

const CategorySelect = ({ register }: Props) => {
  const { data: categories } = useCategories();

  return <Select label="Category" options={categories} register={register} />;
};

export default CategorySelect;
