import { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ResultApi() {
  const [data, setData] = useState("");
  const fetchApi = async () => {
    try {
      const res = await axiosInstance.get("/hello");
      setData(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Result Api</h1>
      <button onClick={fetchApi}>fetch</button>
      <p>{data}</p>
    </div>
  );
}
