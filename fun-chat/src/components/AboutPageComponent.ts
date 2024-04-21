const AboutPageComponent = (root: HTMLDivElement) => {
  const aboutContentContainer = document.createElement("div");
  aboutContentContainer.className = "about";
  const returnBtn = document.createElement("button");
  returnBtn.className = "button";
  returnBtn.id = "return";
  returnBtn.textContent = "Return";
  const title = document.createElement("h3");
  title.textContent = "Fun chat";
  const aboutText = document.createElement("p");
  aboutText.innerHTML = `Приложение разработано для демонстрации задания Fun Chat в рамках курса RSSchool JS/FE 2023Q4.<br> Автор <a href = "https://github.com/voronovanasta">Воронова Анастасия"</a>`;
  aboutContentContainer.append(title, aboutText, returnBtn);
  root.append(aboutContentContainer);
};

export default AboutPageComponent;
