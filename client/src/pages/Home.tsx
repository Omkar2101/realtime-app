
import React from 'react';
import ChatUI from './chatUi';

const Home: React.FC = () => {

    
	return (
		<div className="container mt-5 p-4 bg-light rounded shadow">
			<h1 className="display-4 text-primary fw-bold mb-3">Welcome to the Home Page</h1>
			<p className="lead text-secondary">
				This is the main landing page of your app.
			</p>
            <><ChatUI /></>
		</div>
	);
};

export default Home;
