import { useGloabalContext } from "../context";

const MusicButton = ({ music, index }) => {
	const { setUserMelody, isPowerOn, active, setActive, userTurn } =
		useGloabalContext();

	const playMusic = (e) => {
		if (isPowerOn && userTurn) {
			setActive(index);
			setTimeout(() => setActive(null), 500);
			e.target.childNodes[0].play();
			setUserMelody((userMelody) => [...userMelody, index]);
		}
	};

	return (
		<div
			id={music.id}
			className={`music-button ${active === index ? "active" : ""}`}
			onClick={playMusic}
		>
			<audio src={music.src} id={`${music.id}-audio`} />
		</div>
	);
};

export default MusicButton;
