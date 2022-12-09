import React from "react";
import { Link } from "react-router-dom";

const FriendsList = ({ friendCount, friends }) => {
  if (!friends || !friends.length) {
    return <p>Make some friends!</p>;
  }

  return (
    <div>
      <h5>My {friendCount === 1 ? "friend" : "friends"}</h5>
      {friends.map((friend) => (
        <button className="button-29" key={friend._id}>
          <Link to={`/profile/${friend.username}`}>{friend.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default FriendsList;
