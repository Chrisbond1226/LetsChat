import React, { useState } from "react";

//Other important stuff
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";

const maxPostCharacters = 280;

const PostForm = () => {
  const [postText, setText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      } catch (err) {
        console.warn("First post by this user!");
      }

      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    },
  });

  const handleChange = (event) => {
    if (event.target.value.length <= maxPostCharacters) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { postText },
      });

      setText("");
      setCharacterCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <p>
        Character Count: {characterCount}/{maxPostCharacters}
        {error && <span>Something went wrong...</span>}
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What is on your mind?"
          value={postText}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
