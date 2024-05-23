import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    incomeCategories: {
      type: Array,
      required: true,
      default: ["เงินเดือน", "โบนัส", "ดอกเบี้ย", "ปันผล", "อื่นๆ"],
    },
    expenseCategories: {
      type: Array,
      required: true,
      default: [
        "อาหาร",
        "ค่าเดินทาง",
        "ซื้อของ",
        "ค่าผ่อนบ้าน",
        "ความบันเทิง",
        "สุขภาพ",
        "ประกัน",
        "การศึกษา",
        "บริจาค",
        "อื่นๆ",
      ],
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models["users"]) {
  delete mongoose.models["users"];
}

const UserModel = mongoose.model("users", userSchema);
export default UserModel;
