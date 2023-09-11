import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import './ProjectSideBar.css';
import { createProject, deleteProject, getProjects } from './ProjectSideBarApi';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ProjectSideBar = () => { 
  const { id } = useParams();
  const [active, setActive] = useState(id ? +id : -1);
  const navigate = useNavigate();

  const handleCreateProject = async () => {
    const { value: name } = await Swal.fire({
      title: 'Project Name',
      input: 'text',
      showCancelButton: true,
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
      createProjectMutation.mutate({ name: name, content: '' });
    }
  };

  const handleDeleteProject = (id: number) => {
    deleteProjectMutation.mutate(id);
  };

  const queryClient = useQueryClient();
  const query = useQuery(['projects'], getProjects);

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
      
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: (_, variables: number) => {
      queryClient.invalidateQueries(['projects']);
      queryClient.removeQueries({ queryKey: ['project', variables] });
      navigate('/project');
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
            disabled={createProjectMutation.isLoading}
          >
            {createProjectMutation.isLoading ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
        <div className='content'>
          {query.isLoading && <div>Loading...</div>}
          {query.data && (
            <ul>
              {query.data.getProjects.map((e) => (
                <li
                  key={e.project.id}
                  onClick={() => setActive(e.project.id)}
                  className={`${active == e.project.id ? 'active' : ''}`}
                >
                  <Link to={'/project/' + e.project.id}>{e.project.name}</Link>
                  <div className='icon'>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='font-icon'
                      onClick={() => handleDeleteProject(e.project.id)}
                    />
                  </div>
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
