import React from "react";
import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
  if (!posts.length) {
    return <h3>No posts yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {posts &&
        posts.map((post) => (
          <div key={post._id}>
            <h4 className="card-header">
              <Link
                to={`/profile/${post.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {post.username}
              </Link>{" "}
            </h4>
            <div>
              <Link to={`/post/${post._id}`}>
                <p className="card-body">{post.postText}</p>
                <p className="comments">
                  Posted on {post.createdAt} <br></br>
                  Comments: {post.commentCount} ||{" "}
                  {post.commentCount ? "View" : "Start"} the commentary!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
