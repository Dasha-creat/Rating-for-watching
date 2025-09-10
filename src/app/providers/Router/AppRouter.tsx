import { Route, Routes } from 'react-router-dom';
import { MainPage } from '../../../pages/MainPage/index';
import { StudentPage } from '../../../pages/StudentPage/index';
import { GroupPage } from '../../../pages/GroupPage/index';
import { ComparePage } from '../../../pages/ComparePage';

export const AppRouter = () => (
  <Routes>
    <Route path="/main" element={<MainPage />} />
    <Route path="/extra/:id" element={<StudentPage />} />
    <Route path="/extra-no-table/:name" element={<GroupPage />} />
    <Route path="/compare" element={<ComparePage />} />
  </Routes>
);
