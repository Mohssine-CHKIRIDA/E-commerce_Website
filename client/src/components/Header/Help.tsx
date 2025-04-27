import { MdHelp } from "react-icons/md";

export default function Help() {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-orange-500 cursor-pointer">
      <MdHelp size={24} />
      <p className="mb-0">Help</p>
    </div>
  );
}
