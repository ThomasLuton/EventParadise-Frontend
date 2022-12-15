async function get(endpoint) {
    const url = `http://localhost:8080/${endpoint}`;
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
async function render(content, endpoint, target) {
    const locations = await get(endpoint);

    locations.forEach(location => {
        content += `<option value="${location.id}">${location.name}</option>`
    });
    target.innerHTML = content;

}
const endpointLocations = "locations";
const targetLocations = document.getElementById("locationId");
let contentLocations = `
<option selected value="">Choisir un location dans la liste</option>
`;
render(contentLocations, endpointLocations, targetLocations);

const endpointThemes = "themes";
const targetThemes = document.getElementById("themeId");
let contentThemes = `
     <option selected value="">Choisir un thème dans la liste</option>
 `;
render(contentThemes, endpointThemes, targetThemes);

