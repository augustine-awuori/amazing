import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "@chakra-ui/react";

import {
  AdminItemList,
  Modal,
  SearchInput,
  Text,
  UserAdminItem,
} from "../components";
import { paginate } from "../utils/paginate";
import { Shop } from "../hooks/useShop";
import { useNoGrid, useShops } from "../hooks";
import { User as UserType } from "../hooks/useUser";
import auth from "../services/auth";
import ShopAdminItem from "../components/ShopAdminItem";
import useUsers from "../hooks/useUsers";

const AdminPage = () => {
  const { users } = useUsers();
  const { shops } = useShops();
  const [usersCurrentPage, setUsersCurrentPage] = useState(1);
  const [shopsCurrentPage, setShopsCurrentPage] = useState(1);
  const [usersModalOpen, setUsersModalVisibility] = useState(false);
  const [shopsModalOpen, setShopsModalVisibility] = useState(false);
  const [pageSize] = useState(4);
  const [query, setQuery] = useState("");
  useNoGrid();

  const paginatedUsers = paginate<UserType>(users, usersCurrentPage, pageSize);
  const paginatedShops = paginate<Shop>(shops, shopsCurrentPage, pageSize);

  if (!auth.getCurrentUser()?.isAdmin) return <Navigate to="/" />;

  const title = usersModalOpen ? "App Users" : "App Shops";

  const data = usersModalOpen ? users : shops;

  const handleModalClose = () => {
    setUsersModalVisibility(false);
    setShopsModalVisibility(false);
    setQuery("");
  };

  return (
    <Container maxW="600px" mt={20} px={7}>
      <Text fontSize="3xl" mb={4} fontWeight="bold">
        Admin Dashboard
      </Text>

      <Modal
        content={
          <>
            <SearchInput
              onTextChange={setQuery}
              placeholder={`Search ${title}`}
              value={query}
            />
            {data.length ? (
              data
                .filter((i) =>
                  i.name.toLowerCase().includes(query.toLowerCase())
                )
                .map((item, index) =>
                  usersModalOpen ? (
                    <UserAdminItem user={item as UserType} key={index} />
                  ) : (
                    <ShopAdminItem shop={item as Shop} key={index} />
                  )
                )
            ) : (
              <Text textAlign="center" mt={3} color="yellow.300">
                None Found!
              </Text>
            )}
          </>
        }
        isOpen={usersModalOpen || shopsModalOpen}
        onModalClose={handleModalClose}
        title={title}
      />

      <AdminItemList
        itemsCount={users.length}
        onViewAll={() => setUsersModalVisibility(true)}
        title="Users"
        currentPage={usersCurrentPage}
        onPageChange={setUsersCurrentPage}
        pageSize={pageSize}
      >
        {paginatedUsers.map((user, index) => (
          <UserAdminItem user={user} key={index} />
        ))}
      </AdminItemList>

      <AdminItemList
        itemsCount={shops.length}
        onViewAll={() => setShopsModalVisibility(true)}
        title="Shops"
        currentPage={shopsCurrentPage}
        onPageChange={setShopsCurrentPage}
        pageSize={pageSize}
      >
        {paginatedShops.map((shop, index) => (
          <ShopAdminItem shop={shop} key={index} />
        ))}
      </AdminItemList>
    </Container>
  );
};

export default AdminPage;
