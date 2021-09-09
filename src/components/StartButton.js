import { useGloabalContext } from "../context";

const StartButton = () => {
	const {
		startGame,
		setIsPowerOn,
		isPowerOn,
		setIsStrictMode,
		isStrictMode,
	} = useGloabalContext();

	return (
		<div className="buttons">
			<div class="top-btns">
				<div className="start-btn" onClick={startGame}>
					<div className="btn"></div>
					<p>START</p>
				</div>
				<div
					className={
						isStrictMode ? "strict-btn active" : "strict-btn"
					}
					onClick={() => setIsStrictMode((val) => !val)}
				>
					<div className="btn"></div>
					<p>STRICT</p>
				</div>
			</div>
			<div
				className={isPowerOn ? "power-btn active" : "power-btn"}
				onClick={() => setIsPowerOn((val) => !val)}
			>
				<p>OFF</p>
				<div className="toggle"></div>
				<p>ON</p>
			</div>
		</div>
	);
};

export default StartButton;
