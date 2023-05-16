import Layout from "@/components/layout";
import { api } from "@/utils/api";
import type { NextPage, Metadata } from "next";
import { useRouter } from "next/router";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

// Importing files for react quill
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { useAutosave } from "react-autosave";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const metadata: Metadata = {
  title: "Announcements",
  description: "Example dashboard app using the components.",
};

const AnnouncementPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id ?? "";
  const { isReady } = router;

  return (
    <>
      <Layout activeValue="announcements">
        <section className="flex items-center justify-center">
          <div className="mt-12 w-[80vw]">
            {isReady ? <AlumniEditor id={id as string} /> : <></>}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AnnouncementPage;

interface Props {
  id: string;
}
const AlumniEditor: React.FC<Props> = (props) => {
  //Fetching list of worksheets
  const {
    data: announcement,
    refetch,
    isLoading,
    isError,
  } = api.announcement.get.useQuery({
    id: props.id,
  });

  const [title, setTitle] = useState(announcement?.title ?? "");
  const [text, setText] = useState(announcement?.text ?? "");

  //Function to edit the title
  const editTitle = api.announcement.editTitle.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const updateTitle = () => {
    if (title != "" && title != announcement?.title) {
      editTitle.mutate({ id: announcement?.id ?? "", title: title });
    }
  };

  // Hook to autosave the title
  useAutosave({
    data: title,
    onSave: updateTitle,
  });

  //Function to edit the text
  const editText = api.announcement.editText.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const updateText = () => {
    if (text != "" && text != announcement?.text) {
      editText.mutate({ id: announcement?.id ?? "", text: text });
    }
  };

  // Hook to autosave the text
  useAutosave({
    data: text,
    onSave: updateText,
  });

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-center text-lg">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="col-span-3"
        />
      </div>
      <div className="mt-20 flex flex-col gap-8">
        <Label htmlFor="text" className=" text-left text-lg">
          Text
        </Label>
        <ReactQuill
          className="min-h-[10vh] border"
          id="text"
          theme="bubble"
          value={text}
          onChange={setText}
        />
      </div>
    </>
  );
};
