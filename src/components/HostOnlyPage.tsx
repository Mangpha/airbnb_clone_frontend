import { useNavigate } from 'react-router-dom';
import { useUser } from '../lib/useUser';
import React, { useEffect } from 'react';

export const useHostOnlyPage = () => {
	const { user, userLoading } = useUser();
	const navigate = useNavigate();
	useEffect(() => {
		if (!userLoading) if (!user?.is_host) navigate('/');
	}, [userLoading, user, navigate]);
	return <>{}</>;
};
