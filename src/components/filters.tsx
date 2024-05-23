"use client";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import { Button, Form, Input, Modal, Select, Tag, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Filters() {
  const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [form] = Form.useForm();
  const { loggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;
  const router = useRouter();
  const [appliedFilters, setAppliedFilters] = useState<any>({
    type: "",
    category: "",
    fromDate: "",
    toDate: "",
    sortOrder: "",
  });

  const onFinish = (values: any) => {
    try {
      const searchParams = new URLSearchParams();
      Object.keys(values).forEach((key) => {
        if (values[key]) {
          searchParams.append(key, values[key]);
        }
      });
      setAppliedFilters(values);
      router.push(`/transactions?${searchParams.toString()}`);
      setShowFiltersModal(false);
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onFilterRemove = (key: string) => {
    // cler the filter
    const newFilters = { ...appliedFilters };
    newFilters[key] = "";
    onFinish(newFilters);
    form.setFieldsValue(newFilters);
  };

  let getAppliedFiltersCount = () => {
    let count = 0;
    Object.keys(appliedFilters).forEach((key) => {
      if (appliedFilters[key]) {
        count++;
      }
    });
    return count;
  };

  return (
    <div className="p-5 border border-solid border-gray-200 mt-5">
      <div className="flex justify-between items-center">
        <div>
          {getAppliedFiltersCount() > 0 ? (
            <div className="flex gap-5">
              {Object.keys(appliedFilters).map((key) => {
                if (!appliedFilters[key]) return null;
                return (
                  <div className="flex flex-col capitalize">
                    <span className="text-gray-500 text-xs">{key}</span>
                    <Tag
                      className="px-5 py-1 border border-gray-300 font-semibold mt-1"
                      closable
                      onClose={() => onFilterRemove(key)}
                    >
                      {appliedFilters[key]}
                    </Tag>
                  </div>
                );
              })}
            </div>
          ) : (
            <span className="text-sm  text-gray-600">ไม่มีการใช้ตัวกรอง</span>
          )}
        </div>

        <div className="flex gap-5 items-center">
          <Button
            type="default"
            onClick={() => {
              onFinish({});
            }}
          >
            ลบตัวกรอง
          </Button>
          <Button type="primary" onClick={() => setShowFiltersModal(true)}>
            แสดงตัวกรอง
          </Button>
        </div>
      </div>

      <Modal
        open={showFiltersModal}
        onCancel={() => setShowFiltersModal(false)}
        cancelText="ยกเลิก"
        okText="ยืนยัน"
        centered
        title="ตัวกรองธุรกรรม"
        width={800}
        okButtonProps={{
          htmlType: "submit",
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={appliedFilters}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Form.Item name="type" label="ประเภทธุรกรรม">
              <Select
                onChange={(value) => {
                  if (value === "รายรับ") {
                    setCategoriesToShow(loggedInUser?.incomeCategories || []);
                  } else {
                    setCategoriesToShow(loggedInUser?.expenseCategories || []);
                  }
                  form.setFieldsValue({ category: "" });
                }}
              >
                <Select.Option value="รายรับ">รายรับ</Select.Option>
                <Select.Option value="รายจ่าย">รายจ่าย</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="category" label="หมวดหมู่">
              <Select>
                <Select.Option value="">เลือกหมวดหมู่</Select.Option>
                {categoriesToShow.map((category) => (
                  <Select.Option value={category}>
                    {category.toUpperCase()}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="fromDate" label="ตั้งแต่วันที่">
              <Input type="date" />
            </Form.Item>
            <Form.Item name="toDate" label="ถึงวันที่">
              <Input type="date" />
            </Form.Item>

            <Form.Item name="sortOrder" label="เรียงลำดับ">
              <Select>
                <Select.Option value="asc">ก่อนหลัง</Select.Option>
                <Select.Option value="desc">ล่าสุด</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default Filters;