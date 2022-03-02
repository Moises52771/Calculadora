onload = () => {
    document.querySelector('#bt-0').onclick = () => digito(0);
    document.querySelector('#bt-1').onclick = () => digito(1);
    document.querySelector('#bt-2').onclick = () => digito(2);
    document.querySelector('#bt-3').onclick = () => digito(3);
    document.querySelector('#bt-4').onclick = () => digito(4);
    document.querySelector('#bt-5').onclick = () => digito(5);
    document.querySelector('#bt-6').onclick = () => digito(6);
    document.querySelector('#bt-7').onclick = () => digito(7);
    document.querySelector('#bt-8').onclick = () => digito(8);
    document.querySelector('#bt-9').onclick = () => digito(9);
    document.querySelector('#bt-pt').onclick = virgula;
    document.querySelector('#bt-ac').onclick = limpa;
    document.querySelector('#bt-divide').onclick = () => operador('/');
    document.querySelector('#bt-mult').onclick = () => operador('*');
    document.querySelector('#bt-sub').onclick = () => operador('-');
    document.querySelector('#bt-som').onclick = () => operador('+');
    document.querySelector('#bt-eq').onclick = calcula;
}

// variáveis para armazenar o valor, o operador e o estado da calculadora

let sValor = '0';
let ehNovoNumero = true;
let valorAnterior = 0;
let operacaoPendente = null;


const atualizaVisor = () => {
    let [parteInteira, parteDecimal] = sValor.split(',');
    let v = '';
    let i = parteInteira.length - 1
    c =  0;
    for(i; i >= 0; i--){
        if(++c > 3){
            v = '.' + v;
            c = 1;
        }
        v = parteInteira[i] + v;        
    }
    v += (parteDecimal ? ',' + parteDecimal : '');
    document.querySelector('#display').innerText = v;

}

// tratamento do clique no botão de digito
const digito = (n) => {
    if(ehNovoNumero){
        if(n == 0){
            sValor = '' + n;
        }
        else{
            sValor = '' + n;
            ehNovoNumero = false;
        }
    }
    else{
        sValor += n;
    }
    atualizaVisor();
    
}

// tratamento do clique no botão de ponto decimal
const virgula = () => {
    if(ehNovoNumero){
        sValor = '0,';
        ehNovoNumero = false;
    }
    else if(sValor.indexOf(',') == -1){
        sValor += ',';
    }
    atualizaVisor();
}

// tratamento do clique no botão AC (all clear)
const limpa = () => {
    ehNovoNumero = true;
    valorAnterior = 0;
    operacaoPendente = null;
    sValor = '0';
    atualizaVisor();
}

const valorAtual = () => parseFloat(sValor.replace(',', '.'))

const operador = (op) => {
    calcula();
    valorAnterior = valorAtual();
    operacaoPendente = op;
    ehNovoNumero = true;
}

const calcula = () => {
    if (operacaoPendente != null){
        let resultado;
        console.log(valorAnterior + ' ' + operacaoPendente + ' ' + valorAtual());
        switch(operacaoPendente){
            case '+': resultado = valorAnterior + valorAtual();
                break;
            case '-': resultado = valorAnterior - valorAtual();
                break;
            case '/': resultado = valorAnterior / valorAtual();
                break;
            case '*': resultado = valorAnterior * valorAtual();
                break;
        }
        sValor = resultado.toString().replace('.' , ',');
    }

    ehNovoNumero = true;
    valorAnterior = 0;
    operacaoPendente =  null;
    atualizaVisor();
}