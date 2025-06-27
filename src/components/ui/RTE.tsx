import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";

import { config } from "../../config";

interface IRTEProps {
  name: string;
  label?: string;
  control: any;
  defaultValue?: string;
}

function RTE({ name, label, control, defaultValue = "" }: IRTEProps) {
  return (
    <div>
      <label className="flex flex-col space-y-1">
        {label && (
          <span className="text-sm font-semibold text-slate-800">{label}</span>
        )}

        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey={config.tinymceApiKey}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                content_css: "dark",
                resize: false,
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </label>
    </div>
  );
}

export default RTE;
