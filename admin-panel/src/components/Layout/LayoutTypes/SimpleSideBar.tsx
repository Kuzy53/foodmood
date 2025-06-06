import React, {useEffect, useState} from "react";
import Views from "@/components/Layout/Views";
import {Link, useLocation, useNavigate} from "react-router-dom";
import navigationConfig from "@/configs/navigation.config";
import {LinksGroup} from "@/components/Layout/LinksGroup";
import classes from "@/components/Layout/LayoutTypes/SimpleSideBar.module.css";
import {Box, Flex, Group, HoverCard, Title} from "@mantine/core";
import SimpleSideBarBottomContent from "@/components/Layout/LayoutTypes/SimpleSideBarBottomContent";
import {useTranslation} from "react-i18next";
import AuthorityCheck from "@/route/AuthorityCheck";
import {useAppSelector} from "@/store";
import UserPopOver from "@/components/UserPopOver/UserPopOver";
import {useDisclosure} from '@mantine/hooks';
import {Burger} from '@mantine/core';
import useUserStore from "@/store/main/UserStore";
import {IconUserCircle} from "@tabler/icons-react";

function SideBar({isOpen}: { isOpen: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState('');
  const {t} = useTranslation()
  const {userRole: userAuthority} = useUserStore()

  useEffect(() => {
    const currentPath = location.pathname.split('/')[1];
    setActive(currentPath);
  }, [location.pathname]);

  const links = navigationConfig.map((item, index) => {
    let links: { label: string, link: string }[] = [];

    if (item.subMenu && item.subMenu.length > 0) {
      links = item.subMenu.map(i => ({
        label: i.title,
        link: i.path
      }));
      return (
        <LinksGroup key={item.title} icon={item.icon} label={item.title} links={links}/>
      );
    } else {
      return (
        <AuthorityCheck userAuthority={userAuthority ? userAuthority : null} authority={item.authority}>
          <Link
            className={classes.link}
            data-active={item.path.split('/')[1] === active ? 'true' : undefined}
            to={item.path}
            key={item.title}
            onClick={(event) => {
              event.preventDefault();
              setActive(item.path.split('/')[1]);
              navigate(item.path);
            }}
          >
            <item.icon className={classes.linkIcon} stroke={1.5}/>
            <span>{item.translateKey ? t(item.translateKey) : item.title}</span>
          </Link>
        </AuthorityCheck>
      );
    }
  });

  return (
    <nav className={classes.navbar} style={{width: isOpen ? '300px' : '50px'}}>
      <div className={classes.navbarMain}>
        {links}
      </div>
      <div className={classes.footer}>
        <SimpleSideBarBottomContent/>
      </div>
    </nav>
  );
}

export default function SimpleSideBar() {
  const [opened, {toggle}] = useDisclosure();
  const {user} = useAppSelector((state) => state.auth.user);

  const links = [
    {
      name: 'Account details',
      path: '/account',
    },
    {
      name: 'Tariffs',
      path: '/tariffs',
    },
    {
      name: 'Log out',
      path: '/logout',
    }
  ]

  return (
    <div style={{
      display: 'flex',
      flex: ' 1 1 auto',
      '--widthSidebar': opened ? '300px' : '50px',
      '--headerMarginLeft': `calc(-1 * var(--widthSidebar))`
    }}>
      <SideBar isOpen={opened}/>
      <div style={{flex: 1}}>
        <header className={classes.header}>
          <div className={classes.headerWrp}>
            <Flex align={'center'} gap={'20px'}>
              <Burger opened={opened} onClick={toggle} style={{marginTop: '4px'}} aria-label="Toggle navigation"/>
              <img className={classes.logo} alt={'Mantine Logo'} src={'/logo.png'}/>
            </Flex>
            <Group>
              {user ? (
                <HoverCard width={280} shadow="md">
                  <HoverCard.Target>
                    <Flex align={'center'}>
                      <Box mr={'10px'}>
                        <h4 style={{
                          margin: 0,
                          opacity: .9,
                          textAlign: 'right'
                        }}>{user.name || user.surname || user.email}</h4>
                        <h6 style={{margin: 0, opacity: .5, textAlign: 'right'}}>{user.role}</h6>
                      </Box>
                      <IconUserCircle size={'40px'} color={'gray'}/>
                    </Flex>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    {links.map(el => (
                      <Link to={el.path}>
                        <Box color={'gray'} py={'8px'}>
                          {el.name}
                        </Box>
                      </Link>
                    ))}
                  </HoverCard.Dropdown>
                </HoverCard>
              ) : null}

            </Group>
          </div>
          <UserPopOver/>
        </header>
        <div className={classes.view}>
          <Views/>
        </div>
      </div>
    </div>
  )
}
