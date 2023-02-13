import { useTranslation } from "react-i18next";
import i18next from "i18next";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Lang from "~/components/Lang";
import AlertDialog from "~/components/molueces/Alert";
import Header from "~/components/molueces/Header";
import RadioGroup from "~/components/molueces/Radio";
import Slider from "~/components/molueces/slider";
import LeftArrow from "~/svg/arrow-left.svg";
import classNames from "classnames";

const LAN = [
  {
    label: "Tr",
    value: "Turkish",
    renderer: "Turkish",
  },
  {
    label: "",
    value: "light",
    renderer: "Light",
  },
];

const THEMES = [
  {
    label: "System",
    value: "system",
    renderer: "System",
  },
  {
    label: "Light",
    value: "light",
    renderer: "Light",
  },
  {
    label: "Dark",
    value: "dark",
    renderer: "Dark",
  },
];

const NOTIFICATIONS = [
  {
    label: "Yes",
    value: "yes",
    renderer: "Yes",
  },
  {
    label: "No",
    value: "no",
    renderer: "No",
  },
];

const SettingsPage = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [notificationSetting, setNotificationSetting] = useState("no");
  const [frequency, setFrequency] = useState([15]);
  const { t, i18n } = useTranslation();

  const getFlagImage = (lang: any) => {
    const flagMap: any = {
      en: "gb",
      pt: "br",
    };

    const flag = flagMap[lang] || lang;

    return `https://country-flag-proxy.nod.workers.dev/png/${flag}`;
  };
  const allLanguages = Object.keys(i18next.services.resourceStore.data).sort(
    (a, b) => a.localeCompare(b)
  );

  const onToggleLanguageClick = (e: any) => {};

  useEffect(() => {
    setMounted(true);
    setNotificationSetting(
      window.localStorage.getItem("notifications") || "no"
    );
    setFrequency([parseInt(window.localStorage.getItem("frequency") || "15")]);
  }, []);

  if (!mounted) return null;

  const handleSetNotification = (value: string) => {
    setNotificationSetting(value);
    window.localStorage.setItem("notifications", value);
  };

  const handleFrequencyChange = (value: number[]) => {
    setFrequency(value);
    window.localStorage.setItem("frequency", value[0].toString());
  };

  const handleClickLogout = () => {
    setShowConfirmModal(true);
  };

  return (
    <Fragment>
      <Header classes="items-center">
        <Link href="/dashboard">
          <button className="mr-2 bg-transparent hover:bg-zinc-200 hover:dark:bg-zinc-700 p-2 rounded">
            <LeftArrow />
          </button>
        </Link>
        <h1 className="text-base font-medium text-zinc-900 dark:text-zinc-50">
          Settings
        </h1>
      </Header>
      <div className="p-4 flex flex-col h-full">
        <section className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Theme
            </p>
            <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {t("start")}
            </p>
          </div>
          <RadioGroup
            label="Theme"
            items={THEMES}
            value={theme}
            handleChange={(val) => setTheme(val)}
          />
        </section>

        <div className=" mt-5  ">
          <section className="flex items-center justify-between">
            <div className="flex flex-col">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Langues
              </p>
              <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
                {i18next.language}
              </p>
            </div>

            <button
              onClick={() => i18n.changeLanguage("tr")}
              className="ml-64  bg-zinc-100 dark:bg-zinc-800  border-zinc-300 dark:border-zinc-700 px-5
           py-1.5 text-sm justify-center items-center hover:bg-zinc-200
            hover:dark:bg-zinc-700 first:border-none last:border-none first:rounded-l last:rounded-r
            data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50  data-[state=checked]:dark:bg-zinc-50
              data-[state=checked]:dark:text-zinc-900"
            >
              Tr
            </button>
            <button
              onClick={() => i18n.changeLanguage("en")}
              className=" bg-zinc-100 dark:bg-zinc-800  border-zinc-300 dark:border-zinc-700 px-5
           py-1.5 text-sm justify-center items-center hover:bg-zinc-200
            hover:dark:bg-zinc-700 first:border-none last:border-none first:rounded-l last:rounded-r
            data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50  data-[state=checked]:dark:bg-zinc-50
              data-[state=checked]:dark:text-zinc-900"
            >
              En
            </button>
          </section>
        </div>

        <section className="flex items-center justify-between mt-8">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Send Notifications
            </p>
            <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Send system messages when deployment starts and ends.
            </p>
          </div>
          <RadioGroup
            label="Notifications"
            items={NOTIFICATIONS}
            value={notificationSetting}
            handleChange={(val) => handleSetNotification(val)}
          />
        </section>
        <section className="flex items-center justify-between mt-8">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Request Interval
            </p>
            <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              How frequently should BuildLog check for new deployments?
            </p>
          </div>
          <Slider
            max={60}
            min={10}
            step={5}
            label="Interval"
            value={frequency}
            handleChange={handleFrequencyChange}
          />
        </section>
        <section className="mt-auto flex justify-between items-center p-4 border border-red-400 rounded bg-red-200/30 dark:bg-red-800/20">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
              Log Out?
            </p>
            <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              Log out of BuildLog and erase saved access token.
            </p>
          </div>
          <AlertDialog
            handleTriggerClick={handleClickLogout}
            confirmLabel="Log out"
            show={showConfirmModal}
            title="Are you absolutely sure?"
            description="You will be logged out and your access token will be deleted from local storage"
            triggerLabel="Log out"
            handleConfirm={() => {
              localStorage.removeItem("token");
              setTimeout(() => {
                router.push("/");
              }, 1);
            }}
          />
        </section>
      </div>
    </Fragment>
  );
};

export default SettingsPage;
