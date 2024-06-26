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
import { useShops } from "../hooks";
import useUser, { User as UserType } from "../hooks/useUser";
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
  const currentUser = useUser();

  const paginatedUsers = paginate<UserType>(users, usersCurrentPage, pageSize);
  const paginatedShops = paginate<Shop>(shops, shopsCurrentPage, pageSize);

  if (!currentUser?.isAdmin) return <Navigate to="/" />;

  const title = usersModalOpen ? "App Users" : "App Shops";

  const handleModalClose = () => {
    setUsersModalVisibility(false);
    setShopsModalVisibility(false);
    setQuery("");
  };

  const ModalContent = (
    <>
      <SearchInput
        onTextChange={setQuery}
        placeholder={`Search ${title}`}
        value={query}
      />
      {usersModalOpen &&
        users
          .filter(
            ({ name, username }) =>
              name.toLowerCase().includes(query.toLowerCase()) ||
              username.toLowerCase().includes(query.toLowerCase())
          )
          .map((user, index) => <UserAdminItem user={user} key={index} />)}
      {shopsModalOpen &&
        shops
          .filter(({ name }) =>
            name.toLowerCase().includes(query.toLowerCase())
          )
          .map((shop, index) => <ShopAdminItem shop={shop} key={index} />)}
    </>
  );

  return (
    <Container maxW="600px" mt={20} px={7}>
      <Text fontSize="3xl" mb={4} fontWeight="bold">
        Admin Dashboard
      </Text>

      <Modal
        content={ModalContent}
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
