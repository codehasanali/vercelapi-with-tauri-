import * as Avatar from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import useSWR from "swr";
import { API_ENDPOINTS } from "~/API";

import fetcher from "~/helpers/fetcher";
import { IUser } from "~/types";
import GearIcon from "../svg/gear.svg";
import ProjectsDropdown from "~/components/ProjectsDropdown";
import Header from "~/components/molueces/Header";
function dasboard() {
  const { data, error } = useSWR<IUser, Error>(API_ENDPOINTS.user, fetcher);

  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string>("");

  if (
    error?.message === "No token  found" ||
    error?.message == "Not authenticated"
  ) {
    localStorage.removeItem("token");
    router.push("/");
  }

  const handleProjectChange = (id: string) => {
    setSelectedProject(id);
  };

  if (!data) return;
  return (
    <Fragment>
      <Header classes="justify-between">
        <div className="flex items-center">
          <Avatar.Root>
            <Avatar.Image
              className="rounded-full "
              width={32}
              height={32}
              src={`https://vercel.com/api/www/avatar/${data?.user.avatar}?s=60`}
            />
          </Avatar.Root>

          <section className="ml-5 flex flex-col">
            <p className="text-base font-medium text-zinc-900 dark:text-zinc-50">
              {data?.user.name}
            </p>
            <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {data?.user.username}
            </p>
          </section>
        </div>
        <div className="flex items-center">
        <ProjectsDropdown
            selectedProject={selectedProject}
            handleProjectChange={handleProjectChange}
          />


          
           </div>
      </Header>
    </Fragment>
  );
}

export default dasboard;
