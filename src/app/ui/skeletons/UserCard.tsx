import Image from "next/image";

export default function UserCardSkeleton() {
  return (
    <div className="p-2 bg-gray-700 rounded flex gap-2 w-xs items-center animate-pulse">
      <Image
        src={"/user.jpg"}
        alt="User"
        width={80}
        height={80}
        className="relative w-[80px] h-[80px] rounded-full border-1 bg-gray-500"
      />
    </div>
  );
}
