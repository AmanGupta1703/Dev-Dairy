import { Link } from "react-router-dom";

import { storageService } from "../../services/appwrite/storage";

function PostCard({ ...props }) {
  return (
    <div className="max-w-xs overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-2xl">
      <Link to={`/post/${props?.$id}`}>
        <div className="flex h-48 w-full items-center justify-center bg-slate-700">
          <img
            src={`${storageService.getFilePreview(props?.featuredImage)}`}
            alt={props?.title}
            className="h-full w-full object-cover transition-all duration-200 hover:scale-110"
          />
        </div>
        <div className="p-4">
          <h1 className="mb-2 text-lg font-semibold text-slate-100">
            {props?.title}
          </h1>
          <p className="text-sm text-slate-300">{props?.description}</p>
        </div>
      </Link>
    </div>
  );
}

export default PostCard;
