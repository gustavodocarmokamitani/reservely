import { ReactComponent as LogoSvg } from "../../assets/logoSvg.svg"; // Importe o SVG como componente

import * as S from "./styles/loading.styles";

const Loading = () => {
  return (
    <S.LoadingContainer>
      <S.Spinner>        
        <LogoSvg className="animated-logo" />
      </S.Spinner>
    </S.LoadingContainer>
  );
};

export default Loading;
