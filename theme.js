async function get() {
    const url = "http://localhost:8080/themes";
    const method = "GET";
    const options = {
        method: method
    };
    const response = await fetch(url, options);
    const header = response.headers;
    if (header.get("content-type") == "application/json") {
        return await response.json();
    }
    return null;
}
async function render() {
    const themes = await get();
    let content = `
    <option selected value="">Choisir un thème dans la liste</option>
`;
    themes.forEach(theme => {
        content += `<option value="${theme.id}">${theme.name}</option>`
    });
    const target = document.getElementById("themeId");
    target.innerHTML = content;

}
render();
