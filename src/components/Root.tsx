import { Outlet } from 'react-router-dom';

const Root = () => {
	return (
		<h1>
			Root Page
			<Outlet />
		</h1>
	);
};

export default Root;
