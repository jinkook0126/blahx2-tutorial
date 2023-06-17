import { Avatar, Box, Button, Flex, FormControl, FormLabel, Switch, Text, Textarea, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import ResizeTextArea from 'react-textarea-autosize';
import { useState } from 'react';
import { ServiceLayout } from '@/components/service_layout';
import { useAuth } from '@/contexts/auth_user.context';

const userInfo = {
  uid: 'jinkook',
  email: 'jinkook0126@naver.com',
  displayName: 'Lee Jinkook',
  photoURL: 'https://lh3.googleusercontent.com/a/AAcHTtcNrF2MNyFVxnWaFyyBmMmSh4BAqzd6nvPq6Bu_RQ=s96-c',
};

const UserHomePage: NextPage = function () {
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const toast = useToast();
  const { authUser } = useAuth();
  return (
    <ServiceLayout title="love eunji" minH="100vh" backgroundColor="gray.50">
      <Box maxW="md" mx="auto" pt={6}>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={2} bg="white">
          <Flex p={6}>
            <Avatar size="lg" src={userInfo.photoURL} mr={2} />
            <Flex direction="column" justify="center">
              <Text fontSize="md">{userInfo.displayName}</Text>
              <Text fontSize="xs">{userInfo.email}</Text>
            </Flex>
          </Flex>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" mb={2} bg="white">
          <Flex align="center" p={2}>
            <Avatar
              size="xs"
              src={isAnonymous ? 'https://bit.ly/broken-link' : authUser?.photoURL ?? 'https://bit.ly/broken-link'}
              mr={2}
            />
            <Textarea
              bg="gray.100"
              border="none"
              placeholder="무엇이 궁금한가요?"
              resize="none"
              minH="unset"
              overflow="hidden"
              fontSize="xs"
              mr={2}
              maxRows={7}
              as={ResizeTextArea}
              value={message}
              onChange={(e) => {
                if (e.currentTarget.value) {
                  const lineCount = (e.currentTarget.value.match(/[^\n]*\n[^\n]*/gi)?.length ?? 1) + 1;
                  if (lineCount > 7) {
                    toast({ title: '최대 7줄까지만 입력가능합니다.', position: 'top-right' });
                    return;
                  }
                }
                setMessage(e.currentTarget.value);
              }}
            />
            <Button
              disabled={message.length === 0}
              bgColor="#FFB86C"
              color="white"
              colorScheme="yellow"
              variant="solid"
              size="sm"
            >
              등록
            </Button>
          </Flex>
          <FormControl display="flex" alignItems="center" mt={1} mx={2} pb={2}>
            <Switch
              size="sm"
              colorScheme="orange"
              id="anonymous"
              mr={1}
              isChecked={isAnonymous}
              onChange={() => {
                if (authUser === null) {
                  toast({ title: '로그인이 필요합니다.', position: 'top-right' });
                  return;
                }
                setIsAnonymous((prev) => !prev);
              }}
            />
            <FormLabel htmlFor="anonymous" mb={0} fontSize="xx-small">
              Anonymous
            </FormLabel>
          </FormControl>
        </Box>
      </Box>
    </ServiceLayout>
  );
};
export default UserHomePage;
