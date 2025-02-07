/*import { logs } from "../../../backend/dummyData/data";*/
import { useEffect, useState } from "react";

function LogsDisplay() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/logs")
        .then(res => res.json())
        .then(data => setLogs(data))
        .then(data => console.log(data))
        .catch(err => console.error("Error fetching data: ", err))
    }, [])

    return (
        <div className="m-10"> 
            {logs.map(log => (
                <div key={log._id} className="mt-5 border-l-2 w-30 p-1">
                    <div>{log.name.charAt(0).toUpperCase() + log.name.slice(1)}</div>
                    <div>{log.age}</div>
                </div>
            ))}
        </div>
    );
}

export default LogsDisplay
