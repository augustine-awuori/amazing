import { endpoint } from "../services/users";
import { User } from "./useUser";
import useData from "./useData";

const useUsers = () => {
  const { data: users, ...rest } = useData<User>(endpoint);

  return { users, ...rest };
};

export default useUsers;
