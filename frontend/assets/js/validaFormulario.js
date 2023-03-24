class ValidaFormulario{
    constructor(){
        this.formulario = document.querySelector('#Formulario')
        this.events()
    }//fim do constructor
    events(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e)
        });//fim add event listener
    }// fim metodo events
    handleSubmit(e){
        e.preventDefault()
        const validInput = this.validInput()
        const validPass = this.validPass()
        if(validInput && validPass){
            this.formulario.submit()
        }//fim if Submit
    }//fim da handle Submit
    validPass(){
        let valid = true;

        const senha = this.formulario.querySelector('#senha')
        const repetirSenha = this.formulario.querySelector('#senhaTwice')

        if(senha.value !== repetirSenha.value){
            valid = false
            this.criaErro(repetirSenha,`<p class="error">Senhas diferentets</p>` )
            this.criaErro(senha,`<p class="error">Senhas diferentets</p>` )
        }// fim IF senha != repetir senha
        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false
            this.criaErro(senha,`<p class="error">Senha invalida ...Mais atenção</p>` )
        }//fim if tamanho da senha
        return valid
    }//fim da valid Pass
    validInput(){

        let valid = true;
        for(let errorText of this.formulario.querySelectorAll('.error')){
            errorText.parentElement.remove()
        }//fim laco de remover msg error anteriores
        for(let campo of this.formulario.querySelectorAll('.valid')){
            if(!campo.value) {
                this.criaErro(campo)
                valid = false
            }//fim  if
            if(campo === this.formulario.querySelector('#cpf')){
                if(!this.validaCPF(campo)) valid = false;
            }// fim if CPF
            if(campo === this.formulario.querySelector('#usuario')){
                if(!this.validaUsuario(campo)) valid = false
            
            }//fim if Usuario
        }//fim do for
        return valid
    }// fim valid INput
    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;
        if(usuario.length < 3 || usuario.length > 12 ){
            this.criaErro(campo, `<p class="error">${campo.name} Invalido</p>`)
            valid = false
        }// fim if tamnhado do usuario
        if(!usuario.match(/[a-zA-Z0-9]+$/g)){
            this.criaErro(campo, `<p class="error">${campo.name} Invalido</p>`)
            valid = false
        }
        return valid
    }// fim da valida usuario
    validaCPF(campo){
        const cpf = new ValidaCPF(campo.value)
        if(!cpf.valida()) {
            this.criaErro(campo,`<p class="error">${campo.name} Invalido</p>`)
            return false
        }
        return true
    }// fim valida CPF
    criaErro(campo,msg){
        const div = document.createElement('div')
        div.innerHTML = msg || `<p class="error">${campo.name} não pode ficar em branco</p>`;
        campo.insertAdjacentElement('afterend',div)
    }
}//fim da class valida formulario

//const valida = new ValidaFormulario()