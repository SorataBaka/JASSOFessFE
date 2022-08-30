import styles from "../styles/Home.module.css";
import { NextSeo } from "next-seo";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Slider from "../components/slider";

export default function Home() {
	const [confessionText, setConfessionText] = useState("");
	const [wordLength, setWordLength] = useState(400);
	const [jassoBranch, setJassoBranch] = useState("OSAKA");

	useEffect(() => {
		const fetchConfessions = async () => {
			const prefetch = await axios.request({
				method: "GET",
				url: "https://api.jassofess.tianharjuno.com/",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				withCredentials: true,
			});
			const cookies = prefetch.headers;
			console.log(prefetch.data, prefetch.headers);
			return;
		};
		fetchConfessions();
	}, []);

	const handleSubmission = async () => {
		if (confessionText.length < 10 || confessionText.length > 400)
			return toast.error("Confession must be between 10 and 400 characters.");
		const newpost = await axios
			.request({
				url: "https://api.jassofess.tianharjuno.com/api/v1/post",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				data: {
					message: confessionText,
					branch: jassoBranch,
				},
				withCredentials: true,
			})
			.catch((err) => {
				return undefined;
			});
		if (newpost === undefined) {
			toast.error("Something went wrong! Please try again.");
			return;
		}
		const postjson = newpost.data;
		if (postjson.isValid === true) {
			setConfessionText("");
			setWordLength(400);
			toast.success("Confession posted successfully!");
		} else {
			toast.error("Something went wrong! Please try again.");
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
								setWordLength(400 - e.target.value.length);
							}}
						/>
						<p>{wordLength} Characters Left</p>
						<div className={styles.sliderdiv}>
							<Slider
								jassoBranch={jassoBranch}
								setJassoBranch={setJassoBranch}
							/>
						</div>
						<button
							type="submit"
							disabled={
								confessionText.length < 10 || confessionText.length > 400
							}
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
