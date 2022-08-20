import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				theme="dark"
			/>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
