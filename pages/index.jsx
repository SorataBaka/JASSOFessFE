import styles from "../styles/Home.module.css";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";

export default function Home() {
	const [confessionText, setConfessionText] = useState("");

	useEffect(() => {
		const fetchConfessions = async () => {
			await fetch("http://localhost:3001/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
		};
		fetchConfessions();
	}, []);
	const handleSubmission = async () => {
		if (confessionText.length < 5 || confessionText.length > 400)
			alert("Confession must be between 5 and 400 characters");
		const post = await fetch("http://localhost:3001/api/v1/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: confessionText,
			}),
			credentials: "include",
		});
		const postjson = await post.json();
		if (postjson.isValid === true) {
			setConfessionText("");
			alert("Successfully submitted confession");
		}
	};
	return (
		<>
			<NextSeo
				title="Jasso Confession"
				description="Find out what students living in the JASSO Dormitory have to say about their experience at JASSO"
			/>
			<div className={styles.mainContainer}>
				<div className={styles.inputContainer}>
					<h2>Anything to get off your chest?</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<input
							type="text"
							placeholder="Let it out here!"
							value={confessionText}
							onChange={(e) => {
								setConfessionText(e.target.value);
							}}
						/>
						<button
							type="submit"
							onClick={() => {
								handleSubmission();
							}}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</>
	);
}
