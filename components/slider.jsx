import styles from "../styles/Slider.module.css";
export default function Slider({ jassoBranch, setJassoBranch }) {
	return (
		<label className={styles.switch}>
			<input
				type="checkbox"
				checked={jassoBranch === "TOKYO" ? true : false}
				onChange={() => {
					setJassoBranch(
						jassoBranch.toUpperCase() === "TOKYO" ? "OSAKA" : "TOKYO"
					);
				}}
			/>
			<div className={styles.slider}>
				<h3>{jassoBranch == "TOKYO" ? "Tokyo" : "Osaka"}</h3>
			</div>
		</label>
	);
}
