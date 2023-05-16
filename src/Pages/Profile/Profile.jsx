import {
  createStyles,
  Header,
  Group,
  Button,
  Text,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  Card,
  Badge,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase';
import { useRecoilState, } from 'recoil';

import userAtom from "../../recoil/userAtom"



const useStyles = createStyles((theme) => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan('sm')]: {
      height: rem(42),
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    }),

    '&:active': theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export function Profile() {
    const [user, setUser] = useRecoilState(userAtom);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const { classes, theme } = useStyles();

  const navigate = useNavigate()

  const handleSignOUt = () => {
    auth.signOut().then(() => {
        setUser({})
        navigate('/login')

    })
  } 

  const getBadgeColor = (score) => {
    if(score < 500 && score >= 0 ) return {
            color: "#CD7F32",
            badge: "Bronze"
        }
    if(score < 1000 && score >= 500 ) return {
            color: "silver",
            badge: "silver"
        }
    else {
        return {
            color: "gold",
            badge: "gold"
        }
    }
  }


  return (

    <Box pb={120} >
      <Header height={100} px="md">
        <Group position="apart" sx={{ height: '100%' }}>
          <Text size="2.5rem" color='#228be6' weight="bold"  transform='capitalize'> wordy </Text>

          <Group className={classes.hiddenMobile}>
            <Button onClick={handleSignOUt}  variant="default">Deconnecter</Button>

          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="wordy"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Divider my="sm" color={theme.colorScheme === 'dark' ? 'dark.5' : 'gray.1'} />

          <Group position="center" grow pb="xl" px="md">
            <Button onClick={handleSignOUt}  variant="default">Deconnecter</Button>
          </Group>
        </ScrollArea>
      </Drawer>

      <Box mt={100} px={200} width="fit-content" >
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>{user.Pseudo}: {user.Score}</Text>
            <Badge  variant="light">
                {getBadgeColor(user.Score).badge}
            </Badge>
      </Group>
      <Group position="apart" mt="md" mb="xs">
        <Title order={3}  weight={500} mt="md">List Des Mots: </Title>
        
      </Group>
      
        {
            [...new Set(user.mots)].map((mot, index) => {
                return (
                    <Text align="left" component="div" display="block" key={index} weight={500} mt="md">.{mot}</Text>
                )
            })
        }
      
      
        

      <Button onClick={() => navigate('/game')} variant="light" color="blue" fullWidth mt="md" radius="md">
        JOUER
      </Button>
    </Card>
      </Box>
    </Box>
  );
}

export default Profile