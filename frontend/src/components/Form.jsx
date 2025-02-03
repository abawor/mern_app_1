
function Form() {

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const logData = {
            name: formData.get("name"),
            age: formData.get("age")
        }
        console.log(logData)
        form.reset()
    }

    return (
        <div className="m-10">
            <div className="text-2xl">Learning MERN App Dev</div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-10">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        required
                        className="mb-5 border-1 w-50 p-1"
                    />
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Enter your age"
                        required
                        className="mb-5 border-1 w-50 p-1"
                    />                
                    <button
                        className="mb-5 border-1 w-50 p-1 bg-green-400 hover:bg-green-500 active:bg-green-700"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form
