import React, { FunctionComponent, useState } from 'react';
import {
  PageHeader,
  PageHeaderTools,
  DropdownGroup,
  DropdownItem,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  Dropdown,
  Avatar,
  DropdownToggle,
  Nav,
  NavList,
  NavItem,
  Button,
  ButtonVariant,
} from '@patternfly/react-core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import logo from './Logo-Red_Hat-Middleware-A-White-RGB.svg';
import imgAvatar from './avatarImg.svg';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';
interface IHeader {
  isNavOpen: boolean;
  isMobileView: boolean;
  onNavToggleMobile: () => void;
  onNavToggle: () => void;
}

export const Header: FunctionComponent<IHeader> = () => {
  const { t } = useTranslation();
  const [isUserToolbarDropdownOpen, setIsUserToolbarDropdownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const toggleUserToolbarDropdown = (toggle: boolean) => {
    setIsUserToolbarDropdownOpen(toggle);
  };
  const onPageDropdownSelect = () => {
    setIsUserToolbarDropdownOpen(!isUserToolbarDropdownOpen);
  };
  const onNavSelect = (result: any) => {
    setActiveItem(result.itemId);
  };
  const userDropdownItems = [
    <DropdownGroup key="user">
      <DropdownItem key="my-profile">{t('myProfile')}</DropdownItem>
      <DropdownItem key="user-management" component="button">
        {t('userManagement')}
      </DropdownItem>
      <DropdownItem key="logout">{t('logout')}</DropdownItem>
    </DropdownGroup>,
  ];
  const HeaderTools = (
    <PageHeaderTools>
      <PageHeaderToolsGroup>
        <PageHeaderToolsItem>
          <Button aria-label="Help actions" variant={ButtonVariant.plain}>
            <HelpIcon />
          </Button>
        </PageHeaderToolsItem>
        <PageHeaderToolsItem
          visibility={{ default: 'hidden', md: 'visible' }} /** this user dropdown is hidden on mobile sizes */
        >
          <Dropdown
            isPlain
            position="right"
            onSelect={onPageDropdownSelect}
            isOpen={isUserToolbarDropdownOpen}
            toggle={<DropdownToggle onToggle={toggleUserToolbarDropdown}>Developer</DropdownToggle>}
            dropdownItems={userDropdownItems}
          />
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <Avatar src={imgAvatar} alt="Avatar image" />
    </PageHeaderTools>
  );
  const PageNav = (
    <Nav onSelect={onNavSelect} aria-label="Nav" variant="horizontal">
      <NavList>
        <NavItem itemId={0} isActive={activeItem === 0} to="#">
          Home
        </NavItem>
        <NavItem itemId={1} isActive={activeItem === 1} to="#">
          Candidate
        </NavItem>
        <NavItem itemId={2} isActive={activeItem === 2} to="#">
          Projects
        </NavItem>
        <NavItem itemId={3} isActive={activeItem === 3} to="#">
          Calendar
        </NavItem>
      </NavList>
    </Nav>
  );
  return <PageHeader logo={<LogoImg />} headerTools={HeaderTools} aria-label={'global_navigation'} topNav={PageNav} />;
};

function LogoImg() {
  const history = useHistory();
  function handleClick() {
    history.push('/');
  }
  return <img src={logo} onClick={handleClick} alt="PatternFly Logo" />;
}
