import { gql } from "@apollo/client";

export const POST_LIST = gql`
	query getPostList($pageNumber: Int, $limit: Int) {
		postList(limit: $limit, pageNumber: $pageNumber) {
			_id
		}
	}
`;

export const POST_LIST_COUNT = gql`
	query getPostListCount {
		postListCount
	}
`;

export const GET_POST = gql`
	query fetchPost($id: String!) {
		getPost(id: $id) {
			_id
			author
			body
			createdDate
			likes {
				liker
			}
		}
	}
`;

export const DELETE_POST = gql`
	mutation deletePost($id: String!) {
		deletePost(id: $id) {
			_id
		}
	}
`;

export const UPDATE_POST = gql`
	mutation updatePost($id: String!, $body: String!) {
		updatePost(id: $id, body: $body) {
			body
			_id
		}
	}
`;
export const ADD_POST = gql`
	mutation addPost($post: PostInputs!) {
		addPost(post: $post) {
			_id
			author
			body
			createdDate
			likes {
				liker
				id
			}
		}
	}
`;
export const TOGGLE_LIKE = gql`
	mutation toggleLike($id: String!, $liker: String!, $likerId: String!) {
		toggleLike(id: $id, liker: $liker, likerId: $likerId) {
			_id
			likes {
				liker
				id
			}
		}
	}
`;

export const GET_USER = gql`
	query getUser($id: String!) {
		user(id: $id) {
			_id
			email
			username
		}
	}
`;
