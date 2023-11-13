import { api } from "~/utils/api"
import { prisma } from "@repo/db";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { Button } from "@repo/ui/components/button";
import { useRouter } from "next/router";


type Props = {
    name: string,
    location: string,
    currentRole: string,
    mentoringAreas: string,
    about: string,
    classOf: string,
    profileImage: string
}

export default function Index(props: Props) {
    console.log(props, "sajhsdkajdbsajhdsad")
    const router = useRouter()
    return (
        <div className="flex flex-col items-center ">
            <div className="relative mt-[25px] max-h-[300px] w-[350px] rounded-md border-[1px] border-[#ddd] bg-white shadow-md">
              <Image
                
                src={props.profileImage ? 
                    props.profileImage 
                    : "https://images.unsplash.com/photo-1526800544336-d04f0cbfd700?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    // : "https://st3.depositphotos.com/4111759/13425/v/450/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg"
                }
                alt="ProfileImage"
                width={350}
                height={350}
                className="absolute left-[37%] top-[-30px] h-20 w-20 rounded-full"
              />
              <div className="mt-[60px] flex flex-col items-center">
                <p className="text-lg" >
                  {props?.name}
                </p>
                <p>{props?.currentRole}</p>
                <div className="flex flex-row gap-3 pt-[10px]">
                  <p>{props?.location}</p>
                  <p>{`Class of ${props?.classOf}`}</p>
                </div>
                <div className="flex flex-row  items-center gap-3 pt-2">
                  {/* <Button onClick={() => signOut()}> */}
                    <div className="mb-5 h-[40px] w-[100px] rounded-md bg-red-500">
                      <p
                        className="px-4 py-2 text-center text-base text-white"
                        
                      >
                        Sign Out
                      </p>
                    </div>
                  {/* </Button> */}

                  <button
                    onClick={() => router.push("/profile/edit")}
                  >
                    <div className="mb-5 h-[40px]  rounded-md bg-indigo-500">
                      <p
                        className="px-4 py-2 text-center text-base text-white"
                        
                      >
                        Edit Profile
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <div className=" pl-5 pt-5">
                <p className="text-base" >
                  About
                </p>
                <p className="mt-2 text-sm ">
                  {props?.about ? props.about : "No Bio "}
                </p>
              </div>
            </div>

            <div className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <div className=" pl-5 pt-5">
                <p className="text-base" >
                  Mentoring Areas
                </p>
                <div className="flex flex-col gap-3 pt-3">
                    {props.mentoringAreas.split(",").map((area) => (
                        <div
                        className="max-w-[200px] rounded-md bg-[#f2f2f2] px-3 py-1 text-center"
                        key={area}
                      >
                        <p className="text-center">{area}</p>
                      </div>
                    ))}
                 
                </div>
              </div>
            </div>

            <div className="mt-5 min-h-min w-[350px] rounded-md border-[1px] border-[#ddd] bg-white pb-3 shadow-md">
              <div className=" pl-5 pt-5">
                <p className="text-base" >
                  Experience
                </p>
                <div className="flex flex-col gap-3 pt-3">
                  {/* {profileprops.experience.map((exp) => (
                    <div
                      className="max-w-[200px] rounded-md  "
                      key={exp.company}
                    >
                      <p className="text-lg font-medium ">{exp.company}</p>
                      <p className="">{exp.role}</p>
                      <p className="text-gray-700">{exp.duration}</p>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
            <div className="mt-5 h-10" />
          </div>
    )
}


type Params = {
    params: {
        id: string
    }
}

export async function getStaticPaths() {
    const data = await prisma.user.findMany({
        select: {
            id: true
        }
    })
    return {
        paths: data?.map((userId) => {
            return {
                params: {
                    id: [userId.id]
                },
            };
        }),
        fallback: false,
    }

}

export async function getStaticProps({params}: Params) {
    const individualProfile = await prisma.user.findUnique({
        where: {
            id: params.id[0]
        }, 
        select: {
            name: true,
            location: true,
            currentRole: true,
            about: true,
            classOf: true,
            mentoringAreas: true,
            profileImage: true,
            
            
        }
    })
    return {
        props: individualProfile
    }
}