import { logs } from "../../../backend/dummyData/data";

function LogsDisplay() {
    return (
        <div>
            {logs.map(log => (
                <div key={log.id}>
                    <h3>{log.name}</h3>
                    <p>{log.age}</p>
                </div>
            ))}
        </div>
    );
}

export default LogsDisplay
