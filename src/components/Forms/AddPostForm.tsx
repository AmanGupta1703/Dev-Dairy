import { useCallback, useEffect, useState } from "react";

import {  useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Input, Button, Select, Textarea, RTE } from "../";
import { databaseService } from "../../services/appwrite/database";
import { storageService } from "../../services/appwrite/storage";

export interface IAddPostData {
  $id?: string;
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
        description: post?.description || "",
        status: post?.status || "active",
        content: post?.content || "",
      },
    });
  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.auth.userData);

  async function handleAddPost(data: IAddPostData) {
    setIsLoading(true);

    if (post) {
      try {
        const file = data.featuredImage[0];

        if (file) {
          console.log("HERE EXISTS");
          await storageService.deleteFile(post.featuredImage);

          const uploadedFile = await storageService.uploadFile(
            data.featuredImage[0] as unknown as File,
          );

          const dbPost = await databaseService.updatePost(
            { ...data, featuredImage: uploadedFile.$id },
            post.$id as string,
          );

          if (dbPost) return navigate(`/post/${dbPost.$id}`);
        } else if (!file) {
          const fileId = post.featuredImage;

          const dbUpdatedPost = await databaseService.updatePost(
            {
              ...data,
              featuredImage: fileId,
            },
            post.$id as string,
          );

          if (dbUpdatedPost) return navigate(`/post/${dbUpdatedPost.$id}`);
        }
      } catch (error) {
        console.log("AddPostForm :: handleAddPost :: error ::", error);
      } finally {
        setIsLoading(false);
      }
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

          if (dbPost) navigate(`/post/${dbPost.$id}`);
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

  useEffect(
    function () {
      if (post && Object.values(post).every((val) => val !== ""))
        setValue("slug", slugTransform(getValues().title ?? ""), {
          shouldValidate: true,
        });
    },
    [post, getValues().title],
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
              {...register("slug", { required: true })}
            />

            <Input
              label="Featured Image"
              type="file"
              accept="image/*"
              {...register("featuredImage", { required: !post })}
            />

            {post?.featuredImage && (
              <div className="h-40 overflow-hidden rounded">
                <img
                  className="h-full w-full object-fill"
                  src={storageService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                />
              </div>
            )}

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
            <Button type="submit" className="w-1/2">
              {post ? "Update Post" : "Create Post"}
            </Button>
          ) : (
            <Button type="submit" className="w-1/2">
              {post ? "Updating Post" : "Creating Post"}
            </Button>
          )}
        </div>
      </form>
    </>
  );
}

export default AddPostForm;
