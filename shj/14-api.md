# 14장. 외부 API를 연동하여 뉴스 뷰어 만들기
*2024/3/19 13장 정리*
* * *

## 1. 비동기 작업
### 동기 vs 비동기
* **동기**: 동기 처리 시, 요청이 끝날 때까지 기다린 후 그 다음에 예정된 작업을 한다.
* **비동기**: 웹 애플리케이션이 멈추지 않기 때문에 동시에 여러가지 요청을 처리할 수있고, 기다리는 과정에서 다른 함수도 호출할 수 있다.

> 뉴스 뷰어 만들어보기는 실습예제 위주라서, 책을 참고하자.

### 콜백함수
자바스크립트에서 비동기 처리 시 흔히 사용하는 방법으로, 함수의 인자값을 전달해주는 것.

### Promise
ES6에 도입된 기능으로, 비동기 연산이 종료된 이후에 결과 값(.then)과 실패 사유(.catch)를 처리하기 위한 처리기를 연결할 수 있다.<br>
비동기 코드를 동기 코드처럼 작성할 수 있어서, 가독성이 좋아지고(체인 길게 이어나가면 안좋음) 에러 처리가 간단해진다.

### async/await
Promise를 조금 더 쉽게 사용하기 위해 ES8에 도입된 기능이다.<br>
말그대로, Promise에 then() 체인을 길게 이어나가면 콜백 체인으로, 코드 가독성이 떨어지고 에러 발생 시점을 찾기 어렵다.<br>
위 내용을 보완할 수 있는 기능이다.

### axios
node.js와 브라우저를 위한 Promise 기반의 HTTP 클라이언트 라이브러리이다.<br>
간단하게 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다.


## 2. 데이터 연동
컴포넌트가 화면에 보이는 시점에 API를 요청하려는데, 이떄 useEffect를 사용하여 컴포넌트가 처음 렌더링되는 시점에 API를 요청한다.
> 주의할 점!!! <br>
> useEffect에 등록하는 함수에 async를 붙이면 안된다. <br>
> useEffect에서 반환해야 하는 값은 **!뒷정리 함수**이기 때문이다.
### 뒷정리 함수?
**CleanUp** <br>
컴포넌트가 언마운트되기 직전, 변경되기 직전에 실행하고 싶은 함수가 있다면, <br>
useEffect에서는 함수를 반환할 수 있는데 이것을 cleanup 함수라고 칭한다.
> ##### 복습
> 언마운트 될 때만 실행? 의존성 배열로 빈 배열을 넣어줌. <br>
> 특정값 변경 직전에 실행?  의존성 배열에 검사하고 싶은 값을 넣어줌


### useEffect에 async를 사용하는 방법은?
함수 내부에 async 키워드가 붙은 또 다른 함수를 만들어서 사용한다.
```js
const NewsList = () => {
    const [articles, setArticles] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=kr&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f'
                )
                setArticles(response.data.articles)
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    //...생략
}
```

### map 함수 null 체크!
데이터 배열을 map 함수를 사용하여 컴포넌트 배열로 변환할 때, 해당 값이 현재 **null**인지 꼭 확인해야한다. <br>
체크하지 않으면 아직 데이터가 없을 때 null에는 map 함수가 없기 때문에 렌더링 과정에서 오류가 발생하여 흰 페이지만 보이게 된다.
```js

const NewsList = () => {
    //...생략
    
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article}></NewsItem>
            ))}
        </NewsListBlock>
    )
}

export defalut NewsList;

```


### 6-5. 커스텀 Hook 만들기
컴포넌트에서 API 호출처럼 Promise를 사용해야 하는 경우 더 간결하게 코드를 작성할 수 있도록 커스텀 Hook을 만들어본다.
