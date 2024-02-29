import { useHostOnlyPage } from '../components/HostOnlyPage';
import { ProtectedPage } from '../components/ProtectedPage';

export const HostingRoom = () => {
	useHostOnlyPage();
	return (
		<ProtectedPage>
			<h1>Hosting Room</h1>
		</ProtectedPage>
	);
};
