import React from 'react';
import Hero from './Hero/Hero';
import CodeSamples from './CodeSamples/CodeSamples';
import Footer from '../../Footer/Footer';

const Home = () => (
	<main className="home">
		<Hero />
		<CodeSamples />
		<Footer />
	</main>
);

export default Home;
