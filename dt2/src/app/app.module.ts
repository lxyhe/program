import { NgModule } from '@angular/core';

import { IonicApp, IonicModule, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DtApp } from './app.component';

import { TutorialPage } from '../pages/tutorial/tutorial';

import { TabsPage } from '../pages/tabs/tabs';

import { MySelf } from '../pages/myself/myself';
import { OrderGame } from '../pages/ordergame/ordergame';
import { TimingGame } from '../pages/timinggame/timinggame';

import { RegisterPage } from '../pages/registerpage/registerpage';
import { LoginPage } from '../pages/loginpage/loginpage';
import { HomePage } from '../pages/homepage/homepage';
import { TimingGameView } from '../pages/timinggameview/timinggameview';
import { TimingGameMgr } from '../pages/timinggamemgr/timinggamemgr';
import { TimingGameNew} from '../pages/timinggamenew/timinggamenew';
import { OrderGameNew } from '../pages/ordergamenew/ordergamenew';
import { OrderGameMGR } from '../pages/ordergamemgr/ordergamemgr';
import { OrderGamePreview } from '../pages/ordergamepreview/ordergamepreview';
import { OrderGameContent } from '../pages/ordergamecontent/ordergamecontent';

import { AllTypeStatePage } from '../pages/alltypestate/alltypestate';
import { TimingPopoverPage } from '../pages/timinggame-popover/timinggame-popover';
import { OrderGamePopoverPage } from '../pages/ordergame-popover/ordergame-popover';
import { TimingGameDetails } from '../pages/timinggamedetails/timinggamedetails';
import { MapSet } from '../pages/mapset/mapset';
import { MapGet } from '../pages/mapget/mapget';
import { UserList } from '../pages/userlist/userlist';
import { StaticQRPage } from '../pages/staticqr/staticqr';

import { LocalData } from '../providers/local-data';
import { Cauth } from '../providers/local-auth';
import { Cordergame } from '../providers/local-ordergame';
import { Ctiminggame } from '../providers/local-timinggame';
import { LoginRegister } from '../providers/local-loginregister';
import { OrderbyLngLat } from '../providers/orderpipe';



import { ToGameTypeKey, ToGameTypeName, ToGameTypeNameSex, TimingGameTypeName, TimingGameTypeKey, Bannar} from '../providers/samplepipe';
import { LoadingPipe }from '../providers/loadingpipe';

import { MyMessage } from '../pages/mymessage/mymessage';
import { MyGeoLocation, MyBarcodeScanner } from '../providers/dev-ctrl';
import { Sanitizer } from '../providers/system';

@NgModule({
  declarations: [
    OrderbyLngLat,
    Bannar,
    LoadingPipe,
    ToGameTypeKey,
    ToGameTypeName,
    ToGameTypeNameSex,
    TimingGameTypeName,
    TimingGameTypeKey,
    AllTypeStatePage,
    DtApp,

    RegisterPage,
    LoginPage,
    TutorialPage,
    HomePage,
    TabsPage,
    MyMessage,
    MySelf,
    OrderGame,
    TimingGame,
    TimingGameMgr,
    TimingGameNew,

    TimingGameDetails,
    TimingGameView,

    OrderGameNew,
    OrderGamePreview,
    OrderGameMGR,
    MapSet,
    MapGet,
    OrderGameContent,
    UserList,
    StaticQRPage,
    TimingPopoverPage,
    OrderGamePopoverPage,

  ],
  imports: [
    IonicModule.forRoot(DtApp, {
      tabsHideOnSubPages: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DtApp,

    TutorialPage,
    LoginPage,
    RegisterPage,
    TabsPage,
    MyMessage,
    MySelf,
    OrderGame,
    TimingGame,
    HomePage,
    OrderGameNew,
    OrderGamePreview,
    OrderGameMGR,
    TimingGameMgr,
    TimingGameNew,
    TimingGameDetails,
    TimingGameView,
    AllTypeStatePage,

    MapSet,
    MapGet,
    OrderGameContent,
    UserList,
    StaticQRPage,
    TimingPopoverPage,
    OrderGamePopoverPage,

  ],
  providers: [Storage, Events, LocalData, Cauth, Cordergame, MyGeoLocation, Sanitizer, MyBarcodeScanner, Ctiminggame, LoginRegister],
})
export class AppModule { }
