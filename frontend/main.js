import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './assets/css/style.css'
import Sign from './modules/validaForm' 


const login = new Sign('.form-login')
const registro = new Sign('.form-registro')

login.init()
registro.init()

console.log(login,registro)

