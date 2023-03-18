import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const RootLayout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;

export default RootLayout;
