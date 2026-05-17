import { useEffect, useState } from "react";

function NotificationBadge() {

    const [count, setCount] = useState(0);
    const [username, setUsername] = useState("");

    // Dạng 1: chạy sau mỗi render
    // useEffect(() => {
    //     console.log("Component render")
    // })

    // Dạng 2: chỉ chạy 1 lần
    // useEffect(() => {
    //     console.log("Component đã mount!")
    // }, [])

    // Dạng 3: chạy khi count đổi
    // useEffect(() => {

    //     if (count > 0) {
    //         document.title = `(${count}) Thông báo mới | App`
    //     }
    //     else {
    //         document.title = "App"
    //     }

    // }, [count])

    // Dạng 3b: chạy khi username đổi
    useEffect(() => {
        console.log("Username changed to:", username)
    }, [username])

    return (
        <div style={{padding: "10px"}}>

            <h1>Thông báo: {count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Tăng thông báo
            </button>

            <button onClick={() => setCount(0)}>
                Reset
            </button>

            <hr />

            <input
                type="text"
                placeholder="Nhập username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <p>Username: {username}</p>

        </div>
    )
}

// export default NotificationBadge