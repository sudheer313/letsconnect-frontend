import { gql } from "@apollo/client";

const QUERY_ALLPOSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
      author {
        username
      }
      commentsCount
    }
  }
`;

const QUERY_ALLTRENDINGPOSTS = gql`
  query GetAllTrendingPosts {
    getAllTrendingPosts {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
      author {
        username
      }
      commentsCount
    }
  }
`;

const QUERY_SINGLEUSER = gql`
  query Query($userId: ID!) {
    getUser(userId: $userId) {
      _id
      username
      email
      postsCount
      bio
      followers
      followingUsers
    }
  }
`;

const QUERY_RANDOMUSERS = gql`
  query GetRandomUsers {
    getRandomUsers {
      _id
      username
    }
  }
`;

const QUERY_POSTBYSEARCH = gql`
  query GetPostBySearch($searchQuery: String!) {
    getPostBySearch(searchQuery: $searchQuery) {
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
        postsCount
        bio
        followers
        followingUsers
      }
      commentsCount
    }
  }
`;

const QUERY_POSTBYUSER = gql`
  query GetPostsByUser($userId: ID!) {
    getPostsByUser(userId: $userId) {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
      commentsCount
      author {
        _id
        username
        followingUsers
        followers
        bio
        postsCount
      }
    }
  }
`;

const QUERY_SINGLEPOST = gql`
  query GetPost($postId: ID!) {
    getPost(postId: $postId) {
      _id
      authorId
      title
      description
      dislikes
      likes
      commentsCount
      likesCount
      author {
        username
        _id
        email
        postsCount
        bio
        followers
        followingUsers
      }
    }
  }
`;
const GET_POST = gql`
  query Post($id: ID!) {
    post(id: $id) {
      _id
      authorId
      title
      description
      likes
      dislikes
      likesCount
      commentsCount
      author {
        _id
        username
      }
      comments {
        _id
        authorId
        postId
        description
        author {
          _id
          username
        }
      }
    }
  }
`;
const GET_COMMENTS = gql`
  query GetComments($postId: ID!) {
    comments(postId: $postId) {
      _id
      description
      author {
        _id
        username
      }
    }
  }
`;
export {
  QUERY_ALLPOSTS,
  QUERY_ALLTRENDINGPOSTS,
  QUERY_SINGLEUSER,
  QUERY_RANDOMUSERS,
  QUERY_POSTBYSEARCH,
  QUERY_POSTBYUSER,
  QUERY_SINGLEPOST,
  GET_POST,
  GET_COMMENTS,
};
