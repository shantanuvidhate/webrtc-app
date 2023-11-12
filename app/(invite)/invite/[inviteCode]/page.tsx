import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};
const InviteCodePage = async ({ params }: InviteCodePageProps) => {

    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }
    if (!params.inviteCode) {
        return redirect("/");
    }

    // check weather the person is already the server member and trying to join the server

    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (existingServer) {
        return redirect(`/server/${existingServer.id}`);
    }

    return (
        <div>
            Hello invite
        </div>
    );

}