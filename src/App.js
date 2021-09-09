import Display from "./components/Display";
import MusicButton from "./components/MusicButon";
import StartButton from "./components/StartButton";
import Victory from "./components/Victory";
import { useGloabalContext } from "./context";
import MUSICS from "./MUSIC";

function App() {
	const { won } = useGloabalContext();
	return (
		<div className="app">
			<div className="top">
				<div className="center-circle">
					<h2>SIMON</h2>
					<Display />
					<StartButton />
				</div>
				<div className="music-buttons">
					{MUSICS.map((music, index) => (
						<MusicButton
							key={music.id}
							music={music}
							index={index}
						/>
					))}
				</div>
			</div>
			{won && <Victory />}
		</div>
	);
}

export default App;
