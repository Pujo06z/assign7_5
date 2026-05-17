import React from "react";
import { useState, useEffect } from "react";

const UserSearch = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setLoading(true);
        setError(null);

        fetch("https://jsonplaceholder.typicode.com/users", { signal })
            .then((respone) => {
                if (!respone.ok) {
                    throw new Error("Không thể tải dữ liệu từ server!")
                }
                return respone.json();
            }).then((data) => {
                setUsers(data);
                setLoading(false);
            }).catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setLoading(false);
                }
            })
        return () => {
            controller.abort();
        };
    }, [retryKey])


    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    return (
        <div style={{ padding: "20px", maxWidth: "400px" }}>
            <h2>Tìm kiếm Thành viên</h2>
            <input
                type="text"
                placeholder="Nhập dữ liệu cần tìm..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "15px" }}
            />

            {loading && <p>Đang loading! Đợi xíu nhé.....</p>}
            {error && (
                <div>
                    <p>Lỗi rồi:{error}</p>
                    <button onClick={() => setRetryKey(pre => pre + 1)}>Thử lại</button>
                </div>
            )}

            {!loading && !error && query!=="" && (
                <ul style={{listStyle:"none"}}>
                    {filteredUsers.map((user) => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}
export default UserSearch;