import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

import Layout from "@/components/layout";
import { api } from "@/utils/api";
import type { NextPage, Metadata } from "next";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

// Importing files for react quill
import "react-quill/dist/quill.bubble.css";
import dynamic from "next/dynamic";
import { useAutosave } from "react-autosave";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const metadata: Metadata = {
  title: "Announcements",
  description: "Example dashboard app using the components.",
};

export function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.["id"];

  return {
    props: {
      id,
    },
  };
}

const AnnouncementPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ id }) => {
  const { data, refetch } = api.announcement.get.useQuery({
    id: id as string,
  });

  const [title, setTitle] = useState(data?.title ?? "");
  const [text, setText] = useState(data?.text ?? "");

  useEffect(() => setTitle(data?.title ?? ""), [data?.title]);
  useEffect(() => setText(data?.text ?? ""), [data?.text]);

  //Function to edit the title
  const editTitle = api.announcement.editTitle.useMutation({
    onSuccess: () => {
      void refetch();
    },
  });

  const updateTitle = () => {
    if (title != "" && title != data?.title) {
      editTitle.mutate({ id: data?.id ?? "", title: title });
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
    if (text != "" && text != data?.text) {
      editText.mutate({ id: data?.id ?? "", text: text });
    }
  };

  // Hook to autosave the text
  useAutosave({
    data: text,
    onSave: updateText,
  });

  return (
    <>
      <Layout activeValue="announcements">
        <section className="flex items-center justify-center">
          <div className="mt-12 w-[80vw]">
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
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AnnouncementPage;
