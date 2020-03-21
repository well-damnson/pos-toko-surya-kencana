import React, { useState } from 'react';

import Hook from './wrapper';

import Activation from './view/aktivasi';
import Login from './view/login';
import MemberList from './view/memberList';
import Menu from './view/menu';
import NewsBirthday from './view/newsMemberBirthday';
import NewsPoin from './view/newsMemberPoin';
import TrxBeli from './view/trxBeli';
import TrxJual from './view/trxJual';
import TrxTukar from './view/trxTukarTambah';
import Barcode from './view/barcode';

let Routes = {
  Activation: {
    Component: Activation,
    Menu: false,
  },
  Login: {
    Component: Login,
    Menu: false,
  },
  MemberList: {
    Component: MemberList,
    Menu: true,
  },
  NewsBirthday: {
    Component: NewsBirthday,
    Menu: true,
  },
  NewsPoin: {
    Component: NewsPoin,
    Menu: true,
  },
  TrxBeli: {
    Component: TrxBeli,
    Menu: true,
  },
  TrxJual: {
    Component: TrxJual,
    Menu: true,
  },
  TrxTukar: {
    Component: TrxTukar,
    Menu: true,
  },
  Blank: {
    Component: () => <div />,
    Menu: true,
  },
  Barcode: {
    Component: Barcode,
    Menu: true,
  },
};

let ActivationCheck = async () => {
  let activated = await window.checkLicense();
  if (activated) {
    return true;
  } else {
    return false;
  }
};

let Navigator = ({ children }) => {
  // Check if App is Activated. If it is, go to Login, if not, go to Activation
  // Setting State and Hook
  let [ready, setReady] = useState(false);
  let [navigation, setNavigation] = Hook.useNav();

  // Only First Time Run
  if (ready === false) {
    // Check Activation
    ActivationCheck().then((Activated) => {
      console.log('Activated', Activated);
      if (Activated) {
        setNavigation('Login');
        setReady(true);
      } else {
        setReady(true);
      }
    });
  }
  // Prepare Layout Content
  let Content = Routes[navigation].Component;
  let MenuLayout = Routes[navigation].Menu === true ? Menu : null;
  return ready ? (
    <div>
      <div>{MenuLayout && <MenuLayout />}</div>
      <div>
        <Content />
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Navigator;
