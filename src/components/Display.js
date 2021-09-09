import { useGloabalContext } from "../context";

const Display = () => {
	const { error, count, isPowerOn } = useGloabalContext();
	return (
		<div className="display">
			<p>
				{error
					? "Wrong !!"
					: count
					? count < 10
						? `0${count}`
						: count
					: isPowerOn
					? "--"
					: ""}
			</p>
		</div>
	);
};

export default Display;
