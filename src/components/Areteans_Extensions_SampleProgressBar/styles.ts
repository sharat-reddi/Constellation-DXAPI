import styled, { css } from 'styled-components';

export default styled.div`
  margin: 20px 0;
  padding: 20px;
  position: relative;
`;

export const IconTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const Title = styled.h4`
  margin: 0;
  font-size: 16px;
  color: #333;
`;

export const ProgressContainer = styled.div`
  position: relative;
  background: #e0e0e0;
  border-radius: 20px;
  height: 24px;
  width: 100%;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ state: string }>`
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 20px;
  ${({ state }) => {
    switch (state) {
      case 'Active':
        return css`background: blue;`;
      case 'Success':
        return css`background: green;`;
      case 'Error':
        return css`background: red;`;
      default:
        return css`background: grey;`;
    }
  }}
`;

export const TopRightText = styled.div`
  position: absolute;
  top: -20px;
  right: 0;
  font-size: 14px;
  color: #666;
`;

export const BottomLeftText = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 14px;
  color: #666;
`;

export const BottomRightText = styled.div`
  position: absolute;
  bottom: -20px;
  right: 0;
  font-size: 14px;
  color: #666;
`;

export const UploadedData = styled.div`
  margin-top: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #333;
`;
