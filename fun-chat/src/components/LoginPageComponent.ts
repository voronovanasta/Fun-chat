const LoginPageComponent = () => `<div class="login-wrapper">
    <h1>English Puzzle</h1><h3>Registration</h3>
    <form id="login-form" class="login-form">
       <div class="item">
           <label for="name"></label>
           <input id="name" class="input-login" name="name" type="text" autocomplete="on" placeholder = "Name" required>
        </div>
        <div id="nameMessage" class="login-form-error">
            <div id="errorNameMessage" class="errorlabel"></div>
        </div>
        <div class="item">
            <label for="surname"></label>
            <input id="surname" class="input-login" name="surname" type="text" autocomplete="on" placeholder = "Surname" required>
        </div>
        <div id="surnameMessage" class="login-form-error">
            <div id="errorSurnameMessage" class="errorlabel"></div>
        </div>
        <a href="/main" class="button loginBtn target-link" id = "login">Log in</a>
    </form>
    <a href="/about" class = "button aboutBtn target-link" id ="about" >About</a>
</div>`;

export default LoginPageComponent;
