import { useCallback, useEffect } from "react";

import { Input, Button, Select, Textarea, RTE } from "../";

import { useForm } from "react-hook-form";

interface IAddPostData {
  title: string;
  slug: string;
  featuredImage: string;
  description: string;
  status: "active" | "inactive";
  content: string;
}

interface IAddPostFormProps {
  post?: IAddPostData;
}

function AddPostForm({ post }: IAddPostFormProps) {
  const { handleSubmit, control, register, watch, getValues, setValue } =
    useForm<IAddPostData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        description: post?.featuredImage || "",
        status: post?.status || "active",
        content: post?.content || "",
      },
    });

  function handleAddPost(data: IAddPostData) {
    console.log(data);
  }

  const slugTransform = useCallback(function (value: string) {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(
    function () {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title ?? ""), {
            shouldValidate: true,
          });
        }
      });

      return () => subscription.unsubscribe();
    },
    [watch, slugTransform, setValue],
  );

  return (
    <>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="flex space-y-6">
          <div className="flex-1/3 space-y-6 space-x-6">
            <Input
              label="Post Title"
              type="text"
              placeholder="Enter post title"
              {...register("title", { required: true })}
            />

            <Input
              label="Post Slug"
              type="text"
              placeholder="Enter slug value"
              className="disabled:cursor-not-allowed disabled:opacity-50"
              disabled
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
              {...register("slug", { required: true })}
            />

            <Input
              label="Featured Image"
              type="file"
              accept="image/*"
              {...register("featuredImage", { required: true })}
            />

            <Textarea
              label="Post Short Description"
              placeholder="Enter post description..."
              rows={5}
              {...register("description", { required: true })}
            />

            <Select
              label="Post Status"
              options={["active", "inactive"]}
              {...register("status")}
            />
          </div>

          <div className="flex-2/3">
            <RTE
              name="content"
              label="Post Content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="w-1/2">
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </form>
    </>
  );
}

export default AddPostForm;
