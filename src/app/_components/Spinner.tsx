import styled from 'styled-components';

const Spinner = () => {
  return (
    <Wrap>
      <LoadingSpinner />
    </Wrap>
  );
};

export default Spinner;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
`;

const LoadingSpinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #fff;
  border-bottom-color: #6c5ce7;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;

  animation: rotation 1s linear infinite;

  @keyframes mulShdSpin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
