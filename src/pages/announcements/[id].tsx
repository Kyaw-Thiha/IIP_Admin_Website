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
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app using the components.",
};

const AnnouncementPage: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  console.log(id);

  //Fetching list of worksheets
  const {
    data: announcement,
    refetch,
    isLoading,
    isError,
  } = api.announcement.get.useQuery({
    id: id as string,
  });

  const [title, setTitle] = useState(announcement?.title ?? "");
  const [text, setText] = useState(
    announcement?.text ?? "Hello this is the initial text"
  );

  return (
    <>
      <Layout activeValue="announcements">
        <section className="flex items-center justify-center">
          <div className="mt-12 w-[80vw]">
            <div className="grid grid-cols-4 items-center gap-4 ">
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
            <ReactQuill
              className="mt-20"
              theme="bubble"
              value={text}
              onChange={setText}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default AnnouncementPage;
