"use client";

import Link from "next/link";
import { Card, CardContent } from "@repo/ui/components/card";
import { Swords } from "@repo/ui/icons";
import { clsx } from "clsx";

export type Resources  = {
  id: string,
  name: string,
  description: string,
  category: string
}



export function ResourceCard( {resource} : any )  {
  console.log(resource, "Hellooooowow")

  return (
    <Link href="/" className="group">
      <Card
        className={clsx(
          "relative transition-colors duration-300",
          "group-hover:border-blue-400 group-focus:border-blue-400",
         
        )}
      >
        <CardContent className="flex flex-col items-center gap-5 p-8">
          <div
            className={clsx(
              `bg-gradient-to-r from-neutral-500/10 from-10% 
              relative to-100% dark:from-neutral-500/20`,
              "flex h-24 w-24 flex-none items-center justify-center rounded-2xl",
    
            )}
          >
            <Swords
              size={50}
              className={clsx(
                
                  "opacity-50 group-hover:opacity-100 group-focus:opacity-100",
              )}
            />
          </div>
          <div className="text-center font-semibold capitalize tracking-wide">
            {resource.name}
          </div>
          <div className="text-muted-foreground line-clamp-3 text-center text-sm tracking-wide">
            {resource.description}
          </div>

          
        </CardContent>
      </Card>
    </Link>
  );
}
