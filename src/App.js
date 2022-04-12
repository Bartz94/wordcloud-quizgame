import { Wrapper } from './components/common/Wrapper';
import { UserContextProvider } from './context/UserContextProvider';
import { Content } from './content/Content';

function App() {
  return (
    <UserContextProvider>
      <Wrapper>
        <Content />
      </Wrapper>
    </UserContextProvider>
  );
}

export default App;
