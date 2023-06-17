import { Box, Button } from '@chakra-ui/react';

const GoogleLoginButton = function () {
  return (
    <Button
      size="lg"
      width="full"
      maxW="md"
      borderRadius="full"
      bgColor="#4285f4"
      color="white"
      colorScheme="blue"
      leftIcon={<img src="/google.svg" alt="google 로고" style={{ backgroundColor: 'white', padding: '8px' }} />}
    >
      Google 게정으로 시작하기
    </Button>
  );
};

export default GoogleLoginButton;
