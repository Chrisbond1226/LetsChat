import React from "react";

//Importing components
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import FriendsList from "../components/FriendsList";

//Importing other important stuff
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { QUERY_POSTS, QUERY_ME_BASIC } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const posts = data?.posts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div>
        {loggedIn && (
          <div>
            <PostForm />
          </div>
        )}
        <div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList posts={posts} title="Posts" />
          )}
        </div>
        {loggedIn && userData ? (
          <div>
            <FriendsList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
