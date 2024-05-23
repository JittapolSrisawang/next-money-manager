"use client";
import {
  AddNewTransaction,
  UpdateTransaction,
} from "@/server-actions/transactions";
import usersGlobalStore, { UsersGlobalStoreType } from "@/store/users";
import { Button, Form, Input, Select, message } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

function TransactionForm({
  isEdit = false,
  initialValues,
}: {
  isEdit?: boolean;
  initialValues?: any;
}) {
  const router = useRouter();
  const [categoriesToShow, setCategoriesToShow] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { loggedInUser }: UsersGlobalStoreType =
    usersGlobalStore() as UsersGlobalStoreType;

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      let response: any = null;
      if (!isEdit) {
        response = await AddNewTransaction({
          ...values,
          amount: Number(values.amount),
          user: loggedInUser?._id,
        });
      } else {
        response = await UpdateTransaction({
          transactionId: initialValues._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/transactions");
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-7">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Form.Item
            name="name"
            label="ชื่อธุรกรรม"
            className="col-span-1 lg:col-span-2"
            rules={[{ required: true, message: "กรุณาใส่ชื่อธุรกรรม" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="วันที่"
            className="col-span-1"
            rules={[{ required: true, message: "กรุณาใส่วันที่" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="จำนวนเงิน"
            className="col-span-1"
            rules={[{ required: true, message: "กรุณาใส่จำนวนเงิน" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="type"
            label="ประเภทธุรกรรม"
            className="col-span-1"
            rules={[{ required: true, message: "กรุณาใส่ประเภทธุรกรรม" }]}
          >
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
          <Form.Item
            name="category"
            label="หมวดหมู่"
            className="col-span-1"
            rules={[{ required: true, message: "กรุณาใส่หมวดหมู่" }]}
          >
            <Select>
              <Select.Option value="">เลือกหมวดหมู่</Select.Option>
              {categoriesToShow.map((category) => (
                <Select.Option value={category}>
                  {category.toUpperCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="note" label="รายละเอียดเพิ่มเติม" className="col-span-3">
            <Input.TextArea />
          </Form.Item>
        </div>

        <div className="flex justify-end gap-5 mt-7">
          <Button
            disabled={loading}
            onClick={() => {
              router.push("/transactions");
            }}
          >
            ยกเลิก
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            บันทึก
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default TransactionForm;