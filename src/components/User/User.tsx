import React, { forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { List } from '../../types/dataTypes';

interface Props {
  user: List;
}

const User = ({ user }: Props, ref: any) => {
  const { id, imageUrl, lastName, name, prefix, title } = user;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/user/${id}`);
  };

  const postBody = (
    <>
      <Container onClick={handleClick}>
        <ImageContainer>
          <Image src={`${user.imageUrl}?v=${user.id}`} />
        </ImageContainer>
        <Content>
          <Name> {`${prefix} ${name} ${lastName}`} </Name>
          <Title> {title} </Title>
        </Content>
      </Container>
    </>
  );

  const content = ref ? <article ref={ref}>{postBody}</article> : postBody;

  return content;
};

const Container = styled.div`
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e5e5;
  border-radius: 15px 15px 0 0;

  cursor: pointer;
`;

const ImageContainer = styled.div`
  border-radius: 15px 15px 0 0;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Name = styled.h3``;

const Title = styled.p``;

export default forwardRef(User);
