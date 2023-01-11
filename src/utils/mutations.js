import { gql } from "@apollo/client";

const ADD_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    registerUser(username: $username, email: $email, password: $password) {
      _id
      email
      token
      username
    }
  }
`;

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      token
      username
    }
  }
`;
const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $description: String!) {
    addComment(postId: $postId, description: $description) {
      _id
      authorId
      postId
      description
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      _id
      authorId
      postId
      description
    }
  }
`;

const FOLLOW_USER = gql`
  mutation FollowUser($followUserId: ID!) {
    followUser(followUserId: $followUserId) {
      _id
      username
      email
      postsCount
      bio
      followers
      followingUsers
      token
    }
  }
`;

const UNFOLLOW_USER = gql`
  mutation UnfollowUser($unfollowUserId: ID!) {
    unfollowUser(unfollowUserId: $unfollowUserId) {
      _id
      username
      email
      token
      postsCount
      bio
      followers
      followingUsers
    }
  }
`;

const ADD_POST = gql`
  mutation AddPost($title: String!, $description: String!) {
    addPost(title: $title, description: $description) {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
      author {
        _id
        username
        bio
      }
      commentsCount
    }
  }
`;

const DELETE_POST = gql`
mutation AddPost($postId: ID!) {
  deletePost(postId: $postId) {
    _id
    authorId
    title
    description
    likes
    dislikes
    likesCount
    author {
      _id
      username
      email
      bio
    }
  }
}
`;

export {
  ADD_USER,
  LOGIN_USER,
  ADD_COMMENT,
  DELETE_COMMENT,
  FOLLOW_USER,
  UNFOLLOW_USER,
  ADD_POST,
  DELETE_POST
};
