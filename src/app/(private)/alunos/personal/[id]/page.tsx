import { notFound } from "next/navigation";

import getPersonal from "@/app/http/get-personal";
import { ProfileDetails } from "@/components/personal/profileDetails";

type ProfilePersonalProps = {
  params: Promise<{ id: string }>;
};

export default async function ProfilePersonal({
  params,
}: ProfilePersonalProps) {
  const { id } = await params;
  let personal;
  try {
    personal = await getPersonal(id);
  } catch {
    personal = undefined;
  }
  if (!personal) notFound();

  return (
    <>
      <div className="absolute left-0 top-0 z-20 grid h-full min-h-screen w-full grid-rows-[1fr_8fr] md:relative md:z-auto">
        <header className="flex flex-col items-start justify-center px-10 py-8 text-gray-50"></header>

        <div className="overflow-visible rounded-t-[25px] bg-purple-900 p-4">
          <ProfileDetails personal={personal}></ProfileDetails>
        </div>
      </div>
    </>
  );
}
