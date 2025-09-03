import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setPolicies } from "@/redux/service/policyDataSlice";
import PolicyUpload from "@/components/PolicyUpload";
import PolicyTableWrapper from "@/components/PolicyTableWrapper";

const PolicyManager = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/policies").then((res) => {
      dispatch(setPolicies(res.data));
    });
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto mt-0 space-y-6 px-4">
      <h1 className="text-2xl font-bold text-blue-700">Policy Overview</h1>
      <PolicyUpload />
      <PolicyTableWrapper />
    </div>
  );
};

export default PolicyManager;
