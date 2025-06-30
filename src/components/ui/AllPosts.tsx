import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

import { databaseService } from "../../services/appwrite/database";
import { addPosts } from "../../store/postsSlice";
import PostCard from "./PostCard";
import Loader from "./Loader";

type Post = {
  [key: string]: string;
};

function AllPosts() {
  const [posts, setPosts] = useState<Array<Post>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(function () {
    setIsLoading(true);
    async function getPosts() {
      try {
        const posts = await databaseService.getPosts();

        setPosts(posts.documents);
        dispatch(addPosts(posts.documents));
      } catch (error) {
        console.log("AllPosts :: getPosts :: error", error);
      } finally {
        setIsLoading(false);
      }
    }

    getPosts();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-6">
      {posts.length
        ? posts.map((post) => <PostCard key={post.title} {...post} />)
        : null}
    </div>
  );
}

export default AllPosts;
