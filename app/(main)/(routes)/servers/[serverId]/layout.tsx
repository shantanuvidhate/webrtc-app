import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({ children, params }: { children: React.ReactNode, params: { serverId: string } }) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }

    const server = db.server.findUnique({
        where: {
            id: params.serverId,
            // the person who is member of the server can load that specific server
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (!server) {
        redirect("/");
    }
    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
                <ServerSidebar serverId={params.serverId}  />
            </div>
            <main className="h-full md:pl-60">
                {children}
            </main>
        </div>
    );
}

export default ServerIdLayout;