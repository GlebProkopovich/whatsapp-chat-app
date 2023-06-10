import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import StartingForm from './components/StartingForm/StartingForm';
import ChatPage from './components/ChatPage/ChatPage';

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route index element={<StartingForm />} />
        <Route path="chat" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;
