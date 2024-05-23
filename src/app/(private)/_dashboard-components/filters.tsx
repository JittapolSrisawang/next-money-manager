"use client";

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Filters({ searchParams }: { searchParams: any }) {
  const [fromDate, setFromDate] = useState(searchParams?.fromDate || "");
  const [toDate, setToDate] = useState(searchParams?.toDate || "");
  const router = useRouter();

  const onFilter = () => {
    router.push(`/?fromDate=${fromDate}&toDate=${toDate}`);
  };

  const onClear = () => {
    setFromDate("");
    setToDate("");
    router.push(`/`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 mt-7 lg:items-end">
      <div className="w-96">
        <h1 className="text-gray-600 text-sm">ตั้งแต่วันที่</h1>
        <Input
          placeholder="ตั้งแต่วันที่"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          type="date"
        />
      </div>

      <div className="w-96">
        <h1 className="text-gray-600 text-sm">ถึงวันที่</h1>
        <Input
          placeholder="ถึงวันที่"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          min={fromDate}
          type="date"
        />
      </div>

      <Button onClick={onClear}>ลบตัวกรอง</Button>
      <Button type="primary" disabled={!fromDate || !toDate} onClick={onFilter}>
        กรองข้อมูล
      </Button>
    </div>
  );
}
export default Filters;
