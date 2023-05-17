import { UploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "@/server/uploadthing";

// You need to import our styles for the button to look right. Best to import in the root /_app.tsx but this is fine
import "@uploadthing/react/styles.css";

interface Props {
  file: string;
  setFile: React.Dispatch<React.SetStateAction<string>>;
}

export const UploadFile: React.FC<Props> = (props) => {
  return (
    <>
      <UploadButton<OurFileRouter>
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </>
  );
};
