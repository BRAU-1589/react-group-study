import React, { useState, useMemo, useCallback } from 'react';
import styled, { css } from 'styled-components';

// 스타일 계산 함수
const calculateThemeStyles = (theme) => {
  // 테마에 따른 스타일 객체 반환
  return {
    backgroundColor: theme === 'dark' ? '#333' : '#FFF',
  };
};

const StyledComponent = styled.div`
  padding: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
  font-size: 40px;
  font-family:poppins;
  text-align:center;
  /* props를 사용한 조건부 스타일링 */
  ${(props) =>
    props.inverted &&
    css`
      color: ${(props) => (props.theme === 'dark' ? '#ff0' : '#00f')};
    `}
`;

const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

function App() {
  // 테마 상태 관리
  const [theme, setTheme] = useState('light');
  // inverted 상태 추가
  const [inverted, setInverted] = useState(false);

  // 테마 스타일 계산
  const themeStyles = useMemo(() => calculateThemeStyles(theme), [theme]);

  // 테마 변경 핸들러
  const handleChangeThemeClick = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }, []);

  // Inverted 토글 핸들러
  const handleInvertClick = useCallback(() => {
    setInverted((prevInverted) => !prevInverted);
  }, []);

  return (
    <div>
      <StyledComponent style={themeStyles} inverted={inverted} theme={theme}>
        현재 테마는 {theme} 테마입니다.<br/>
        텍스트 색상 변환{inverted ? 'O' : 'X'}.
      </StyledComponent>
      <ButtonContainer>
        <button onClick={handleChangeThemeClick}>테마 바꾸기 토글 버튼</button>
        <button onClick={handleInvertClick}>텍스트 색상 바꾸기 토글 버튼</button>
      </ButtonContainer>
    </div>
  );
}


export default App;
