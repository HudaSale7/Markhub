import { Link } from 'react-router-dom';

const Intro = () => {
  return (
    <>
      <div>Hello from intro</div>
      <Link to='/login'>login</Link>
      <Link to='/signUp'>sign up</Link>
    </>
  );
};

export default Intro;
