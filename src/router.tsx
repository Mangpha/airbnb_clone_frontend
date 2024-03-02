import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import { Home } from './routes/Home';
import { NotFound } from './routes/NotFound';
import { RoomDetail } from './routes/RoomDetail';
import { GithubConfirm } from './routes/GithubConfirm';
import { KakaoConfirm } from './routes/KakaoConfirm';
import { HostingRoom } from './routes/HostingRoom';
import { UploadPhotos } from './routes/UploadPhotos';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <NotFound />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'rooms/upload',
				element: <HostingRoom />,
			},
			{
				path: 'rooms/:roomPk',
				element: <RoomDetail />,
			},
			{
				path: 'rooms/:roomPk/photos',
				element: <UploadPhotos />,
			},
			{
				path: 'social',
				children: [
					{
						path: 'github',
						element: <GithubConfirm />,
					},
					{
						path: 'kakao',
						element: <KakaoConfirm />,
					},
				],
			},
		],
	},
]);
