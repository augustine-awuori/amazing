import { FormRegister } from "../../../hooks/useForm";
import { useCategories } from "../../../hooks";
import Select from "../../common/Select";

interface Props {
  register: FormRegister;
}

const CategorySelect = ({ register }: Props) => {
  const { data: categories } = useCategories();

  return <Select label="Category" options={categories} register={register} />;
};

export default CategorySelect;
