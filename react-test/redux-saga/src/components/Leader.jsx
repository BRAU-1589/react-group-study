import React from "react";

const Leader = ({ post, users }) => {
  return (
    <div>
      <section>
        <h1>포스트</h1>
        {post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
      <hr />
      <section>
        <h1>사용자 목록</h1>
        {users && (
          <ul>
            {users.map((user) => {
              return (
                <li key={user.id}>
                  {user.username} ({user.email})
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Leader;