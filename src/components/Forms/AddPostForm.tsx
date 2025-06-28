import { useCallback, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { Input, Button, Select, Textarea, RTE } from "../";
import { databaseService } from "../../services/appwrite/database";
import { storageService } from "../../services/appwrite/storage";

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
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, control, register, watch, getValues, setValue, reset } =
    useForm<IAddPostData>({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        description: post?.featuredImage || "",
        status: post?.status || "active",
        content: post?.content || "",
      },
    });
  const userData = useSelector((state: any) => state.auth.userData);

  async function handleAddPost(data: IAddPostData) {
    setIsLoading(true);

    if (post) {
      // TODO
    } else {
      // User is creating a new post
      try {
        const file = data.featuredImage[0]
          ? await storageService.uploadFile(
              data.featuredImage[0] as unknown as File,
            )
          : null;

        if (file) {
          const fileId = file.$id;

          const dbPost = await databaseService.createPost({
            ...data,
            featuredImage: fileId,
            userId: userData.$id,
          });

          console.log(dbPost);
        }
      } catch (error) {
        console.log("AddPostForm :: handleAddPost :: error", error);
      } finally {
        setIsLoading(false);
        reset();
      }
    }
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
              label="Post Content"
              control={control}
              {...register("content", { required: true })}
              defaultValue={getValues("content")}
            />
          </div>
        </div>
        <div className="flex justify-center">
          {!isLoading ? (
            <Button type="submit" className="w-1/2" disabled={isLoading}>
              {post ? "Update Post" : "Create Post"}
            </Button>
          ) : (
            <Button type="submit" className="w-1/2" disabled={isLoading}>
              {post ? "Updating Post" : "Creating Post"}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default AddPostForm;
