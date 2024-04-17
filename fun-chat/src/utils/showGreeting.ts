import checkedQuerySelector from "../types/checkedQuerySelector";

function showGreeting() {
  const data: string = localStorage.getItem("user") as string;
  const userData = JSON.parse(data);

  const name = checkedQuerySelector(document, "#greeting-name");
  const surname = checkedQuerySelector(document, "#greeting-surname");
  name.textContent = userData.name;
  surname.textContent = userData.surname;
}

export default showGreeting;
