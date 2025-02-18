import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";


function LogsDisplay() {
    const [logs, setLogs] = useState([]);

    const handleDeleteLog = async (logId) => {

        const confirmation = confirm("Are you sure you want to delete this log? There is no going back")

        if (!confirmation) return

        logId = {
            _id: logId
        }

        try {
            const response = await fetch("http://localhost:3000/log", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logId)
            })
            if (response.ok) {
                window.location.reload()
            } else {
                console.error("Error deleting log")
            }
        } catch (error) {
            console.error("Error deleting log:", error)
        }
    }

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
                    <div className="font-medium">{log.name.charAt(0).toUpperCase() + log.name.slice(1)}</div>
                    <div>{log.age}</div>
                    <MdDeleteForever 
                        size={19}
                        className="cursor-pointer"
                        onClick={() => handleDeleteLog(log._id)}
                    />
                </div>
            ))}
        </div>
    );
}

export default LogsDisplay
