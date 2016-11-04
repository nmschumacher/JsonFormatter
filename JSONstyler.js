/**
* Algoritmo responsável por realizar a estilização de um código JSON, 
* seja ele válido ou não.
*
* autor: nmschumacher
**/

var corAtributos = '#0b3bc3'; //< Informe a cor que os atributos do JSON devem ter

function applyStyle(texto) {

	var tamDiff;
	var i = 0;
	var res;

	while(i < texto.length) {

		res = texto.getNextString(i);

		if(res[0] > 0 && (texto[res[0] - 2] == ':' || texto[res[0] - 1] != ' ') ) {
			i = res[1] + 1;
			continue;
		}

		if(res[0] < 0) {
			break;
		}

		else {
			tamDiff = texto.length;
			texto = texto.addStringAfter(res[0] - 1, 0, getTag('attributeStart'));
			texto = texto.addStringAfter(res[1] + texto.length - tamDiff, 0, getTag('attributeEnd'));
			i = res[1] + texto.length - tamDiff + 1;
		}
	}

	return texto;
}

String.prototype.addStringAfter = function(idx, rem, str) {
    return this.slice(0, idx + 1) + str + this.slice(idx + Math.abs(rem+1));
}


String.prototype.getNextString = function(from) {

	var i = this.substr(from).indexOf('"') + from;
	var indexInicio = i;

	if(i < from)
		return [-1, -1];

	return [i, this.substr(i+1).indexOf('"') + i + 1];
}

String.prototype.applyStyle = function(style) {

	switch(style) {

		case 'attribute':
			return getTag('attributeStart') + this + getTag('attributeEnd');
		default:
			return '<code>' + this + '</code>';
	}
}

function getTag(forWhat) {

	switch(forWhat) {

		case 'attributeStart':
			return '<span style="font-weight:bold;font-size:small;color:' + corAtributos + ';font-family:Ubuntu Mono,Menlo,Monaco,Consolas">';
		case 'attributeEnd':
			return '</span>';
		default:
			return null;
	}
}

var a = document.getElementById("ide").innerHTML;
document.getElementById("ide").innerHTML = applyStyle(a);
