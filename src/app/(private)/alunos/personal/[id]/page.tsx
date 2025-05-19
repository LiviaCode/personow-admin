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
      <ProfileDetails personal={personal}></ProfileDetails>
    </>
  );
}
