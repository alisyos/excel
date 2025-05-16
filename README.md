# Excel 함수 생성 도우미

이 애플리케이션은 GPT API를 활용하여 사용자가 Excel 함수 작성을 쉽게 할 수 있도록 도와주는 웹 서비스입니다.

## 주요 기능

1. **사용자가 상황 입력**: 예를 들어, "특정 조건을 만족하는 경우에만 데이터를 더하고 싶어요"와 같이 원하는 상황을 설명합니다.
2. **AI가 적절한 함수 추천**: AI가 상황에 맞는 Excel 함수를 추천하고, 필요한 셀 위치 정보를 요청합니다.
3. **사용자가 셀 정보 입력**: 특정 셀의 위치와 기준 및 조건 등 요구사항을 입력합니다.
4. **AI가 함수 수식 도출**: 입력된 정보를 바탕으로 정확한 Excel 함수 수식을 생성합니다.

## 배포 정보

- **라이브 링크**: [Excel 함수 생성 도우미](https://excel-fq64tzkr3-alisyos2-gmailcoms-projects.vercel.app)
- **배포 플랫폼**: Vercel

## 환경 변수 설정

이 애플리케이션은 OpenAI API를 사용하므로 API 키가 필요합니다. 

### Vercel에서 환경 변수 설정하기

1. [Vercel 대시보드](https://vercel.com)에 로그인하세요.
2. 해당 프로젝트를 선택하세요.
3. 'Settings' 탭으로 이동하세요.
4. 'Environment Variables' 섹션을 찾으세요.
5. 새 환경 변수를 추가하세요:
   - 이름: `REACT_APP_OPENAI_API_KEY`
   - 값: OpenAI API 키
6. 'Save' 버튼을 클릭하세요.
7. 프로젝트를 재배포하세요.

## 설치 및 실행 방법

### 사전 요구사항

- Node.js (14.x 이상)
- npm (6.x 이상)
- OpenAI API 키

### 설치

1. 저장소 클론:
   ```
   git clone https://github.com/alisyos/excel.git
   cd excel
   ```

2. 의존성 설치:
   ```
   npm install
   ```

3. `.env` 파일 생성:
   프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 OpenAI API 키를 설정합니다:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   ```

### 실행

개발 서버 실행:
```
npm start
```

애플리케이션은 기본적으로 http://localhost:3000 에서 실행됩니다.

## 사용 예시

1. 첫 페이지에서 원하는 Excel 작업에 대한 상황을 설명합니다.
   예: "A1:A10 범위의 숫자 중 B열의 값이 '완료'인 행의 숫자만 합산하고 싶습니다."

2. AI가 SUMIF 또는 SUMIFS 함수를 추천하고, 정확한 셀 위치와 조건을 요청합니다.

3. 요청받은 셀 정보를 입력합니다.
   예: "A1:A10 범위의 숫자, B1:B10 범위에서 '완료'인 셀을 기준으로 합산"

4. AI가 다음과 같은 함수 수식을 생성합니다:
   `=SUMIF(B1:B10,"완료",A1:A10)`

## 기술 스택

- React
- Material-UI
- OpenAI API (GPT-4o)
- Axios 