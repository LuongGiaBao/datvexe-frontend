import React, { useEffect, useState } from "react";
import {
  fetchAllAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} from "../api/AdminUserApi";
import Sidebar from "../components/Sidebar";
import { Table, Button, Modal, message } from "antd";
import AddUserModal from "../components/AddUserModal";

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [user, setUser] = useState({
    tenNV: "",
    description: "",
    PhoneNumber: "",
    MaNV: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchAllAdminUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        message.error("Không thể tải danh sách nhân viên");
      }
    };
    getUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      const createdUser = await createAdminUser(user);
      setUsers([
        ...users,
        {
          id: createdUser.id,
          ...createdUser.attributes,
        },
      ]);
      resetForm();
      setModalVisible(false);
      message.success("Tạo nhân viên thành công");
    } catch (error) {
      message.error("Không thể tạo nhân viên");
    }
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateAdminUser(editingUserId, user);
      setUsers(
        users.map((u) =>
          u.id === editingUserId
            ? { id: updatedUser.id, ...updatedUser.attributes }
            : u
        )
      );
      resetForm();
      setModalVisible(false);
      message.success("Cập nhật nhân viên thành công");
    } catch (error) {
      message.error("Không thể cập nhật nhân viên");
    }
  };

  const handleDeleteUser = (id) => {
    Modal.confirm({
      title: "Xác Nhận Xóa",
      content: "Bạn có chắc chắn muốn xóa nhân viên này?",
      onOk: async () => {
        try {
          await deleteAdminUser(id);
          setUsers(users.filter((user) => user.id !== id));
          message.success("Xóa nhân viên thành công");
        } catch (error) {
          message.error("Không thể xóa nhân viên");
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: "MaNV",
      key: "MaNV",
    },
    {
      title: "Tên Nhân Viên",
      dataIndex: "tenNV",
      key: "tenNV",
    },
    {
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },

    {
      title: "Vai trò",
      dataIndex: "type",
      key: "type",
      render: (text) => text || "Nhân viên1",
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setUser({
                tenNV: record.tenNV,
                description: record.description,
                PhoneNumber: record.PhoneNumber,
                MaNV: record.MaNV,
              });
              setEditingUserId(record.id);
              setModalVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button
            type="danger"
            onClick={() => handleDeleteUser(record.id)}
            style={{ marginLeft: "8px" }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  const resetForm = () => {
    setUser({ tenNV: "", description: "", PhoneNumber: "", MaNV: "" });
    setEditingUserId(null);
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="admin-content">
        <h1>Quản Trị Nhân Viên</h1>
        <Button
          type="primary"
          onClick={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          Thêm Nhân Viên
        </Button>
        <Table dataSource={users} columns={columns} rowKey="id" />

        <AddUserModal
          isOpen={modalVisible}
          onClose={resetForm}
          onAdd={handleCreateUser}
          onEdit={handleUpdateUser}
          user={user}
          setUser={setUser}
        />
      </div>
    </div>
  );
};

export default UserAdmin;
