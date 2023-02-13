import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import useSWR from "swr";
import Header from "~/components/molueces/Header";
import TokenRegistration from "~/components/TokenRegistration";
import i18next from "i18next";
import Lang from "~/components/Lang";
function Index() {
  const { t, i18n } = useTranslation();

  const getFlagImage = (lang: any) => {
    const flagMap: any = {
      en: "gb",
      pt: "br",
    };

    const flag = flagMap[lang] || lang;

    return `https://country-flag-proxy.nod.workers.dev/png/${flag}`;
  };

  const router = useRouter();

  const allLanguages = Object.keys(i18next.services.resourceStore.data).sort(
    (a, b) => a.localeCompare(b)
  );
  console.log(allLanguages);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <Fragment>
      <Header classes="flex-col">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
          {t("title")}
          </h1>
          <Lang/>
        </div>
      </Header>
      <TokenRegistration />
    </Fragment>
  );
}

export default Index;
