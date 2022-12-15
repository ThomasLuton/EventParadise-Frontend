async function get() {
    const url = "http://localhost:8080/locations";
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
    const locations = await get();
    let content = `
    <option selected value="">Choisir un location dans la liste</option>
`;
    locations.forEach(location => {
        content += `<option value="${location.id}">${location.name}</option>`
    });
    const target = document.getElementById("locationId");
    target.innerHTML = content;

}
render();

