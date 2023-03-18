import styled from 'styled-components';
import { getAllUsers } from '../axios';
import Loader from '../components/Loader';
import User from '../components/User/User';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { device } from '../mediaQueries';

const Home = () => {
  const { items, isLoading, lastItemRef, hasMore } = useInfiniteScroll(
    getAllUsers,
    1,
    10
  );

  return (
    <Container>
      <Wrapper>
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <User key={`last-${item.id}`} user={item} ref={lastItemRef} />
          ) : (
            <User key={`${index}-${item.name}`} user={item} />
          )
        )}
        {isLoading && (
          <div
            style={{
              gridColumn: '1 / -1',
            }}
          >
            <Loader />
          </div>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  /* padding: 20px; */
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;

  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.laptopL} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${device.desktop} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default Home;
