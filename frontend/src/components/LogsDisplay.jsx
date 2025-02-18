import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";

function LogsDisplay() {
    const [logs, setLogs] = useState([]);
    const [editing, setEditing] = useState()
    const [activeEditing, setActiveEditing] = useState(false)
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    
    
    const enterEditMode = (log) => {
        if (activeEditing) return
        setActiveEditing(true)
        setName(log.name)
        setAge(log.age)
        setEditing({...editing, [log._id]: "True"})
    }
    
    const handleEditLog = async (logId, name, age) => {
        
        const log = {
            _id: logId,
            name: name,
            age: age
        }

        try {
            const response = await fetch("http://localhost:3000/log", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(log)
            })
            if (response.ok) {
                window.location.reload()
            } else {
                console.error("Error updating log")
            }
        } catch (error) {
            console.error("Error updating log:", error)
        } finally {
            setEditing({...editing, _id: "False"})
            setActiveEditing(false)
        }
    }

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

    useEffect(() => {
        setEditing(Object.fromEntries(logs.map(log => [log._id, "False"])))
    }, [logs])

    return (
        <div className="m-10"> 
            {logs.map(log => (
                <div key={log._id} className="mt-5 border-l-2 w-30 p-1">
                    <div
                        className={`font-medium mb-1 + ${editing[log._id] === "True" ? "rounded-sm border-1 border-solid" : ""}`}
                        suppressContentEditableWarning={true}
                        contentEditable={editing[log._id]}
                        onInput={e => setName(e.currentTarget.textContent)}
                    >
                        {log.name.charAt(0).toUpperCase() + log.name.slice(1)}
                    </div>
                    <div
                        className={editing[log._id] === "True" ? "rounded-sm border-1 border-solid" : ""}
                        suppressContentEditableWarning={true}
                        contentEditable={editing[log._id]}
                        onInput={e => setAge(e.currentTarget.textContent)}
                    >
                        {log.age}
                    </div>
                    <div className="flex flex-row mt-2">
                        {editing[log._id] === "True" ? 
                            <FaRegSave
                                size={20}
                                className="cursor-pointer mr-2"
                                onClick={() => handleEditLog(log._id, name, age)}
                            /> :
                            <CiEdit
                                size={20}
                                className="cursor-pointer mr-2"
                                onClick={() => enterEditMode(log)}
                        />}
                        <MdDeleteForever 
                            size={19}
                            className="cursor-pointer"
                            onClick={() => handleDeleteLog(log._id)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default LogsDisplay
