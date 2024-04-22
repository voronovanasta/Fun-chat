const LoginPageComponent = () => `<div class="login-wrapper">
    <h1>Fun Chat</h1><h3>Registration</h3>
    <form id="login-form" class="login-form">
       <div class="item">
           <label for="name"></label>
           <input id="name" class="input-login" name="name" type="text" autocomplete="on" placeholder = "Name" required>
        </div>
        <div id="nameMessage" class="login-form-error">
            <div id="errorNameMessage" class="errorlabel"></div>
        </div>
        <div class="item">
            <label for="password"></label>
            <input id="password" class="input-login" name="password" type="text" autocomplete="on" placeholder = "password" required>
        </div>
        <div id="surnameMessage" class="login-form-error">
            <div id="errorSurnameMessage" class="errorlabel"></div>
        </div>
        <button id="" type="button" class="button loginBtn target-link login">Log in</button>
        <div id="serverMessage" class="login-form-error">
            <div id="errorServerMessage" class="errorlabel"></div>
        </div>
    </form>
    <button id="about" class = "button aboutBtn target-link about" >About</button>
</div>`;

export default LoginPageComponent;
