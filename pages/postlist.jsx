import styles from "../styles/Postlist.module.css";
import { useState, useCallback, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { NextSeo } from "next-seo";
export default function PostList() {
	const [pageNumber, setPageNumber] = useState(1);
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [isLastPage, setIsLastPage] = useState(false);

	const observer = useRef();
	const lastPostElementRef = useCallback(
		(node) => {
			if (isLoading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && !isLastPage) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});
			if (node) observer.current.observe(node);
		},
		[isLoading, isLastPage]
	);

	const fetchPosts = () => {
		if (isLastPage) return;
		fetch(`http://localhost:3001/api/v1/list?page=${pageNumber}`)
			.then((res) => res.json())
			.then((data) => {
				if (!data.isValid) {
					toast.error("Something went wrong");
					setIsError(true);
					setIsLoading(false);
					return;
				}
				if (data.data.length === 0) {
					setIsError(false);
					setIsLoading(false);
					setIsLastPage(true);
					return;
				}
				setPosts((post) => {
					//remove duplicates
					return [...new Set([...post, ...data.data.confessions])];
				});
				setIsLoading(false);
			})
			.catch((err) => {
				setIsError(true);
				setIsLoading(false);
			});
	};
	const downloadImage = async (postid) => {
		const data = await fetch(`http://localhost:3001/api/v1/generate/${postid}`);
		const blob = await data.blob();
		const url = window.URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `${postid}.png`);
		document.body.appendChild(link);
		link.click();
		link.remove();
	};
	useEffect(() => {
		fetchPosts();
		//eslint-disable-next-line
	}, [pageNumber]);

	return (
		<>
			<NextSeo
				title="Jasso Confession"
				description="Find out what students living in the JASSO Dormitory have to say about their experience at JASSO"
			/>
			<div className={styles.maincontainer}>
				{posts.map((post, index) => {
					if (index === posts.length - 1) {
						return (
							<div
								className={styles.postcontainer}
								key={index}
								ref={lastPostElementRef}
								onClick={() => {
									downloadImage(post._id);
								}}
							>
								<p className={styles.confessionText}>{post.confession}</p>
								<h5>Posted At: {new Date(post.createdAt).toLocaleString()}</h5>
								<h5>Branch: {post.branch === "OSAKA" ? "Osaka" : "Tokyo"}</h5>
							</div>
						);
					} else {
						return (
							<div
								className={styles.postcontainer}
								key={index}
								onClick={() => {
									downloadImage(post._id);
								}}
							>
								<p className={styles.confessionText}>{post.confession}</p>
								<h5>Posted At: {new Date(post.createdAt).toLocaleString()}</h5>
								<h5>Branch: {post.branch === "OSAKA" ? "Osaka" : "Tokyo"}</h5>
							</div>
						);
					}
				})}
				{isLoading && <div>Loading...</div>}
				{isLastPage && (
					<div className={styles.lastconfession}>No more confessions</div>
				)}
				{isError && <div>Failed to fetch more confessions...</div>}
			</div>
		</>
	);
}
