import { useState } from "react";
import styled from "styled-components";
import useInfiniteScroller from "./useInfiniteScroller";
import useLoadList from "./useLoadList";
function App() {
  const { listData, isLoading, loadMore, hasMore } = useLoadList();

  const { containerRef } = useInfiniteScroller({
    onLoadMore: loadMore,
    isLoading,
    hasMore,
  });

  const [count, setCount] = useState(0);
  return (
    <StyledApp>
      <Header
        onClick={() => {
          setCount(count + 1);
        }}
      >
        The Scroller Load Demo {listData.length}
      </Header>
      <BodyWrapper>
        <SideBarWrapper>
          <div>This is the SideBar Block</div>
        </SideBarWrapper>
        <MainContent ref={containerRef}>
          {listData.map((value, index) => {
            return <Item key={index}>{value.name}</Item>;
          })}
          {isLoading && <div> loading...</div>}
        </MainContent>
      </BodyWrapper>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 20px;
  padding: 50px;
  text-align: center;
  border-bottom: 1px solid #333333;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const SideBarWrapper = styled.div`
  padding: 10px;
  border-right: 1px solid #999999;
`;

const MainContent = styled.div`
  padding: 20px;
  flex: 1;

  box-sizing: border-box;
`;

const Item = styled.div`
  padding: 12px 24px;
  text-align: center;
`;

export default App;
