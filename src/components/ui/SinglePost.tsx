import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";

import { databaseService } from "../../services/appwrite/database";
import { storageService } from "../../services/appwrite/storage";
import { Button } from "../";
import { useSelector } from "react-redux";

type Post = {
  [key: string]: string;
};

function SinglePost() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState<Post>({});

  const navigate = useNavigate();
  const userData = useSelector((state: any) => state.auth.userData);

  const { id } = useParams();

  async function handlePostDelete(id: string) {
    try {
      await databaseService.deletePost(id);
      navigate("/posts");
    } catch (error) {
      console.log("SinglePost :: handleDeletePost :: error ::", error);
    }
  }

  useEffect(
    function () {
      if (!id) return;

      async function getPostDetails() {
        try {
          const post = await databaseService.getPost(id as string);
          setPost(post);
        } catch (error) {
          console.log("Post :: error ::", error);
        } finally {
          setIsLoading(false);
        }
      }

      if (id) {
        getPostDetails();
      }
    },
    [id],
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return !isLoading ? (
    <article>
      <header className="relative border-2 border-gray-200">
        <div className="h-96 w-full border-2">
          <img
            className="h-full w-full object-fill"
            src={storageService.getFilePreview(post?.featuredImage)}
          />
        </div>

        {userData?.$id === post?.userId ? (
          <div className="absolute top-2 right-2 space-x-4">
            <Button
              className="px-6"
              onClick={() => navigate(`/update-post/${post?.$id}`)}>
              Edit
            </Button>
            <Button
              className="px-6"
              buttonType="danger"
              onClick={() => handlePostDelete(post.$id)}>
              Delete
            </Button>
          </div>
        ) : null}
      </header>

      <div className="mt-6">{parse(post.content)}</div>
    </article>
  ) : null;
}

export default SinglePost;
