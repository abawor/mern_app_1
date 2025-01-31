function Form() {
    return (
        <div className="m-10">
            <div className="text-2xl">Learning MERN App Dev</div>
            <div className="flex flex-col mt-10">
                <input type="text" id="name" placeholder="Enter your name" className="mb-5 border-1 w-50 p-1"/>
                <input type="number" id="age" placeholder="Enter your age" className="mb-5 border-1 w-50 p-1"/>
                <button className="bg-green-400 mb-5 border-1 w-50 p-1">Submit</button>
            </div>
        </div>
    );
}

export default Form
