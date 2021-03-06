import React from 'react';
import { useHistory } from 'react-router-dom';
import {
	Breadcrumb,
	Container,
	Segment,
	Grid,
	Divider,
	List,
	Card,
	Header,
	Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { selectOneProject } from '../../redux/projects/projects.selectors';
import { ProjectsModal } from '../../components/Project-modal/ProjectsModal.component';
import { UserTable } from '../../components/user-table/UserTable.component';
import { TaskTable } from '../../components/taskTable/TaskTable.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { DoughnutChart } from '../../components/dataCharts/TaskPriorityChart.component';

const ProjectDetails = ({ project, currentUser }) => {
	const history = useHistory();
	const returnBack = () => {
		history.push('/user/projects');
	};
	const { projectTasks } = project || {};
	const { role } = currentUser.userInfo || {};

	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Section onClick={returnBack} link>
					<Breadcrumb.Divider icon='left arrow' /> Projects
				</Breadcrumb.Section>
				<Breadcrumb.Divider />
				<Breadcrumb.Section active>Details</Breadcrumb.Section>
			</Breadcrumb>
			{role === 'Admin' && (
				<Header floated='right'>
					<ProjectsModal theproject={project} />
				</Header>
			)}
			<Divider />
			{project && (
				<Container>
					<Segment compact padded color='teal'>
						<Grid stackable>
							<Grid.Row>
								<Grid.Column width={7}>
									<Card
										fluid
										extra={
											<Label color='teal' ribbon>
												Manager: {project.createdBy}
											</Label>
										}
										centered
										raised
										header={project.name}
										meta={
											<Label color='green' horizontal>
												In Progress
											</Label>
										}
										description={project.description}
									/>
									<Segment color='teal' size='large' raised>
										<List size='large' horizontal>
											<List.Item
												header='Started'
												description={new Date(
													project.created
												).toLocaleDateString()}
											/>
											<List.Item
												header='Due Date'
												description={new Date(
													project.deadline
												).toLocaleDateString()}
											/>
											<List.Item
												description={project.priority}
												header='Priority'
											/>
										</List>
									</Segment>
								</Grid.Column>

								<Grid.Column width={9}>
									<DoughnutChart projectTasks={projectTasks} />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column width={7}>
									{project.assignedDevs && (
										<UserTable
											setcontent='Assigned Personnel'
											users={project.assignedDevs}
										/>
									)}
								</Grid.Column>
								<Grid.Column width={9}>
									<TaskTable
										setcontent='Project Tasks'
										usefor='projectDetails'
										allTasks={project.projectTasks}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
				</Container>
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		project: selectOneProject(ownProps.match.params.id)(state),
		currentUser: selectCurrentUser(state),
	};
};

export default connect(mapStateToProps)(ProjectDetails);
