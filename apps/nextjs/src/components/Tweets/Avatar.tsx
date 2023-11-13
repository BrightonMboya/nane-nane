import React from "react";
import cn from"clsx"
import Image from "next/image";

export default function Avatar({
  size = 56,
  avatarImage,
    className
}: {
  size?: number;
  avatarImage?: string;
  className?: string;
}) {
  return (
    <div className={cn("",className)} style={{ width: size, height: size }}>
      <Image
        className="h-full object-contain w-full rounded-full"
        src={
          avatarImage ||
        "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        }
        alt="avatar"
        width={size}
        height={size}
      />
    </div>
  );
}
