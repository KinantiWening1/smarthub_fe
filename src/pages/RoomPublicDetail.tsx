import { useParams } from "react-router-dom";
import { useEffect } from "react";
export default function RoomPublicDetail() {
	const params = useParams();
	useEffect(() => {
		console.log(params.id);
	}, [params.id]);
	return <div>{/* Login form, input fields, buttons, etc. */}</div>;
}
