import { UploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "@/server/uploadthing";

// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";
import { useToast } from "./use-toast";
import Image from "next/image";

interface Props {
  file: string;
  alt: string | undefined;
  onUploadComplete: onUploadCompleteType;
  // setFile: React.Dispatch<React.SetStateAction<string>>;
}

interface onUploadCompleteType {
  (fileUrl: string): void;
}

export const UploadFile: React.FC<Props> = (props) => {
  const { toast } = useToast();
  return (
    <>
      {props.file == "" ? (
        <UploadButton<OurFileRouter>
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            props.onUploadComplete(res?.at(0)?.fileUrl ?? "");
            // console.log("Files: ", res);
          }}
          onUploadError={(error: Error) => {
            toast({
              description: `There was the following error - ${error.message}`,
            });
          }}
        />
      ) : (
        <>
          <Image
            src={props.file}
            alt={props.alt ?? ""}
            width={400}
            height={400}
          />
        </>
      )}
    </>
  );
};
