import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getAllFriends, getSingleUser } from '../axios';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import User from '../components/User/User';
import { device } from '../mediaQueries';
import Loader from '../components/Loader';

const UserDetail = () => {
  const [user, setUser] = useState<any>();
  const [currentPageName, setCurrentPageName] = useState<string[]>([]);
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);
  const { items, pagination, isLoading, lastItemRef, hasMore } =
    useInfiniteScroll(getAllFriends, 1, 10, idNumber);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSingleUser(idNumber);
      setUser(res.data);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const currentPage = user?.name;
    const newCurrentPageName = new Set(currentPageName);

    if (!newCurrentPageName.has(currentPage)) {
      setCurrentPageName([...newCurrentPageName, currentPage]);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [user?.name]);

  const handleNavigate = (userName: string) => {
    const index = items.findIndex(item => item.name === userName);
    navigate(`/user/${items[index].id}`);
  };

  return (
    <>
      <Container>
        <Image src={user?.imageUrl} />
        <InfoWrapper>
          <Info>
            <Name> {`${user?.prefix} ${user?.name} ${user?.lastName}`} </Name>
            <Title>{user?.title}</Title>
            <Email>
              <StrongTag>Email: </StrongTag>
              {user?.email}
            </Email>
            <IpAddress>
              <StrongTag>IP Address: </StrongTag>
              {user?.ip}
            </IpAddress>
            <JobArea>
              <StrongTag>Job Area: </StrongTag>
              {user?.jobArea}
            </JobArea>
            <JobType>
              <StrongTag>Job Type: </StrongTag>
              {user?.jobType}
            </JobType>
          </Info>
          <Address>
            {user?.address && (
              <>
                <City>
                  <StrongTag>City: </StrongTag>
                  {user?.address?.city}
                </City>
                <Country>
                  <StrongTag>Country: </StrongTag>
                  {user?.address?.country}
                </Country>
                <State>
                  <StrongTag>State: </StrongTag>
                  {user?.address?.state}
                </State>
                <Street>
                  <StrongTag>Street: </StrongTag>
                  {user?.address?.streetAddress}
                </Street>
                <ZipCode>
                  <StrongTag>Zip Code: </StrongTag>
                  {user?.address?.zipCode}
                </ZipCode>
              </>
            )}
          </Address>
        </InfoWrapper>
      </Container>

      <HistoryPage>
        {currentPageName.map((item, index) => (
          <NavigateToName key={index} onClick={() => handleNavigate(item)}>
            {item}
          </NavigateToName>
        ))}
      </HistoryPage>

      <FirendsWrapper>
        <FriendsTitle>Friends:</FriendsTitle>

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
      </FirendsWrapper>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 20px; */

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    flex-direction: row;
  }
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

const NavigateToName = styled.span`
  cursor: pointer;
  text-decoration: underline;
`;

const HistoryPage = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;

  @media ${device.laptopL} {
    width: 50%;
  }
`;

const StrongTag = styled.span`
  font-weight: 600;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    margin-left: 2rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media ${device.tablet} {
  }

  @media ${device.laptopL} {
    flex-direction: row;
  }
`;

const Email = styled.p`
  margin-top: 1rem;
`;

const IpAddress = styled.p``;

const JobArea = styled.p``;

const JobType = styled.p``;

const Address = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
`;

const Name = styled.h3``;

const Title = styled.h3`
  font-weight: 400;
`;

const City = styled.p``;

const Country = styled.p``;

const State = styled.p``;

const Street = styled.p``;

const ZipCode = styled.p``;

const FirendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const FriendsTitle = styled.h3``;

export default UserDetail;
