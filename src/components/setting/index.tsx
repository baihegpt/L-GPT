import * as React from "react";
import { useRouter } from "next-intl/client";
import { useTranslations } from "next-intl";
import { TbTrashXFilled } from "react-icons/tb";
import { BiExport, BiImport } from "react-icons/bi";
import { saveAs } from "file-saver";
import { useDateFormat } from "l-hooks";
import toast from "react-hot-toast";
import { cn } from "@/lib";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Confirm from "@/components/ui/Confirm";
import { sendMessageTypes } from "@/utils/constant";
import { getPlatform } from "@/lib";
import type { Platform } from "@/lib";
import { useChannel, useOpenAI, useSetting, useConfig } from "@/hooks";
import type { IConfigStoreState } from "@/hooks";

const Setting: React.FC = () => {
  const router = useRouter();

  const [channel, setChannel] = useChannel();
  const [openai, setOpenAI] = useOpenAI();
  const [visible, setVisible] = useSetting();
  const [config, setConfig] = useConfig();
  const { format } = useDateFormat();

  const fileRef = React.useRef<any>(null);
  const [plat, setPlat] = React.useState<Platform>("windows");
  const [loading, setLoading] = React.useState(false);

  const t = useTranslations("setting");

  const onClose = () => setVisible(false);

  const onSettingApiKey = () => {
    setLoading(true);
    router.push("/configure-key");
  };

  const handleResetData = () => {
    localStorage.clear();
    window.location.reload();
  };

  const handleExport = () => {
    const exportData = {
      configure: {
        openai: openai.openai,
        azure: openai.azure,
      },
      messages: channel,
      // Todo...
      prompts: [],
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, `LGPT_Export_${format(new Date(), "YYYY-MM-DD")}.json`);
  };

  const handleImport = (files: any) => {
    if (!files?.length) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.messages) {
          const { activeId, list } = json.messages;
          const find = list.find((item: any) => item.channel_id === activeId);
          if (find) setChannel(json.messages);
        }
        if (json.configure) {
          const { openai, azure } = json.configure;
          setOpenAI((data) => {
            if (openai) data.openai = openai;
            if (azure) data.azure = azure;
            return data;
          });
        }
        toast.success(t("import-success"));
      } catch {}
    };
    reader.readAsText(file);
    fileRef.current.value = "";
  };

  const onChangeSendMessageType = (
    value: IConfigStoreState["sendMessageType"]
  ) => {
    setConfig((config) => {
      config.sendMessageType = value;
      return config;
    });
  };

  React.useEffect(() => {
    setPlat(getPlatform());

    return () => {
      onClose();
    };
  }, []);

  return (
    <>
      <Modal
        footer={null}
        maskClosable={false}
        title={t("title")}
        open={visible}
        onClose={onClose}
      >
        <div
          className={cn(
            "flex items-center justify-between py-2 px-1 border-b",
            "border-slate-100 dark:border-neutral-500/60"
          )}
        >
          <div className="text-sm">API Key</div>
          <Button
            className="w-44"
            type="primary"
            loading={loading}
            onClick={onSettingApiKey}
          >
            {t("configuration")}
          </Button>
        </div>
        <div
          className={cn(
            "flex items-center justify-between py-2 px-1 border-b",
            "border-slate-100 dark:border-neutral-500/60"
          )}
        >
          <div className="text-sm">{t("reset-data")}</div>
          <Confirm
            title={t("reset-data")}
            content={t("reset-data-tip")}
            trigger={
              <Button type="danger">
                <TbTrashXFilled size={18} />
              </Button>
            }
            onOk={handleResetData}
          />
        </div>
        <div
          className={cn(
            "flex items-center justify-between py-2 px-1 border-b",
            "border-slate-100 dark:border-neutral-500/60"
          )}
        >
          <div className="text-sm">{t("export-import")}</div>
          <div className="flex gap-2">
            <Button onClick={handleExport}>
              <BiExport size={18} />
            </Button>
            <Button onClick={() => fileRef.current?.click()}>
              <BiImport size={18} />
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between py-2 px-1 border-b",
            "border-slate-100 dark:border-neutral-500/60"
          )}
        >
          <div className="text-sm">{t("send-message")}</div>
          <Select
            className="w-44"
            options={sendMessageTypes(plat)}
            value={config.sendMessageType}
            onChange={onChangeSendMessageType}
          />
        </div>
      </Modal>
      <input
        ref={fileRef}
        className="sr-only"
        tabIndex={-1}
        type="file"
        accept=".json"
        onChange={(e) => handleImport(e.target.files)}
      />
    </>
  );
};

Setting.displayName = "Setting";

export default Setting;
