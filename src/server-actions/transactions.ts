"use server";

import TransactionModel from "@/models/transaction-model";
import { revalidatePath } from "next/cache";
import { GetLoggedInUserFromMongoDB } from "./users";

export const AddNewTransaction = async (payload: any) => {
  try {
    await TransactionModel.create(payload);
    revalidatePath("/transactions");
    return {
      success: true,
      message: "เพิ่มธุรกรรมสำเร็จ",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const GetTransactions = async (filters: any) => {
  try {
    const loggedInUser: any = await GetLoggedInUserFromMongoDB();
    let filtersToPass: any = {
      user: loggedInUser._id,
    };

    if (filters?.type) {
      filtersToPass["type"] = filters.type;
    }

    if (filters?.category) {
      filtersToPass["category"] = filters.category;
    }

    if (filters?.fromDate && filters?.toDate) {
      filtersToPass["date"] = {
        $gte: filters.fromDate,
        $lte: filters.toDate,
      };
    }

    const sortOrderToPass: any = {
      date: filters?.sortOrder === "asc" ? 1 : -1,
    };

    const transactions = await TransactionModel.find(filtersToPass).sort(
      sortOrderToPass
    );
    return JSON.parse(JSON.stringify(transactions));
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const UpdateTransaction = async ({
  transactionId,
  payload,
}: {
  transactionId: string;
  payload: any;
}) => {
  try {
    await TransactionModel.findByIdAndUpdate(transactionId, payload);
    revalidatePath("/transactions");
    return {
      success: true,
      message: "แก้ไขธุรกรรมสำเร็จ",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const DeleteTransaction = async (transactionId: string) => {
  try {
    await TransactionModel.findByIdAndDelete(transactionId);
    revalidatePath("/transactions");
    return {
      success: true,
      message: "ลบธุรกรรมสำเร็จ",
    };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};