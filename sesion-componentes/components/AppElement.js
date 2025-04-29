class AppElement extends HTMLElement{
    constructor(){
        super();
        this.textContent = "Hello, World!";
    }
}
customElements.define("app-element", AppElement);
