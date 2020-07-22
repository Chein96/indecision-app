console.log('App.js is Running NOW!');

const app = {
    title: 'This is the TITLE',
    subtitle: 'This is the subtitle...',
    options: []
};

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if(option){
        app.options.push(option);
        e.target.elements.option.value = '';
        reRender();
    }
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * app.options.length);
    const option = app.options[randomNum];
    alert(option);
}

const onRemoveAll = () => {
    app.options = [];
    reRender();
}

const appRoot = document.getElementById('app');

const reRender = () => {
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p>}
            <p>{app.options.length > 0 ? 
                'Here are your options'
                : 
                'No options'
            }</p>
            <button onClick={onMakeDecision} disabled={app.options.length === 0}>What should I do?</button>
            <button onClick={onRemoveAll}>Remove All</button>
            <ol>
                {
                    app.options.map((option) => (
                        <li key={''+option+''}>Item: {option}</li>
                    ))
                }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    
    ReactDOM.render(template, appRoot);
};

reRender();