import styled from 'styled-components';

const Spinner = ({
  title,
  isHide = true
}: {
  title: string;
  isHide?: boolean;
}) => {
  return (
    <Wrap>
      <LoadingSpinner />
      <Text>{title}</Text>
    </Wrap>
  );
};

export default Spinner;

const Wrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 1rem 0;
  flex-direction: column;
`;

const LoadingSpinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid #ddd;
  border-bottom-color: #6c5ce7;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Text = styled.span`
  color: #6c5ce7;
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
  letter-spacing: 1.5px;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
