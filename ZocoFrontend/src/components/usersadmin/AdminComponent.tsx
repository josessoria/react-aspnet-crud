import React, { useState, useContext, useEffect } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import axios from "../../api/axios";
import UsersTable from "./UserTable";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import {
  UsersContext,
  UsersContextType,
} from "../../context/UsersAdminProvider";

const AdminComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { users, deleteUser, addUser, updateUser, setUsers }: UsersContextType =
    useContext(UsersContext);

  const handleCreateUser = async (newUser: any) => {
    try {
      const response = await axios.post("/api/Users", newUser);
      addUser(response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get("/api/users"); 
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);


  const handleEditUser = async (updatedUser: any) => {
    try {
      const response = await axios.put(
        `/api/Users/${updatedUser.id}`,
        updatedUser
      );
      updateUser(response.data);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await axios.delete(`/api/Users/${id}`);
      deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setSelectedUser(null);
    setIsEditOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Admin Panel - Users</h2>
        <div className="flex justify-end mb-4">
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onPress={onOpen}
          >
            Crear Nuevo Usuario
          </Button>
        </div>
        <UsersTable
          users={users}
          handleDeleteUser={handleDeleteUser}
          handleEditUser={openEditModal}
        />
      </div>
      <CreateUserModal
        isOpen={isOpen}
        onClose={onClose}
        handleCreateUser={handleCreateUser}
      />
      {selectedUser && (
        <EditUserModal
          isOpen={isEditOpen}
          onClose={closeEditModal}
          handleEditUser={handleEditUser}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default AdminComponent;
