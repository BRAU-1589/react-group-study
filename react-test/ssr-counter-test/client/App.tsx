//node dist/server/main.js
// client/App.tsx
import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            Count: {count}

            <button onClick={() => setCount((count) => count + 1)}>숫자 증가</button>
        </div>
    );
}

export default App;