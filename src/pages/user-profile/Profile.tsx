import { useParams } from "react-router-dom";

// utils

// apollo
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";

// types
import { User } from "../../types";
type Owner = Pick<User, "email" | "id" | "username">;
type Props = {};

const Profile = ({}: Props) => {
	// url params
	const params = useParams<{ id: string }>();
	const userId = params.id;

	// fetching the user profile
	const { loading, error, data } = useQuery(GET_USER, {
		variables: {
			id: userId,
		},
	});

	if (loading || error) return null;

	// owner means: the owner of this profile and I named like this so that it does not conflict with
	// signed user, which is named as user
	const owner: Owner = data.user;

	return <div>{owner.username}</div>;
};

export default Profile;
