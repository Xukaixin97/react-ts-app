import { Tabs } from 'antd';
import type { FC } from 'react';
import { StateType } from './types';
import JotaiApp from './views/Jotai/index';
import ReactContextApp from './views/ReactContext/index';
import RecoilApp from './views/Recoil/index';
import ReduxApp from './views/Redux/index';
import ValtioApp from './views/Valtio/index';
import ZustandApp from './views/Zustand';

const { TabPane } = Tabs;
const App: FC = () => {
  return (
    <div className='px-6'>
      <Tabs defaultActiveKey={StateType.VALTIO} size='large' destroyInactiveTabPane>
        <TabPane tab='Context' key={StateType.REACTCONTEXT}>
          <ReactContextApp />
        </TabPane>
        <TabPane tab='REDUX' key={StateType.REDUX}>
          <ReduxApp />
        </TabPane>
        <TabPane tab='RECOIL' key={StateType.RECOIL}>
          <RecoilApp />
        </TabPane>
        <TabPane tab='JOTAI' key={StateType.JOTAI}>
          <JotaiApp />
        </TabPane>
        <TabPane tab='ZUSTAND' key={StateType.ZUSTAND}>
          <ZustandApp />
        </TabPane>
        <TabPane tab='VALTIO' key={StateType.VALTIO}>
          <ValtioApp />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
