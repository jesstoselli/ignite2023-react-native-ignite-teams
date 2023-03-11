import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 90px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;

  padding: 24px;
  margin-bottom: 12px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    color: ${theme.COLORS.GRAY_200};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`;

export const Icon = styled(FontAwesome5).attrs(({ theme }) => ({
  color: theme.COLORS.GREEN_700,
  size: 32,
}))`
  margin-right: 20px;
`;
