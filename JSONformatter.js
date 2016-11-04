/**
* Algoritmo responsável por realizar a identação de um código JSON, 
* seja ele válido ou não.
*
* autor: nmschumacher
**/

// Basta chamar formatJSON() passando uma string contendo o código JSON sem formatação e será retornada a sring com o JSON formatado.
// Obs.: Para que os espaçamentos sejam reconhecidos pelo navegador, pode ser que seja necessário envolver o 
// código JSON com uma tag que possua style="white-space: pre;". Pode ser "pre" ou "pre-wrap".

var stackCh = [];		//< Pilha de chaves "{}"
var identacao = '    '; //< Informe aqui o tipo de identação que deve ser utilizada (' ', '\t ', '    ', ...)
var novaLinha = '\n';	//< Informe a string que representa uma nova linha que será utilizada antes da identação ('<br>', '\n', ...)

function formatJSON(texto) {

	var i = 0;
	var indiceNextBLock = 0;
	var tamanhoDiff = 0;

	while(i < texto.length) {

		indiceNextBLock = texto.indexNextBlock(i);

		switch(texto[i]) {
			// Caractere de início de string
			case '"':
				if(texto[i-1] == ',') {
					texto = texto.addStringAfter(i-1, 0, ident());
				}

				i = texto.jumpString(i);
				continue;

			case '{':
				stackCh.push('{');
				tamanhoDiff = texto.length;
				texto = texto.addStringAfter(indiceNextBLock, 0, ident());
				i += texto.length - tamanhoDiff + 1;
				continue;

			case '}':
				stackCh.pop();
				tamanhoDiff = texto.length;
				texto = texto.addStringAfter(indiceNextBLock-1, 0, ident());
				i += texto.length - tamanhoDiff + 1;
				continue;

			case '[':
				if(texto[indiceNextBLock + 1] == '{') {
					stackCh.push('[');
					tamanhoDiff = texto.length;
					texto = texto.addStringAfter(indiceNextBLock, 0, ident());
					i += texto.length - tamanhoDiff + 1;
				}
				else {
					i = texto.jumpArray(i);
				}

				continue;

			case ']':
				if(texto[indiceNextBLock - 1] == '}' || texto[indiceNextBLock + 1] == '}') {
					stackCh.pop();
					tamanhoDiff = texto.length;
					texto = texto.addStringAfter(indiceNextBLock-1, 0, ident());
					i += texto.length - tamanhoDiff + 1;
				}
				else
					i++;

				continue;

			case ':':
				texto = texto.addStringAfter(indiceNextBLock-1, 1, ' : ');
				i += 2 + 1;
				continue;

			default:
				i++;
		}
	}
	
	return texto;
}

function ident() {
    return novaLinha + identacao.repeat(stackCh.length);
};

String.prototype.addStringBefore = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};
String.prototype.addStringAfter = function(idx, rem, str) {
    return this.slice(0, idx + 1) + str + this.slice(idx + Math.abs(rem+1));
};

String.prototype.jumpString = function(from) {
	
	var i;
	for(i = from; i < this.length && this[i] != '"'; i++);
	for(++i ; i < this.length && this[i] != '"'; i++);
	i++;

	return i > this.length ? -1 : i;
}

String.prototype.jumpArray = function(from) {
	return this.substr(from).indexOf(']') + from + 1;
}

String.prototype.indexNextBlock = function(from) {

	var indices = [];

	addIfIsBlock(this.substr(from).indexOf('{'), indices);
	addIfIsBlock(this.substr(from).indexOf('}'), indices);
	addIfIsBlock(this.substr(from).indexOf('['), indices);
	addIfIsBlock(this.substr(from).indexOf(']'), indices);
	addIfIsBlock(this.substr(from).indexOf('"'), indices);
	addIfIsBlock(this.substr(from).indexOf(':'), indices);
	return indices.length > 0 ? (indices.sort(function(a, b){return a-b})[0] + from) : -1;
}

function addIfIsBlock(valor, pilha) {
	if(valor >= 0)
		pilha.push(valor);
}
