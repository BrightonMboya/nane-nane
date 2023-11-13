import { api } from "~/utils/api"
import { prisma } from "@repo/db";
import { GetServerSideProps } from "next";


export default function Index(props) {
    console.log(props, "sajhsdkajdbsajhdsad")
    return <h3> Hello World</h3>
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
    console.log(params.id[0], "hfdkfbwuiefbkefhwbfwufe")
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
            mentoringAreas: true
            
        }
    })
    return {
        props: individualProfile
    }
}