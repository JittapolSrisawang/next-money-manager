"use client";
import PageTitle from "@/components/page-title";
import { UpdateUser } from "@/server-actions/users";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import { Button, Input, Modal, Tag, message } from "antd";
import { useState } from "react";

function Profile() {
  const { loggedInUser, SetLoggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;

  const [incomeCategories, setIncomeCategories] = useState<string[]>(
    loggedInUser?.incomeCategories || []
  );
  const [expenseCategories, setExpenseCategories] = useState<string[]>(
    loggedInUser?.expenseCategories || []
  );
  const [newCategory, setNewCategory] = useState<string>("");

  const [showAddNewCategory, setShowAddNewCategory] = useState(false);
  const [newCategoryType, setNewCategoryType] = useState<"รายรับ" | "รายจ่าย">(
    "รายรับ"
  );
  const [loading, setLoading] = useState(false);

  const getProperty = ({ key, value }: { key: string; value: string }) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{key}</span>
        <span className="text-sm">{value}</span>
      </div>
    );
  };

  const onUpdate = async () => {
    try {
      setLoading(true);
      const updatedUser = await UpdateUser({
        userId: loggedInUser?._id || "",
        payload: {
          incomeCategories,
          expenseCategories,
        },
      });
      message.success("อัพเดทโปรไฟล์สำเร็จ");
      SetLoggedInUser(updatedUser);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageTitle title="โปรไฟล์" />

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {getProperty({ key: "ชื่อ", value: loggedInUser?.name || "" })}
        {getProperty({ key: "อีเมล", value: loggedInUser?.email || "" })}
        {getProperty({
          key: "ชื่อผู้ใช้",
          value: loggedInUser?.username || "",
        })}
        {getProperty({ key: "ไอดี", value: loggedInUser?._id || "" })}
        {getProperty({
          key: "วันที่เข้าร่วม",
          value: loggedInUser?.createdAt || "",
        })}
      </div>

      <div className="mt-7">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">หมวดหมู่รายรับ</h1>
          <Button
            size="small"
            onClick={() => {
              setShowAddNewCategory(true);
              setNewCategoryType("รายรับ");
            }}
          >
            เพิ่มหมวดหมู่รายรับ
          </Button>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          {incomeCategories.map((category) => {
            return (
              <Tag
                key={category}
                className="text-sm font-semibold text-primary px-5 py-2 capitalize"
                closable
                onClose={() => {
                  setIncomeCategories(
                    incomeCategories.filter((c) => c !== category)
                  );
                }}
              >
                {category}
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="mt-7">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">หมวดหมู่รายจ่าย</h1>
          <Button
            size="small"
            onClick={() => {
              setShowAddNewCategory(true);
              setNewCategoryType("รายจ่าย");
            }}
          >
            เพิ่มหมวดหมู่รายจ่าย
          </Button>
        </div>

        <div className="flex flex-wrap gap-5 mt-5">
          {expenseCategories.map((category) => {
            return (
              <Tag
                key={category}
                className="text-sm font-semibold text-primary px-5 py-2 capitalize"
                closable
                onClose={() => {
                  setExpenseCategories(
                    expenseCategories.filter((c) => c !== category)
                  );
                }}
              >
                {category}
              </Tag>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end mt-7">
        <Button type="primary" onClick={onUpdate} loading={loading}>
          อัพเดทโปรไฟล์
        </Button>
      </div>

      <Modal
        open={showAddNewCategory}
        title={`เพิ่มประเภทของ${newCategoryType}`}
        centered
        closable
        onCancel={() => setShowAddNewCategory(false)}
        cancelText="ยกเลิก"
        okText="เพิ่ม"
        onOk={() => {
          if (newCategoryType === "รายรับ") {
            setIncomeCategories([...incomeCategories, newCategory]);
          } else {
            setExpenseCategories([...expenseCategories, newCategory]);
          }
          setShowAddNewCategory(false);
        }}
        okButtonProps={{ disabled: !newCategory }}
      >
        <Input
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="ชื่อประเภท"
        />
      </Modal>
    </div>
  );
}
export default Profile;
