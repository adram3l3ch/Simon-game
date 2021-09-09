import { createContext, useContext, useState, useEffect, useRef } from "react";

import MUSICS from "./MUSIC";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
	let interval;
	let timeout;
	let a;
	let playMusicTimeout;
	const [melody, setMelody] = useState([]);
	const [userMelody, setUserMelody] = useState([]);
	const [userTurn, setUserTurn] = useState(false);
	const [count, setCount] = useState(null);
	const [error, setError] = useState(false);
	const [isPowerOn, setIsPowerOn] = useState(false);
	const [active, setActive] = useState(null);
	const [isStrictMode, setIsStrictMode] = useState(false);
	const [won, setWon] = useState(false);
	const playMusicTimeoutRef = useRef(playMusicTimeout);
	const aRef = useRef(a);
	const intervalRef = useRef(interval);
	const timeoutRef = useRef(timeout);

	const playMusic = (num = 0) => {
		setUserTurn(false);
		setError(false);
		clearTimeout(timeoutRef.current);
		if (melody[num] > -1) {
			setActive(melody[num]);
			setTimeout(() => setActive(null), 500);
			const song = document.querySelector(
				`#${MUSICS[melody[num]].id}-audio`
			);
			song.play();
			if (melody[num + 1] > -1) {
				timeoutRef.current = setTimeout(() => playMusic(num + 1), 800);
			} else {
				setUserTurn(true);
			}
		}
	};

	const pushMelody = () => {
		let random = Math.floor(Math.random() * 4);
		setMelody((melody) => [...melody, random]);
	};

	const checkMatch = () => {
		let mel;
		setUserMelody((melody) => {
			mel = [...melody];
			return melody;
		});
		if (
			melody.every((tune, index) => tune === mel[index]) &&
			melody.length === mel.length
		) {
			clearInterval(intervalRef.current);
			setCount((count) => count + 1);
			setUserMelody([]);
		} else {
			setError(true);
			setUserMelody([]);
			playMusic();
		}
	};

	const checkMatchOnUserInput = () => {
		if (!userMelody.every((tune, index) => tune === melody[index])) {
			setError(true);
		} else if (userMelody.length === melody.length) {
			clearInterval(intervalRef.current);
			setCount((count) => count + 1);
			setUserMelody([]);
		}
	};

	const startGame = () => {
		if (isPowerOn) {
			setCount((count) => 1);
			setUserMelody([]);
			setMelody([]);
		}
	};

	useEffect(() => {
		if (error) {
			clearInterval(intervalRef.current);
			if (isStrictMode) {
				setCount(1);
				setUserMelody([]);
				setMelody([]);
			} else {
				setUserMelody([]);
			}
			playMusicTimeoutRef.current = setTimeout(playMusic, 2000);
			intervalRef.current = setInterval(checkMatch, count * 800 + 8000);
		}
		return () => clearTimeout(playMusicTimeoutRef.current);
	}, [error]);

	useEffect(() => {
		if (typeof count == "number") {
			playMusic();
			intervalRef.current = setInterval(checkMatch, count * 800 + 8000);
		}
		return () => clearInterval(intervalRef.current);
	}, [melody]);

	useEffect(() => {
		if (typeof count == "number") {
			if (count === 21) {
				setWon(true);
			} else {
				aRef.current = setTimeout(pushMelody, 2000);
			}
		}
		return () => clearTimeout(aRef.current);
	}, [count]);

	useEffect(() => {
		if (won) {
			clearTimeout(timeoutRef.current);
			clearInterval(intervalRef.current);
			setCount(null);
			setUserMelody([]);
			setMelody([]);
			setActive(null);
			setTimeout(() => setWon(false), 2000);
		}
	}, [won]);

	useEffect(() => {
		if (typeof count == "number" && userMelody.length > 0) {
			checkMatchOnUserInput();
		}
	}, [userMelody]);

	useEffect(() => {
		if (!isPowerOn) {
			clearTimeout(timeoutRef.current);
			clearInterval(intervalRef.current);
			setCount(null);
			setUserMelody([]);
			setMelody([]);
			setActive(null);
		}
	}, [isPowerOn]);

	return (
		<AppContext.Provider
			value={{
				error,
				count,
				isPowerOn,
				startGame,
				setIsPowerOn,
				isStrictMode,
				setIsStrictMode,
				setUserMelody,
				active,
				setActive,
				userTurn,
				won,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

const useGloabalContext = () => {
	return useContext(AppContext);
};

export { useGloabalContext, ContextProvider };
