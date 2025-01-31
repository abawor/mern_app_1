import { logs } from "../../../backend/dummyData/data";

function LogsDisplay() {
    return (
        <div className="m-10"> 
            {logs.map(log => (
                <div key={log.id} className="mt-5 border-l-2 w-30 p-1">
                    <div>{log.name.charAt(0).toUpperCase() + log.name.slice(1)}</div>
                    <div>{log.age}</div>
                </div>
            ))}
        </div>
    );
}

export default LogsDisplay
