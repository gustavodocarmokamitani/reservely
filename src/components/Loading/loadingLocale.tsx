import { ReactComponent as LogoSvg } from "../../assets/logoSvg.svg"; // Importe o SVG como componente

import * as S from "./styles/loading.styles";

const LoadingLocale = () => {
  return (
    <S.LoadingLocaleContainer>
      <S.Spinner>        
        <LogoSvg className="animated-logo" />
      </S.Spinner>
    </S.LoadingLocaleContainer>
  );
};

export default LoadingLocale;
