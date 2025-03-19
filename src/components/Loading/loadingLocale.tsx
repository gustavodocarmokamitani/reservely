import * as S from "./styles/loading.styles";

const LoadingLocale = () => {
  return (
    <S.LoadingLocaleContainer>
      <S.Spinner>
        <svg
          width="63"
          height="81"
          viewBox="0 0 63 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M44.275 40.9281L4.20835 0.861328H57.8672C60.6286 0.861328 62.8672 3.0999 62.8672 5.86133V75.9948C62.8672 78.7562 60.6286 80.9948 57.8672 80.9948H40.4256C27.0621 80.9948 20.3654 64.8377 29.8149 55.3882L44.275 40.9281Z"
            fill="#f16855"
          />
          <path
            d="M18.6266 40.9281L58.6934 80.9948H5.0345C2.2731 80.9948 0.0345001 78.7562 0.0345001 75.9948V5.86133C0.0345001 3.09991 2.2731 0.861328 5.0345 0.861328H22.476C35.8396 0.861328 42.5362 17.0185 33.0867 26.468L18.6266 40.9281Z"
            fill="#f16855"
          />
        </svg>
      </S.Spinner>
    </S.LoadingLocaleContainer>
  );
};

export default LoadingLocale;
