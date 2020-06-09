import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Profile from '../profile/profile.component';
import ProjectPage from '../../pages/project-page/Project-page';
import Dashboard from '../../pages/dashboard-page/Dashboard-page.component';
import TasksPage from '../../pages/tasks-pages/Tasks-page.component';

import { Divider } from 'semantic-ui-react';
import { ContentContainer } from './page-content.styles';
import UsersPage from '../../pages/users-page/users-page.component';

const PageContent = ({ currentUser, ...props }) => {
	let { path } = useRouteMatch();

	return (
		<ContentContainer>
			<Switch>
				<Route exact path={`${path}`}>
					<Profile currentUser={currentUser} />
				</Route>
				<Route path={`${path}/projects`}>
					<ProjectPage currentUser={currentUser} />
				</Route>
				<Route exact path={`${path}/dashboard`}>
					<Dashboard currentUser={currentUser} />
				</Route>
				<Route path={`${path}/tasks`}>
					<TasksPage />
				</Route>
				<Route exact path={`${path}/roles`}>
					<UsersPage />
				</Route>
			</Switch>
			<Divider />
			<p>@ 2020 - Joel D. Infante</p>
		</ContentContainer>
	);
};

// <Route component={NoMatch} />
// const NoMatch = () => <h1>404 page not found</h1>;

export default PageContent;
