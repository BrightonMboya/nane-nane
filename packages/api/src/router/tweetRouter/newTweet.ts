import { z } from "zod";
import { protectedProcedure, publicProcedure } from "../../trpc";
// import { uploadImg } from "@repo/nextjs/src/utils/uploadImage";

import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export async function uploadImg(imageURI: string) {
  let imageUrl = "";
  const image = imageURI;
  const imageName = uuidv4();
  const imageData = image.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(imageData, "base64");
  imageUrl = process.env.IMAGE_SERVER!.endsWith("/")
    ? process.env.IMAGE_SERVER + imageName
    : process.env.IMAGE_SERVER + "/" + imageName;

  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .upload(imageName, imageBuffer, {
      cacheControl: "999999999",
    });
  console.info("data:", data, "err", error);
  return imageUrl;
}


export const newTweet = publicProcedure
  .input(
    z.object({
      body: z.string().trim().min(3),
      image: z.string().nullish(),
      emailAddress: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {
    let imageUrl = "";
    if (input.image) {
      imageUrl = await uploadImg(input.image);
    }

    const userId = await ctx.prisma.user.findUnique({
      where: {
        email: input.emailAddress
      },
      select: {
        id: true
      }
    })
    let newTweet = await ctx.prisma.tweet.create({
      data: {
        body: limitTextLines(input.body),
        // images: [imageUrl],
        userId: userId?.id as string
      },
      include: {
        user: true,
        likes: true,
        replies: true,
        retweets: true,
      },
    });
    return { success: true, tweet: newTweet };
  });

function limitTextLines(text: string) {
  const newText = text.replace(/(\n{3,})/g, "\n\n");
  return newText;
}
