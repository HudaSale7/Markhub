import { useParams } from 'react-router-dom';
// import { useQuery } from '@tanstack/react-query';
// import { getProject } from './ProjectApi';
import './Project.css';
import MarkDownEditor from './MarkDownEditor';

const Project = () => {
  const { id } = useParams();
  return (
    <>
      <div className='project'>
        <MarkDownEditor/>
      </div>
    </>
  );
};

export default Project;
