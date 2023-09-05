import { Link, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './ProjectSideBar.css';
import { createProject, getProjects } from './ProjectSideBarApi';
import Swal from 'sweetalert2';

const ProjectSideBar = () => {
  const handleCreateProject = async () => {
    const { value: name } = await Swal.fire({
      title: 'Project Name',
      input: 'text',
      inputValidator: (value) => {
        if (!value) {
          return 'Please Enter the Project Name';
        }
        if (value.match(/^\d/)) {
          return 'Project Name should not start with a number';
        }
      },
    });
    if (name) {
      mutation.mutate({ name: name, content: '' });
    }
  };
  const queryClient = useQueryClient();
  const query = useQuery(['projects'], getProjects);

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
  });

  return (
    <>
      <div className='sidebar'>
        <div className='header'>
          <Button
            className='rounded-pill w-80'
            variant='primary'
            onClick={handleCreateProject}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
        <div className='content'>
          {query.isLoading && <div>Loading...</div>}
          {query.data && (
            <ul>
              {query.data.getProjects.map((e) => (
                <li key={e.project.id}>
                  <Link to={'project/' + e.project.id}>{e.project.name}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ProjectSideBar;
