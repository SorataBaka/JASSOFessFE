import styles from "../styles/Home.module.css";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
	const [confessionText, setConfessionText] = useState("");

	useEffect(() => {
		const fetchConfessions = async () => {
			const prefetch = await fetch("http://localhost:3001/", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).catch((err) => {
				return undefined;
			});
			if (prefetch === undefined) {
				return toast.error("Something went wrong! Please try again.");
			}
			return;
		};
		fetchConfessions();
	}, []);
	const handleSubmission = async () => {
		if (confessionText.length < 5 || confessionText.length > 400) {
			toast.error("Confession must be between 5 and 400 characters.");
			return;
		}
		const post = await fetch("http://localhost:3001/api/v1/post", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: confessionText,
				branch: "TOKYO",
			}),
			credentials: "include",
		}).catch((err) => {
			return undefined;
		});
		if (post === undefined) {
			if (err) toast.error("Something went wrong! Please try again.");
			return;
		}
		const postjson = await post.json();
		if (postjson.isValid === true) {
			setConfessionText("");
			toast.success("Confession posted successfully!");
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
