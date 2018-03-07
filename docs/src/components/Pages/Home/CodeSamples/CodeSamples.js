import React from 'react';
import CodeSample1 from './Markdown/1.md';
import CodeSample2 from './Markdown/2.md';
import CodeSample3 from './Markdown/3.md';
import CodeSample4 from './Markdown/4.md';

const CodeSamples = () => {

	// call window resize to correct line numbers
	setTimeout(() => {
		window.dispatchEvent(new Event('resize'));
	}, 700);

	return (
		<div className="code-samples">
			<div className="code-samples__inner">
				<CodeSample1 />
				<CodeSample2 />
				<CodeSample3 />
				<CodeSample4 />
			</div>
		</div>
	);
};

export default CodeSamples;
