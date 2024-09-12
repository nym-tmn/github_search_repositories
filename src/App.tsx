import { useState } from 'react';

import Header from './components/Header/Header';
import StartPage from './components/Start_page/Start_page';
import Footer from './components/Footer/Footer';
import MainContentContainer from './components/Main_content/Main_content_container';

import './App.css';

function App() {

	const [isStarted, setIsStarted] = useState(false);

	return (
		<div className='appWrapper'>
			<Header setIsStarted={setIsStarted} />
			{!isStarted ?
				<StartPage /> : 
				<MainContentContainer />}
			<Footer />
		</div>
	);
}

export default App;
