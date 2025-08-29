import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <LoaderIcon className="animate-spin w-10 h-10" />
    </div>
  );
};

export default Loader;
