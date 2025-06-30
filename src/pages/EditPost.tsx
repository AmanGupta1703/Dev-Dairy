import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { databaseService } from "../services/appwrite/database";
import { AddPostForm } from "../components";
import { type IAddPostData } from "../components/Forms/AddPostForm";

function EditPost() {
  const [post, setPost] = useState({});

  const { id } = useParams();

  useEffect(
    function () {
      if (!id) return;

      async function getPost() {
        try {
          const post = await databaseService.getPost(id as string);
          setPost(post);
        } catch (error) {
          console.log("EditPost :: getPost :: error ::", error);
        }
      }

      getPost();
    },
    [id],
  );

  return (
    <section>
      {Object.values(post).some((val) => val !== "") && (
        <AddPostForm post={post as IAddPostData} />
      )}
    </section>
  );
}

export default EditPost;
