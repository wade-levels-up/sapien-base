import Image from "next/image";

export default function UserCardSkeleton() {
  return (
    <div className="p-2 bg-gray-700 rounded flex gap-2 w-3xs items-center animate-pulse">
      <Image
        src={"/user.jpg"}
        alt="User"
        width={48}
        height={48}
        className="relative w-[48px] h-[48px] rounded-full border-1 bg-gray-500"
      />
    </div>
  );
}
