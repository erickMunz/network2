/ *!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Incluye Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation y otros colaboradores
 * Publicado bajo la licencia de MIT
 * https://jquery.org/license
 *
 * Fecha: 2018-01-20T17: 24Z
 * /
(función (global, fábrica) {

	"usar estricto";

	if (typeof module === "object" && typeof module.exports === "object") {

		// Para entornos CommonJS y CommonJS donde una "ventana" apropiada
		// está presente, ejecuta la fábrica y obtiene jQuery.
		// Para entornos que no tienen una `ventana` con un` documento`
		// (como Node.js), expone una fábrica como module.exports.
		// Esto acentúa la necesidad de la creación de una 'ventana' real.
		// eg var jQuery = require ("jquery") (ventana);
		// Ver ticket # 14549 para más información.
		module.exports = global.document?
			fábrica (global, verdadero):
			función (w) {
				if (! w.document) {
					lanzar nuevo Error ("jQuery requiere una ventana con un documento");
				}
				devolver la fábrica (w);
			};
	} else {
		fábrica (global);
	}

// Pase esto si la ventana aún no está definida
}) (typeof window! == "undefined"? window: this, function (window, noGlobal) {

// Edge <= 12 - 13+, Firefox <= 18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// lanzar excepciones cuando el código no estricto (por ejemplo, ASP.NET 4.5) accede al modo estricto
// arguments.callee.caller (trac-13335). Pero a partir de jQuery 3.0 (2016), el modo estricto debería ser común
// suficiente para que todos esos intentos estén protegidos en un bloque try.
"usar estricto";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call (Object);

var support = {};

var isFunction = function isFunction (obj) {

      // Soporte: Chrome <= 57, Firefox <= 52
      // En algunos navegadores, typeof devuelve "función" para elementos HTML <object>
      // (es decir, `typeof document.createElement (" object ") ===" function "`).
      // No queremos clasificar * ningún * nodo DOM como una función.
      return typeof obj === "function" && typeof obj.nodeType! == "number";
  };


var isWindow = function isWindow (obj) {
		return obj! = null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		tipo: verdadero,
		src: cierto,
		noModule: cierto
	};

	function DOMEval (código, documento, nodo) {
		doc = doc || documento;

		var i,
			script = doc.createElement ("script");

		script.text = código;
		if (nodo) {
			for (i en preservedScriptAttributes) {
				if (nodo [i]) {
					script [i] = nodo [i];
				}
			}
		}
		doc.head.appendChild (script) .parentNode.removeChild (script);
	}


function toType (obj) {
	if (obj == null) {
		return obj + "";
	}

	// Soporte: Android <= 2.3 solamente (functionEx RegExp)
	return typeof obj === "objeto" || typeof obj === "función"?
		class2type [toString.call (obj)] || "objeto":
		typeof obj;
}
/ * símbolo global * /
// Definir este global en .eslintrc.json crearía un peligro de usar el global
// desprotegido en otro lugar, parece más seguro definir global solo para este módulo



var
	version = "3.3.1",

	// Definir una copia local de jQuery
	jQuery = function (selector, context) {

		// El objeto jQuery es en realidad solo el constructor init 'mejorado'
		// Necesito init si se llama a jQuery (solo permite lanzar el error si no está incluido)
		return new jQuery.fn.init (selector, contexto);
	},

	// Soporte: Android <= 4.0 solamente
	// Asegúrate de recortar la BOM y NBSP
	rtrim = / ^ [\ s \ uFEFF \ xA0] + | [\ s \ uFEFF \ xA0] + $ / g;

jQuery.fn = jQuery.prototype = {

	// La versión actual de jQuery está siendo utilizada
	jquery: versión,

	constructor: jQuery,

	// La longitud predeterminada de un objeto jQuery es 0
	longitud: 0,

	toArray: function () {
		return slice.call (esto);
	},

	// Obtenga el enésimo elemento en el conjunto de elementos coincidentes O
	// Obtener todo el conjunto combinado de elementos como una matriz limpia
	get: function (num) {

		// Devuelve todos los elementos en una matriz limpia
		if (num == null) {
			return slice.call (esto);
		}

		// Devuelve solo un elemento del conjunto
		return num <0? esto [num + this.length]: this [num];
	},

	// Tome una matriz de elementos y empújelos a la pila
	// (devuelve el nuevo conjunto de elementos coincidentes)
	pushStack: function (elems) {

		// Crea un nuevo conjunto de elementos jQuery
		var ret = jQuery.merge (this.constructor (), elems);

		// Agrega el objeto viejo a la pila (como referencia)
		ret.prevObject = this;

		// Devuelve el conjunto de elementos recién formado
		return ret;
	},

	// Ejecutar una devolución de llamada para cada elemento en el conjunto combinado.
	cada uno: función (devolución de llamada) {
		return jQuery.each (esto, devolución de llamada);
	},

	mapa: función (devolución de llamada) {
		return this.pushStack (jQuery.map (this, function (elem, i) {
			return callback.call (elem, i, elem);
		}));
	},

	slice: function () {
		devuelve this.pushStack (slice.apply (this, arguments));
	},

	primero: function () {
		devuelve this.eq (0);
	},

	last: function () {
		devuelve this.eq (-1);
	},

	eq: función (i) {
		var len = this.length,
			j = + i + (i <0? len: 0);
		devuelve this.pushStack (j> = 0 && j <len? [this [j]]: []);
	},

	end: function () {
		devuelve this.prevObject || este.constructor ();
	},

	// Sólo para uso interno.
	// Se comporta como el método de una matriz, no como un método jQuery.
	empuja empuja,
	sort: arr.sort,
	empalme: arr.splice
};

jQuery.extend = jQuery.fn.extend = function () {
	var opciones, nombre, src, copy, copyIsArray, clon,
		target = argumentos [0] || {},
		i = 1,
		length = arguments.length,
		profundo = falso;

	// Manejar una situación de copia profunda
	if (tipo de destino === "booleano") {
		profundo = objetivo;

		// Saltar el booleano y el objetivo
		target = argumentos [i] || {};
		i ++;
	}

	// Manejar caso cuando el objetivo es una cadena o algo (posible en copia profunda)
	if (typeof target! == "object" &&! isFunction (target)) {
		target = {};
	}

	// Extender jQuery en sí mismo si solo se pasa un argumento
	if (i === length) {
		target = this;
		yo--;
	}

	para (; i <longitud; i ++) {

		// Solo trato con valores no nulos / indefinidos
		if ((opciones = argumentos [i])!! = null) {

			// Extender el objeto base
			para (nombre en opciones) {
				src = destino [nombre];
				copy = opciones [nombre];

				// Prevenir el ciclo sin fin
				if (target === copy) {
					continuar;
				}

				// Recurse si estamos fusionando objetos simples o matrices
				if (deep && copy && (jQuery.isPlainObject (copy) ||
					(copyIsArray = Array.isArray (copy)))) {

					if (copyIsArray) {
						copyIsArray = falso;
						clone = src && Array.isArray (src)? src: [];

					} else {
						clone = src && jQuery.isPlainObject (src)? src: {};
					}

					// Nunca muevas objetos originales, clonarlos
					target [name] = jQuery.extend (deep, clone, copy);

				// No traigas valores indefinidos
				} else if (copy! == undefined) {
					destino [nombre] = copia;
				}
			}
		}
	}

	// Devuelve el objeto modificado
	objetivo de retorno;
};

jQuery.extend ({

	// Único para cada copia de jQuery en la página
	expando: "jQuery" + (versión + Math.random ()) .replace (/ \ D / g, ""),

	// Supongamos que jQuery está listo sin el módulo listo
	isReady: cierto,

	error: function (msg) {
		lanzar nuevo Error (msg);
	},

	noop: function () {},

	isPlainObject: function (obj) {
		var proto, Ctor;

		// Detectamos negativos obvios
		// Usa toString en lugar de jQuery.type para atrapar objetos host
		if (! obj || toString.call (obj)! == "[object Object]") {
			falso retorno;
		}

		proto = getProto (obj);

		// Los objetos sin prototipo (p. Ej., `Object.create (null)`) son simples
		if (! proto) {
			devolver verdadero;
		}

		// Los objetos con prototipo son simples si fueron construidos por una función Object global
		Ctor = hasOwn.call (proto, "constructor") && proto.constructor;
		return typeof Ctor === "function" && fnToString.call (Ctor) === ObjectFunctionString;
	},

	isEmptyObject: function (obj) {

		/ * eslint-disable no-unused-vars * /
		// Ver https://github.com/eslint/eslint/issues/6125
		var nombre;

		para (nombre en obj) {
			falso retorno;
		}
		devolver verdadero;
	},

	// Evalúa un script en un contexto global
	globalEval: function (código) {
		DOMEval (código);
	},

	cada uno: función (obj, devolución de llamada) {
		longitud var, i = 0;

		if (isArrayLike (obj)) {
			longitud = obj.length;
			para (; i <longitud; i ++) {
				if (callback.call (obj [i], i, obj [i]) === falso) {
					descanso;
				}
			}
		} else {
			para (i en obj) {
				if (callback.call (obj [i], i, obj [i]) === falso) {
					descanso;
				}
			}
		}

		return obj;
	},

	// Soporte: Android <= 4.0 solamente
	recortar: función (texto) {
		devolver texto == nulo?
			"":
			(texto + "") .replace (rtrim, "");
	},

	// los resultados son solo para uso interno
	makeArray: function (arr, results) {
		var ret = resultados || [];

		if (arr! = null) {
			if (isArrayLike (Object (arr))) {
				jQuery.merge (ret,
					typeof arr === "cadena"?
					[arr]: arr
				);
			} else {
				push.call (ret, arr);
			}
		}

		return ret;
	},

	inArray: function (elem, arr, i) {
		return arr == null? -1: indexOf.call (arr, elem, i);
	},

	// Soporte: Android <= 4.0 solamente, solo PhantomJS 1
	// push.apply (_, arraylike) se lanza en el antiguo WebKit
	fusionar: función (primero, segundo) {
		var len = + second.length,
			j = 0,
			i = first.length;

		para (; j <len; j ++) {
			primero [i ++] = segundo [j];
		}

		first.length = i;

		regresar primero;
	},

	grep: function (elems, callback, invert) {
		var callbackInverse,
			matches = [],
			i = 0,
			longitud = elems.length,
			callbackExpect =! invertido;

		// Ir a través de la matriz, solo guardando los elementos
		// que pasa la función de validación
		para (; i <longitud; i ++) {
			callbackInverse =! callback (elems [i], i);
			if (callbackInverse! == callbackExpect) {
				matches.push (elems [i]);
			}
		}

		partidos de vuelta;
	},

	// arg es solo para uso interno
	mapa: función (elems, callback, arg) {
		var longitud, valor,
			i = 0,
			ret = [];

		// Ir a través de la matriz, traduciendo cada uno de los elementos a sus nuevos valores
		if (isArrayLike (elems)) {
			longitud = elems.length;
			para (; i <longitud; i ++) {
				value = callback (elems [i], i, arg);

				if (value! = null) {
					ret.push (valor);
				}
			}

		// Revisa cada tecla en el objeto,
		} else {
			para (i en elems) {
				value = callback (elems [i], i, arg);

				if (value! = null) {
					ret.push (valor);
				}
			}
		}

		// Aplanar cualquier matriz anidada
		return concat.apply ([], ret);
	},

	// Un contador GUID global para objetos
	guid: 1,

	// jQuery.support no se usa en Core pero otros proyectos adjuntan su
	// propiedades para que necesite existir.
	soporte soporte
});

if (typeof Symbol === "function") {
	jQuery.fn [Symbol.iterator] = arr [Symbol.iterator];
}

// Rellena el mapa class2type
jQuery.each ("Boolean Number String Function Array Date RegExp Object Error Symbol" .split (""),
función (i, nombre) {
	class2type ["[object" + name + "]"] = name.toLowerCase ();
});

function isArrayLike (obj) {

	// Soporte: solo iOS 8.2 real (no reproducible en el simulador)
	// verificación `in` utilizada para evitar el error JIT (gh-2145)
	// hasOwn no se usa aquí debido a falsos negativos
	// con respecto a la longitud de Nodelist en IE
	var length = !! obj && "length" en obj && obj.length,
		type = toType (obj);

	if (isFunction (obj) || isWindow (obj)) {
		falso retorno;
	}

	tipo de retorno === "matriz" || longitud === 0 ||
		typeof length === "number" && length> 0 && (length - 1) en obj;
}
var Sizzle =
/ *!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation y otros colaboradores
 * Publicado bajo la licencia de MIT
 * http://jquery.org/license
 *
 * Fecha: 2016-08-08
 * /
(función (ventana) {

var i,
	apoyo,
	Expr,
	getText,
	isXML,
	tokenize,
	compilar,
	seleccionar,
	outermostContext,
	sortInput,
	hasDuplicate,

	// documento local vars
	setDocument,
	documento,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	partidos,
	contiene,

	// Datos específicos de la instancia
	expando = "sizzle" + 1 * nueva Fecha (),
	preferredDoc = window.document,
	dirruns = 0,
	hecho = 0,
	classCache = createCache (),
	tokenCache = createCache (),
	compilerCache = createCache (),
	sortOrder = function (a, b) {
		if (a === b) {
			hasDuplicate = verdadero;
		}
		return 0;
	},

	// métodos de instancia
	hasOwn = ({}). hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use un índice reducido, ya que es más rápido que el nativo
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function (list, elem) {
		var i = 0,
			len = list.length;
		para (; i <len; i ++) {
			if (lista [i] === elem) {
				devuelve i;
			}
		}
		return -1;
	},

	booleans = "checked | selected | async | autofocus | autoplay | controls | defer | disabled | hidden | ismap | loop | multiple | open | readonly | required | scoped",

	// Expresiones regulares

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\ x20 \\ t \\ r \\ n \\ f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?: \\\\. | [\\ w-] | [^ \ 0 - \\ xa0]) +",

	// Selectores de atributos: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\ [" + whitespace + "* (" + identifier + ") (?:" + espacio en blanco +
		// Operador (captura 2)
		"* ([* ^ $ |! ~]? =)" + espacio en blanco +
		// "Los valores de los atributos deben ser identificadores CSS [captura 5] o cadenas [captura 3 o captura 4]"
		"* (?: '((?: \\\\ | | [^ \\\\']) *) '| \" ((?: \\\\ | | [^ \\\\\ "] ) *) \ "| (" + identificador + ")) |)" + espacio en blanco +
		"* \\]",

	pseudos = ":(" + identificador + ") (?: \\ ((" +
		// Para reducir el número de selectores que necesitan tokenize en el preFiltro, prefiera los argumentos:
		// 1. citado (captura 3, captura 4 o captura 5)
		"('((?: \\\\ | | [^ \\\\']) *) '| \" ((?: \\\\. | [^ \\\\\ "]) *) \ ") |" +
		// 2. simple (captura 6)
		"((?: \\\. | [^ \\\\ () [\\]] |" + attributes + ") *) |" +
		// 3. cualquier cosa (captura 2)
		". *" +
		") \\) |)",

	// Espacios en blanco al final y sin escape, capturando algunos caracteres que no son de espacio en blanco que preceden al último
	rwhitespace = new RegExp (espacio en blanco + "+", "g"),
	rtrim = new RegExp ("^" + espacio en blanco + "+ | ((?: ^ | [^ \\\\]) (?: \\\\.) *)" + espacio en blanco + "+ $", "g "),

	rcomma = new RegExp ("^" + espacio en blanco + "*," + espacio en blanco + "*"),
	rcombinators = new RegExp ("^" + espacio en blanco + "* ([> + ~] |" + espacio en blanco + ")" + espacio en blanco + "*"),

	rattributeQuotes = new RegExp ("=" + espacio en blanco + "* ([^ \\] '\"] *?) "+ espacio en blanco +" * \\] "," g "),

	rpseudo = new RegExp (pseudos),
	ridentifier = new RegExp ("^" + identificador + "$"),

	matchExpr = {
		"ID": nuevo RegExp ("^ # (" + identificador + ")"),
		"CLASS": nuevo RegExp ("^ \\. (" + Identificador + ")"),
		"TAG": nuevo RegExp ("^ (" + identificador + "| [*])"),
		"ATTR": nuevo RegExp ("^" + atributos),
		"PSEUDO": nuevo RegExp ("^" + pseudos),
		"CHILD": nuevo RegExp ("^ :( solo | first | last | nth | nth-last) - (child | of-type) (?: \\ (" + whitespace +
			"* (incluso | impar | (([+ -] |) (\\ d *) n |)" + espacio en blanco + "* (?: ([+ -] |)" + espacio en blanco +
			"* (\\ d +) |)) + espacio en blanco +" * \\) |) "," i ",
		"bool": nuevo RegExp ("^ (?:" + booleans + ") $", "i"),
		// Para uso en bibliotecas que implementan .is ()
		// Utilizamos esto para la coincidencia de POS en `seleccionar`
		"needsContext": nuevo RegExp ("^" + espacio en blanco + "* [> + ~] |: (incluso | impar | eq | gt | lt | nth | primero | último) (?: \\ (" +
			espacio en blanco + "* ((?: - \\ d)? \\ d *)" + espacio en blanco + "* \\) |) (? = [^ -] | $)", "i")
	},

	rinputs = / ^ (?: input | select | textarea | botón) $ / i,
	rheader = / ^ h \ d $ / i,

	rnative = / ^ [^ {] + \ {\ s * \ [native \ w /,

	// ID de fácil identificación / recuperable o selectores TAG o CLASS
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = / [+ ~] /,

	// CSS escapa
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp ("\\\\ ([\\ da-f] {1,6}" + espacio en blanco + "? | (" + espacio en blanco + ") |.)", "ig"),
	funescape = function (_, escaped, escapadoWhitespace) {
		var high = "0x" + escaped - 0x10000;
		// NaN significa no codepoint
		// Soporte: Firefox <24
		// Solución errónea de interpretación numérica de + "0x"
		¡vuelve alto! == alto || escapadoWhitespace?
			escapado :
			alto <0?
				// punto de código BMP
				String.fromCharCode (alto + 0x10000):
				// Punto de código del plano suplementario (par sustituto)
				String.fromCharCode (alto >> 10 | 0xD800, alto y 0x3FF | 0xDC00);
	},

	// serialización del string / identificador de CSS
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = / ([\ 0- \ x1f \ x7f] | ^ -? \ d) | ^ - $ | [^ \ 0- \ x1f \ x7f- \ uFFFF \ w -] / g,
	fcssescape = function (ch, asCodePoint) {
		if (asCodePoint) {

			// U + 0000 NULL se convierte en U + FFFD CARACTER DE REEMPLAZO
			if (ch === "\ 0") {
				return "\ uFFFD";
			}

			// Los caracteres de control y los números (dependiendo de la posición) se escapan como puntos de código
			return ch.slice (0, -1) + "\\" + ch.charCodeAt (ch.length - 1) .toString (16) + "";
		}

		// Otros caracteres ASCII potencialmente especiales se escapan con barra invertida
		devolver "\\" + ch;
	},

	// Utilizado para iframes
	// Ver setDocument ()
	// Al eliminar el contenedor de funciones se genera un "Permiso denegado"
	// error en IE
	unloadHandler = function () {
		setDocument ();
	},

	disabledAncestor = addCombinator (
		función (elem) {
			return elem.disabled === true && ("forma" en elem || "etiqueta" en elem);
		},
		{dir: "parentNode", luego: "legend"}
	);

// Optimizar para push.apply (_, NodeList)
tratar {
	push.apply (
		(arr = slice.call (preferredDoc.childNodes)),
		preferredDoc.childNodes
	);
	// Soporte: Android <4.0
	// Detecta que falla silenciosamente push.apply
	arr [preferredDoc.childNodes.length] .nodeType;
} catch (e) {
	push = {apply: arr.length?

		// Leverage slice si es posible
		function (target, els) {
			push_native.apply (target, slice.call (els));
		}:

		// Soporte: IE <9
		// De lo contrario, anexar directamente
		function (target, els) {
			var j = target.length,
				i = 0;
			// No puedo confiar en NodeList.length
			while ((target [j ++] = els [i ++])) {}
			target.length = j - 1;
		}
	};
}

function Sizzle (selector, contexto, resultados, semilla) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType tiene como valor predeterminado 9, ya que el contexto predeterminado es el documento
		nodeType = context? context.nodeType: 9;

	resultados = resultados || [];

	// Retorno anticipado de llamadas con selector o contexto no válido
	if (typeof selector! == "cadena" ||! selector ||
		nodeType! == 1 && nodeType! == 9 && nodeType! == 11) {

		resultados de devolución;
	}

	// Intenta atajar las operaciones de búsqueda (a diferencia de los filtros) en documentos HTML
	if (! seed) {

		if ((context? context.ownerDocument || context: preferredDoc)! == document) {
			setDocument (contexto);
		}
		contexto = contexto || documento;

		if (documentIsHTML) {

			// Si el selector es lo suficientemente simple, intente utilizar un método DOM "get * By *"
			// (excepto el contexto DocumentFragment, donde los métodos no existen)
			if (nodeType! == 11 && (match = rquickExpr.exec (selector))) {

				// selector de ID
				if ((m = match [1])) {

					// Contexto del documento
					if (nodeType === 9) {
						if ((elem = context.getElementById (m))) {

							// Soporte: IE, Opera, Webkit
							// TODO: identificar versiones
							// getElementById puede hacer coincidir elementos por nombre en lugar de ID
							if (elem.id === m) {
								results.push (elem);
								resultados de devolución;
							}
						} else {
							resultados de devolución;
						}

					// Contexto del elemento
					} else {

						// Soporte: IE, Opera, Webkit
						// TODO: identificar versiones
						// getElementById puede hacer coincidir elementos por nombre en lugar de ID
						if (newContext && (elem = newContext.getElementById (m)) &&
							contiene (contexto, elem) &&
							elem.id === m) {

							results.push (elem);
							resultados de devolución;
						}
					}

				// selector de tipo
				} else if (match [2]) {
					push.apply (results, context.getElementsByTagName (selector));
					resultados de devolución;

				// selector de clase
				} else if ((m = match [3]) && support.getElementsByClassName &&
					context.getElementsByClassName) {

					push.apply (results, context.getElementsByClassName (m));
					resultados de devolución;
				}
			}

			// Aproveche querySelectorAll
			if (support.qsa &&
				! compilerCache [selector + ""] &&
				(! rbuggyQSA ||! rbuggyQSA.test (selector))) {

				if (nodeType! == 1) {
					newContext = contexto;
					newSelector = selector;

				// qSA mira fuera del contexto del elemento, que no es lo que queremos
				// Gracias a Andrew Dupont por esta técnica alternativa
				// Soporte: IE <= 8
				// Excluir elementos de objeto
				} else if (context.nodeName.toLowerCase ()! == "objeto") {

					// Capture el ID de contexto, configurándolo primero si es necesario
					if ((nid = context.getAttribute ("id"))) {
						nid = nid.replace (rcssescape, fcssescape);
					} else {
						context.setAttribute ("id", (nid = expando));
					}

					// Prefijo cada selector en la lista
					grupos = tokenize (selector);
					i = groups.length;
					mientras yo-- ) {
						groups [i] = "#" + nid + "" + toSelector (groups [i]);
					}
					newSelector = groups.join (",");

					// Expandir contexto para selectores hermanos
					newContext = rsibling.test (selector) && testContext (context.parentNode) ||
						contexto;
				}

				if (newSelector) {
					tratar {
						push.apply (resultados,
							newContext.querySelectorAll (newSelector)
						);
						resultados de devolución;
					} catch (qsaError) {
					} finalmente {
						if (nid === expando) {
							context.removeAttribute ("id");
						}
					}
				}
			}
		}
	}

	// Todos los otros
	return select (selector.replace (rtrim, "$ 1"), contexto, resultados, semilla);
}

/ **
 * Crear cachés clave-valor de tamaño limitado
 * @returns {function (string, object)} Devuelve los datos del objeto después de almacenarlo en sí mismo con
 * nombre de propiedad la cadena (con sufijo de espacio) y (si la caché es más grande que Expr.cacheLength)
 * borrar la entrada más antigua
 * /
function createCache () {
	var keys = [];

	caché de función (clave, valor) {
		// Use (tecla + "") para evitar la colisión con las propiedades del prototipo nativo (vea el Issue # 157)
		if (keys.push (key + "")> Expr.cacheLength) {
			// Solo guarde las entradas más recientes
			eliminar caché [keys.shift ()];
		}
		return (caché [tecla + ""] = valor);
	}
	caché de retorno;
}

/ **
 * Marque una función para uso especial por Sizzle
 * @param {Function} fn La función para marcar
 * /
function markFunction (fn) {
	fn [expando] = verdadero;
	return fn;
}

/ **
 * Pruebas de soporte usando un elemento
 * @param {Función} fn Pasó el elemento creado y devuelve un resultado booleano
 * /
función assert (fn) {
	var el = document.createElement ("fieldset");

	tratar {
		volver !! fn (el);
	} catch (e) {
		falso retorno;
	} finalmente {
		// Eliminar de su padre por defecto
		if (el.parentNode) {
			el.parentNode.removeChild (el);
		}
		// liberar memoria en IE
		el = null;
	}
}

/ **
 * Agrega el mismo controlador para todos los atributos especificados
 * @param {String} attrs Lista de atributos separados por tuberías
 * @param {Function} handler El método que se aplicará
 * /
function addHandle (attrs, controlador) {
	var arr = attrs.split ("|"),
		i = arr.length;

	mientras yo-- ) {
		Expr.attrHandle [arr [i]] = controlador;
	}
}

/ **
 * Verifica el orden de los documentos de dos hermanos
 * @param {Element} a
 * @param {Element} b
 * @ devuelve {Número} Devuelve menos de 0 si a es anterior a b, es mayor que 0 si a sigue a b
 * /
function siblingCheck (a, b) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Usa IE sourceIndex si está disponible en ambos nodos
	if (diff) {
		return diff;
	}

	// Verifica si b sigue una
	if (cur) {
		while ((cur = cur.nextSibling)) {
			if (cur === b) {
				return -1;
			}
		}
	}

	devuelve un? 1: -1;
}

/ **
 * Devuelve una función para usar en pseudos para los tipos de entrada
 * @param {String} tipo
 * /
función createInputPseudo (type) {
	función de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		return name === "input" && elem.type === type;
	};
}

/ **
 * Devuelve una función para usar en pseudos para botones
 * @param {String} tipo
 * /
function createButtonPseudo (type) {
	función de retorno (elem) {
		var name = elem.nodeName.toLowerCase ();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/ **
 * Devuelve una función para usar en pseudos para: habilitado /: deshabilitado
 * @param {booleano} deshabilitado verdadero para: deshabilitado; falso para: habilitado
 * /
función createDisabledPseudo (disabled) {

	// Conocido: deshabilitado falsos positivos: fieldset [disabled]> legend: nth-of-type (n + 2): can-disable
	función de retorno (elem) {

		// Solo ciertos elementos pueden coincidir: habilitados o deshabilitados
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ("formulario" en elem) {

			// Verificar la discapacidad heredada en elementos relevantes no desactivados:
			// * elementos asociados a formulario enumerados en un fieldset deshabilitado
			// https://html.spec.whatwg.org/multipage/forms.html#category-listed
			// https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * elementos de opción en un grupo de opciones desactivadas
			// https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// Todos esos elementos tienen una propiedad "forma".
			if (elem.parentNode && elem.disabled === false) {

				// Los elementos de opción difieren a un grupo de selección padre si está presente
				if ("etiqueta" en elem) {
					if ("etiqueta" en elem.parentNode) {
						return elem.parentNode.disabled === deshabilitado;
					} else {
						return elem.disabled === deshabilitado;
					}
				}

				// Soporte: IE 6 - 11
				// Usa la propiedad de acceso directo isDisabled para verificar si los ancestros del conjunto de campos están deshabilitados
				return elem.isDisabled === disabled ||

					// Donde no hay isDisabled, revisa manualmente
					/ * jshint -W018 * /
					elem.isDisabled! ==! disabled &&
						disabledAncestor (elem) === disabled;
			}

			return elem.disabled === deshabilitado;

		// Trata de sacar los elementos que no se pueden deshabilitar antes de confiar en la propiedad deshabilitada.
		// Algunas víctimas quedan atrapadas en nuestra red (etiqueta, leyenda, menú, pista), pero no debería
		// incluso existen en ellos, y mucho menos tienen un valor booleano.
		} else if ("etiqueta" en elem) {
			return elem.disabled === deshabilitado;
		}

		// Los elementos restantes no están: habilitados ni: deshabilitados
		falso retorno;
	};
}

/ **
 * Devuelve una función para usar en pseudos para posiciones
 * @param {Function} fn
 * /
function createPositionalPseudo (fn) {
	return markFunction (función (argumento) {
		argumento = + argumento;
		return markFunction (función (semilla, coincidencias) {
			var j,
				matchIndexes = fn ([], seed.length, argumento),
				i = matchIndexes.length;

			// Relacionar elementos encontrados en los índices especificados
			mientras yo-- ) {
				if (seed [(j = matchIndexes [i])]) {
					semilla [j] =! (coincide con [j] = semilla [j]);
				}
			}
		});
	});
}

/ **
 * Comprueba la validez de un nodo como contexto Sizzle
 * @param {Element | Object =} context
 * @return {Element | Object | Boolean} El nodo de entrada si es aceptable, de lo contrario un valor falso
 * /
function testContext (context) {
	return context && typeof context.getElementsByTagName! == "undefined" && context;
}

// Exponer vars de soporte para mayor comodidad
support = Sizzle.support = {};

/ **
 * Detecta nodos XML
 * @param {Element | Object} elem Un elemento o documento
 * @returns {Boolean} True iff elem es un nodo XML no HTML
 * /
isXML = Sizzle.isXML = function (elem) {
	// documentElement se verifica para los casos donde aún no existe
	// (como cargar iframes en IE - # 4833)
	var documentElement = elem && (elem.ownerDocument || elem) .documentElement;
	return documentElement? documentElement.nodeName! == "HTML": falso;
};

/ **
 * Establece las variables relacionadas con el documento una vez sobre la base del documento actual
 * @param {Element | Object} [doc] Un elemento u objeto de documento para usar para configurar el documento
 * @returns {Object} Devuelve el documento actual
 * /
setDocument = Sizzle.setDocument = function (node) {
	var hasCompare, subWindow,
		doc = nodo? node.ownerDocument || nodo: preferredDoc;

	// Regrese temprano si el documento no es válido o ya está seleccionado
	if (doc === document || doc.nodeType! == 9 ||! doc.documentElement) {
		documento de devolución;
	}

	// Actualizar variables globales
	document = doc;
	docElem = document.documentElement;
	documentIsHTML =! isXML (documento);

	// Soporte: IE 9-11, Edge
	// Acceder a los documentos de iframe después de la descarga arroja errores de "permiso denegado" (jQuery # 13936)
	if (preferredDoc! == documento &&
		(subWindow = document.defaultView) && subWindow.top! == subWindow) {

		// Soporte: IE 11, Edge
		if (subWindow.addEventListener) {
			subWindow.addEventListener ("unload", unloadHandler, false);

		// Soporte: IE 9 - 10 solamente
		} else if (subWindow.attachEvent) {
			subWindow.attachEvent ("onunload", unloadHandler);
		}
	}

	/ * Atributos
	-------------------------------------------------- -------------------- * /

	// Soporte: IE <8
	// Verificar que getAttribute realmente devuelva atributos y no propiedades
	// (excepto IE8 booleanos)
	support.attributes = assert (function (el) {
		el.className = "i";
		return! el.getAttribute ("className");
	});

	/ * getElement (s) por *
	-------------------------------------------------- -------------------- * /

	// Compruebe si getElementsByTagName ("*") devuelve solo elementos
	support.getElementsByTagName = assert (function (el) {
		el.appendChild (document.createComment (""));
		return! el.getElementsByTagName ("*"). length;
	});

	// Soporte: IE <9
	support.getElementsByClassName = rnative.test (document.getElementsByClassName);

	// Soporte: IE <10
	// Comprobar si getElementById devuelve elementos por nombre
	// Los métodos getElementById rotos no recogen los nombres programáticamente,
	// entonces usa una prueba rotunda de getElementsByName
	support.getById = assert (function (el) {
		docElem.appendChild (el) .id = expando;
		return! document.getElementsByName || ! document.getElementsByName (expando) .length;
	});

	// ID filtro y encontrar
	if (support.getById) {
		Expr.filter ["ID"] = función (id) {
			var attrId = id.replace (runescape, funescape);
			función de retorno (elem) {
				return elem.getAttribute ("id") === attrId;
			};
		};
		Expr.find ["ID"] = función (id, contexto) {
			if (typeof context.getElementById! == "undefined" && documentIsHTML) {
				var elem = context.getElementById (id);
				devolver elem? [elem]: [];
			}
		};
	} else {
		Expr.filter ["ID"] = función (id) {
			var attrId = id.replace (runescape, funescape);
			función de retorno (elem) {
				var node = typeof elem.getAttributeNode! == "undefined" &&
					elem.getAttributeNode ("id");
				nodo de retorno && node.value === attrId;
			};
		};

		// Soporte: IE 6 - 7 solamente
		// getElementById no es confiable como atajo de búsqueda
		Expr.find ["ID"] = función (id, contexto) {
			if (typeof context.getElementById! == "undefined" && documentIsHTML) {
				nodo var, i, elems,
					elem = context.getElementById (id);

				if (elem) {

					// Verificar el atributo de id
					node = elem.getAttributeNode ("id");
					if (node ​​&& node.value === id) {
						devolver [elem];
					}

					// Volver a caer en getElementsByName
					elems = context.getElementsByName (id);
					i = 0;
					while ((elem = elems [i ++])) {
						node = elem.getAttributeNode ("id");
						if (node ​​&& node.value === id) {
							devolver [elem];
						}
					}
				}

				regreso [];
			}
		};
	}

	// Tag
	Expr.find ["TAG"] = support.getElementsByTagName?
		función (etiqueta, contexto) {
			if (typeof context.getElementsByTagName! == "undefined") {
				return context.getElementsByTagName (tag);

			// Los nodos DocumentFragment no tienen gEBTN
			} else if (support.qsa) {
				return context.querySelectorAll (tag);
			}
		}:

		función (etiqueta, contexto) {
			var elem,
				tmp = [],
				i = 0,
				// Por feliz coincidencia, un gEBTN (roto) aparece en los nodos DocumentFragment también
				results = context.getElementsByTagName (tag);

			// Filtrar posibles comentarios
			if (tag === "*") {
				while ((elem = resultados [i ++])) {
					if (elem.nodeType === 1) {
						tmp.push (elem);
					}
				}

				devolver tmp;
			}
			resultados de devolución;
		};

	// Clase
	Expr.find ["CLASS"] = support.getElementsByClassName && function (className, context) {
		if (typeof context.getElementsByClassName! == "undefined" && documentIsHTML) {
			return context.getElementsByClassName (className);
		}
	};

	/ * QSA / matchesSelector
	-------------------------------------------------- -------------------- * /

	// Compatibilidad con QSA y matchesSelector

	// matchesSelector (: active) informa falso cuando es verdadero (IE9 / Opera 11.5)
	rbuggyMatches = [];

	// qSa (: focus) informa falso cuando es verdadero (Chrome 21)
	// Permitimos esto debido a un error en IE8 / 9 que arroja un error
	// siempre que se acceda a `document.activeElement` en un iframe
	// Entonces, permitimos que: focus pase a través de QSA todo el tiempo para evitar el error de IE
	// Ver https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ((support.qsa = rnative.test (document.querySelectorAll))) {
		// Crear QSA regex
		// Estrategia Regex adoptada por Diego Perini
		assert (function (el) {
			// Seleccionar se establece en cadena vacía a propósito
			// Esto es para probar el tratamiento de IE de forma no explícita
			// establecer un atributo de contenido booleano,
			// ya que su presencia debería ser suficiente
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild (el) .innerHTML = "<a id='" + expando +"'> </a> "+
				"<select id = '" + expando + "- \ r \\' msallowcapture = ''>" +
				"<opción seleccionada = ''> </ option> </ select>";

			// Soporte: IE8, Opera 11-12.16
			// No se debe seleccionar nada cuando las cadenas vacías sigan ^ = o $ = o * =
			// El atributo de prueba debe ser desconocido en Opera pero "seguro" para WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if (el.querySelectorAll ("[msallowcapture ^ = '']"). length) {
				rbuggyQSA.push ("[* ^ $] =" + espacio en blanco + "* (?: '' | \" \ ")");
			}

			// Soporte: IE8
			// Los atributos booleanos y el "valor" no se tratan correctamente
			if (! el.querySelectorAll ("[selected]"). length) {
				rbuggyQSA.push ("\\ [" + espacio en blanco + "* (?: valor |" + booleanos + ")");
			}

			// Soporte: Chrome <29, Android <4.4, Safari <7.0+, iOS <7.0+, PhantomJS <1.9.8+
			if (! el.querySelectorAll ("[id ~ =" + expando + "-]") .length) {
				rbuggyQSA.push ("~ =");
			}

			// Webkit / Opera -: checked debería devolver los elementos de opción seleccionados
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 arroja un error aquí y no verá las pruebas posteriores
			if (! el.querySelectorAll (": checked"). length) {
				rbuggyQSA.push (": comprobado");
			}

			// Soporte: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// El selector `selector de hermanos` id-selector 'in-page' falla
			if (! el.querySelectorAll ("a #" + expando + "+ *") .length) {
				rbuggyQSA.push (". #. + [+ ~]");
			}
		});

		assert (function (el) {
			el.innerHTML = "<a href='' disabled='disabled'> </a>" +
				"<select disabled = 'disabled'> <option /> </ select>";

			// Soporte: Windows 8 Native Apps
			// Los atributos de tipo y nombre están restringidos durante la asignación .innerHTML
			var input = document.createElement ("entrada");
			input.setAttribute ("tipo", "oculto");
			el.appendChild (input) .setAttribute ("nombre", "D");

			// Soporte: IE8
			// Aplicar el atributo de sensibilidad de mayúsculas y minúsculas
			if (el.querySelectorAll ("[name = d]") longitud) {
				rbuggyQSA.push ("nombre" + espacio en blanco + "* [* ^ $ |! ~]? =");
			}

			// FF 3.5 -: elementos habilitados /: deshabilitados y ocultos (los elementos ocultos aún están habilitados)
			// IE8 arroja un error aquí y no verá las pruebas posteriores
			if (el.querySelectorAll (": enabled"). length! == 2) {
				rbuggyQSA.push (": habilitado", ": deshabilitado");
			}

			// Soporte: IE9-11 +
			// IE's: el selector deshabilitado no recoge los hijos de conjuntos de campo deshabilitados
			docElem.appendChild (el) .disabled = true;
			if (el.querySelectorAll (": disabled"). length! == 2) {
				rbuggyQSA.push (": habilitado", ": deshabilitado");
			}

			// Opera 10-11 no arroja pseudos inválidos post-coma
			el.querySelectorAll ("* ,: x");
			rbuggyQSA.push (",. *:");
		});
	}

	if ((support.matchesSelector = rnative.test ((matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector)))) {

		assert (function (el) {
			// Verifica si es posible hacer coincidenciasSelector
			// en un nodo desconectado (IE 9)
			support.disconnectedMatch = matches.call (el, "*");

			// Esto debería fallar con una excepción
			// Gecko no produce error, devuelve falso en su lugar
			matches.call (el, "[s! = '']: x");
			rbuggyMatches.push ("! =", pseudos);
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp (rbuggyQSA.join ("|"));
	rbuggyMatches = rbuggyMatches.length && new RegExp (rbuggyMatches.join ("|"));

	/ * Contiene
	-------------------------------------------------- -------------------- * /
	hasCompare = rnative.test (docElem.compareDocumentPosition);

	// Element contiene otro
	// Propósito auto-exclusivo
	// Como en, un elemento no se contiene
	contains = hasCompare || rnative.test (docElem.contains)?
		función (a, b) {
			var adown = a.nodeType === 9? a.documentElement: a,
				bup = b && b.parentNode;
			devolver a === bup || !! (bup && bup.nodeType === 1 && (
				adown.contains?
					adown.contains (bup):
					a.compareDocumentPosition && a.compareDocumentPosition (bup) & 16
			));
		}:
		función (a, b) {
			si (b) {
				while ((b = b.parentNode)) {
					if (b === a) {
						devolver verdadero;
					}
				}
			}
			falso retorno;
		};

	/ * Clasificación
	-------------------------------------------------- -------------------- * /

	// Clasificación de orden de documentos
	sortOrder = hasCompare?
	función (a, b) {

		// Marcar para eliminar duplicados
		if (a === b) {
			hasDuplicate = verdadero;
			return 0;
		}

		// Ordenar en el método de existencia si solo una entrada tiene compararDocumentPosition
		var compare =! a.compareDocumentPosition -! b.compareDocumentPosition;
		si (comparar) {
			comparar de vuelta;
		}

		// Calcular posición si ambas entradas pertenecen al mismo documento
		compare = (a.ownerDocument || a) === (b.ownerDocument || b)?
			a.compareDocumentPosition (b):

			// De lo contrario, sabemos que están desconectados
			1;

		// nodos desconectados
		if (comparar y 1 ||
			(! support.sortDetached && b.compareDocumentPosition (a) === compare)) {

			// Elige el primer elemento relacionado con nuestro documento preferido
			if (a === document || a.ownerDocument === preferredDoc && contains (preferredDoc, a)) {
				return -1;
			}
			if (b === document || b.ownerDocument === preferredDoc && contains (preferredDoc, b)) {
				return 1;
			}

			// Mantener orden original
			return sortInput?
				(indexOf (sortInput, a) - indexOf (sortInput, b)):
				0;
		}

		volver comparar y 4? -1: 1;
	}:
	función (a, b) {
		// Salir temprano si los nodos son idénticos
		if (a === b) {
			hasDuplicate = verdadero;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [a],
			bp = [b];

		// Los nodos sin padres son documentos o están desconectados
		if (! aup ||! bup) {
			devolver un === documento? -1:
				b === documento? 1:
				aup? -1:
				bup? 1:
				sortInput?
				(indexOf (sortInput, a) - indexOf (sortInput, b)):
				0;

		// Si los nodos son hermanos, podemos hacer una comprobación rápida
		} else if (aup === bup) {
			return siblingCheck (a, b);
		}

		// De lo contrario, necesitamos listas completas de sus antepasados ​​para comparar
		cur = a;
		while ((cur = cur.parentNode)) {
			ap.unshift (cur);
		}
		cur = b;
		while ((cur = cur.parentNode)) {
			bp.unshift (cur);
		}

		// Camina por el árbol buscando una discrepancia
		while (ap [i] === bp [i]) {
			i ++;
		}

		volver yo?
			// Haz una comprobación de hermanos si los nodos tienen un ancestro común
			siblingCheck (ap [i], bp [i]):

			// De lo contrario, los nodos en nuestro documento ordenan primero
			ap [i] === preferredDoc? -1:
			bp [i] === preferredDoc? 1:
			0;
	};

	documento de devolución;
};

Sizzle.matches = function (expr, elements) {
	return Sizzle (expr, null, null, elementos);
};

Sizzle.matchesSelector = function (elem, expr) {
	// Establecer valores de documento si es necesario
	if ((elem.ownerDocument || elem)! == document) {
		setDocument (elem);
	}

	// Asegúrate de que los selectores de atributos estén citados
	expr = expr.replace (rattributeQuotes, "= '$ 1')");

	if (support.matchesSelector && documentIsHTML &&
		! compilerCache [expr + ""] &&
		(! rbuggyMatches ||! rbuggyMatches.test (expr)) &&
		(! rbuggyQSA ||! rbuggyQSA.test (expr))) {

		tratar {
			var ret = matches.call (elem, expr);

			// MatchSelector de IE 9 devuelve falso en nodos desconectados
			if (ret || support.disconnectedMatch ||
					// Además, se dice que los nodos desconectados están en un documento
					// fragmento en IE 9
					elem.document && elem.document.nodeType! == 11) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle (expr, documento, null, [elem]) .length> 0;
};

Sizzle.contains = function (context, elem) {
	// Establecer valores de documento si es necesario
	if ((context.ownerDocument || context)! == document) {
		setDocument (contexto);
	}
	return contiene (contexto, elem);
};

Sizzle.attr = function (elem, name) {
	// Establecer valores de documento si es necesario
	if ((elem.ownerDocument || elem)! == document) {
		setDocument (elem);
	}

	var fn = Expr.attrHandle [name.toLowerCase ()],
		// No te dejes engañar por las propiedades Object.prototype (jQuery # 13807)
		val = fn && hasOwn.call (Expr.attrHandle, name.toLowerCase ())?
			fn (elem, name,! documentIsHTML):
			indefinido;

	return val! == undefined?
		Val:
		support.attributes || ! documentIsHTML?
			elem.getAttribute (nombre):
			(val = elem.getAttributeNode (name)) && val.specified?
				val.value:
				nulo;
};

Sizzle.escape = function (sel) {
	return (sel + "") .replace (rcssescape, fcssescape);
};

Sizzle.error = function (msg) {
	throw new Error ("Error de sintaxis, expresión no reconocida:" + msg);
};

/ **
 * Clasificación de documentos y eliminación de duplicados
 * @param {ArrayLike} resultados
 * /
Sizzle.uniqueSort = function (results) {
	var elem,
		duplicados = [],
		j = 0,
		i = 0;

	// A menos que * sepamos * podemos detectar duplicados, asumir su presencia
	hasDuplicate =! support.detectDuplicates;
	sortInput =! support.sortStable && results.slice (0);
	results.sort (sortOrder);

	if (hasDuplicate) {
		while ((elem = resultados [i ++])) {
			if (elem === resultados [i]) {
				j = duplicates.push (i);
			}
		}
		while (j--) {
			results.splice (duplicados [j], 1);
		}
	}

	// Entrada clara después de la clasificación para liberar objetos
	// Ver https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	resultados de devolución;
};

/ **
 * Función de utilidad para recuperar el valor de texto de una matriz de nodos DOM
 * @param {Array | Element} elem
 * /
getText = Sizzle.getText = function (elem) {
	nodo var,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if (! nodeType) {
		// Si no hay nodeType, se espera que esto sea una matriz
		while ((node ​​= elem [i ++])) {
			// No atravesar nodos de comentarios
			ret + = getText (nodo);
		}
	} else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
		// Usa el contenido de texto para los elementos
		// Se eliminó el uso de innerText por la consistencia de las nuevas líneas (jQuery # 11153)
		if (typeof elem.textContent === "string") {
			devolver elem.textContent;
		} else {
			// Atraviesa sus hijos
			para (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				ret + = getText (elem);
			}
		}
	} else if (nodeType === 3 || nodeType === 4) {
		return elem.nodeValue;
	}
	// No incluyen comentarios o nodos de instrucciones de procesamiento

	return ret;
};

Expr = Sizzle.selectors = {

	// Puede ser ajustado por el usuario
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	encontrar: {},

	relativo: {
		">": {dir: "parentNode", primero: true},
		"": {dir: "parentNode"},
		"+": {dir: "previousSibling", primero: true},
		"~": {dir: "previousSibling"}
	},

	Prefiltro: {
		"ATTR": función (coincidencia) {
			match [1] = match [1] .replace (runescape, funescape);

			// Mueve el valor dado para que coincida con [3] si está entre comillas o no.
			match [3] = (match [3] || match [4] || match [5] || "") .replace (runescape, funescape);

			if (match [2] === "~ =") {
				match [3] = "" + match [3] + "";
			}

			return match.slice (0, 4);
		},

		"NIÑO": función (coincidencia) {
			/ * coincide con matchExpr ["CHILD"]
				1 tipo (solo | nth | ...)
				2 qué (niño | de-tipo)
				3 argumento (incluso | impar | \ d * | \ d * n ([+ -] \ d +)? | ...)
				Componente de 4 xn del argumento xn + y ([+ -]? \ D * n |)
				5 signo de xn-componente
				6 x de componente xn
				7 signo de componente y
				8 y de componente y
			* /
			match [1] = match [1] .toLowerCase ();

			if (match [1] .slice (0, 3) === "nth") {
				// nth- * requiere argumento
				if (! match [3]) {
					Sizzle.error (coincidencia [0]);
				}

				// parámetros numéricos xey para Expr.filter.CHILD
				// recuerda ese lanzamiento falso / verdadero respectivamente a 0/1
				match [4] = + (match [4]? match [5] + (match [6] || 1): 2 * (match [3] === "even" || match [3] === " impar" ) );
				coincidencia [5] = + ((coincidencia [7] + coincidencia [8]) || coincidencia [3] === "impar");

			// otros tipos prohíben argumentos
			} else if (match [3]) {
				Sizzle.error (coincidencia [0]);
			}

			partido de vuelta;
		},

		"PSEUDO": función (coincidencia) {
			var exceso,
				unquoted =! match [6] && match [2];

			if (matchExpr ["CHILD"]. test (coincidencia [0])) {
				devolver nulo;
			}

			// Aceptar los argumentos citados como están
			if (match [3]) {
				match [2] = match [4] || partido [5] || "";

			// Elimina el exceso de caracteres de los argumentos no incluidos
			} else if (sin comillas && rpseudo.test (sin comillas) &&
				// Obtener exceso de tokenize (recursivamente)
				(excess = tokenize (sin comillas, verdadero)) &&
				// avanzar al siguiente paréntesis de cierre
				(excess = unquoted.indexOf (")", unquarted.length - excess) - unquoted.length)) {

				// el exceso es un índice negativo
				match [0] = match [0] .slice (0, exceso);
				match [2] = unquoted.slice (0, exceso);
			}

			// Devuelve solo las capturas necesarias por el método de pseudo filtro (tipo y argumento)
			return match.slice (0, 3);
		}
	},

	filtro: {

		"TAG": function (nodeNameSelector) {
			var nodeName = nodeNameSelector.replace (runescape, funescape) .toLowerCase ();
			return nodeNameSelector === "*"?
				function () {return true; }:
				función (elem) {
					return elem.nodeName && elem.nodeName.toLowerCase () === nodeName;
				};
		},

		"CLASS": function (className) {
			var pattern = classCache [className + ""];

			patrón de retorno ||
				(patrón = nuevo RegExp ("(^ |" + espacio en blanco + ")" + nombre de clase + "(" + espacio en blanco + "| $)")) &&
				classCache (className, function (elem) {
					return pattern.test (typeof elem.className === "string" && elem.className || typeof elem.getAttribute! == "undefined" && elem.getAttribute ("class") || "");
				});
		},

		"ATTR": función (nombre, operador, control) {
			función de retorno (elem) {
				var result = Sizzle.attr (elem, nombre);

				if (resultado == nulo) {
					operador de retorno === "! =";
				}
				if (! operator) {
					devolver verdadero;
				}

				resultado + = "";

				operador de devolución === "="? resultado === verificación:
					operador === "! ="? resultado! == verificación:
					operador === "^ ="? compruebe && result.indexOf (check) === 0:
					operador === "* ="? verificar && result.indexOf (verificar)> -1:
					operador === "$ ="? verificar && result.slice (-check.length) === verificar:
					operador === "~ ="? ("" + result.replace (rwhitespace, "") + "") .indexOf (check)> -1:
					operador === "| ="? resultado === control || result.slice (0, check.length + 1) === check + "-":
					falso;
			};
		},

		"NIÑO": función (tipo, qué, argumento, primero, último) {
			var simple = type.slice (0, 3)! == "nth",
				forward = type.slice (-4)! == "last",
				ofType = what === "of-type";

			devolver primero === 1 && last === 0?

				// Acceso directo para: nth - * (n)
				función (elem) {
					¡vuelve! elem.parentNode;
				}:

				función (elem, context, xml) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple! == adelante? "nextSibling": "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase (),
						useCache =! xml &&! ofType,
						diff = falso;

					if (padre) {

						//: (first | last | only) - (child | of-type)
						if (simple) {
							while (dir) {
								nodo = elem;
								while ((node ​​= node [dir])) {
									if (ofType?
										node.nodeName.toLowerCase () === nombre:
										node.nodeType === 1) {

										falso retorno;
									}
								}
								// Dirección inversa para: only- * (si aún no lo hemos hecho)
								start = dir = type === "only" &&! start && "nextSibling";
							}
							devolver verdadero;
						}

						start = [forward? parent.firstChild: parent.lastChild];

						// non-xml: nth-child (...) almacena datos de caché en `parent`
						if (forward && useCache) {

							// Busca `elem` de un índice previamente almacenado en caché

							// ... de una manera amigable gzip
							nodo = padre;
							outerCache = node [expando] || (nodo [expando] = {});

							// Soporte: IE <9 solamente
							// Defiende contra attroperties clonadas (jQuery gh-1709)
							uniqueCache = outerCache [node.uniqueID] ||
								(outerCache [node.uniqueID] = {});

							cache = uniqueCache [tipo] || [];
							nodeIndex = caché [0] === dirruns && cache [1];
							diff = nodeIndex && cache [2];
							node = nodeIndex && parent.childNodes [nodeIndex];

							while ((node ​​= ++ nodeIndex && node && node [dir] ||

								// Regreso a la búsqueda de `elem` desde el comienzo
								(diff = nodeIndex = 0) || start.pop ())) {

								// Cuando se encuentra, los índices de caché en `parent` y break
								if (node.nodeType === 1 && ++ diff && node === elem) {
									uniqueCache [tipo] = [dirruns, nodeIndex, diff];
									descanso;
								}
							}

						} else {
							// Usa el índice del elemento previamente almacenado en caché si está disponible
							if (useCache) {
								// ... de una manera amigable gzip
								nodo = elem;
								outerCache = node [expando] || (nodo [expando] = {});

								// Soporte: IE <9 solamente
								// Defiende contra attroperties clonadas (jQuery gh-1709)
								uniqueCache = outerCache [node.uniqueID] ||
									(outerCache [node.uniqueID] = {});

								cache = uniqueCache [tipo] || [];
								nodeIndex = caché [0] === dirruns && cache [1];
								diff = nodeIndex;
							}

							// xml: nth-child (...)
							// o: nth-last-child (...) o: nth (-last)? - of-type (...)
							if (diff === falso) {
								// Usa el mismo loop como arriba para buscar `elem` desde el comienzo
								while ((node ​​= ++ nodeIndex && node && node [dir] ||
									(diff = nodeIndex = 0) || start.pop ())) {

									if ((ofType?
										node.nodeName.toLowerCase () === nombre:
										node.nodeType === 1) &&
										++ diff) {

										// Guarda en caché el índice de cada elemento encontrado
										if (useCache) {
											outerCache = node [expando] || (nodo [expando] = {});

											// Soporte: IE <9 solamente
											// Defiende contra attroperties clonadas (jQuery gh-1709)
											uniqueCache = outerCache [node.uniqueID] ||
												(outerCache [node.uniqueID] = {});

											uniqueCache [tipo] = [dirruns, diff];
										}

										if (node ​​=== elem) {
											descanso;
										}
									}
								}
							}
						}

						// Incorpore el desplazamiento, luego verifique el tamaño del ciclo
						diff - = último;
						return diff === first || (diff% primero === 0 && diff / first> = 0);
					}
				};
		},

		"PSEUDO": función (pseudo, argumento) {
			// los nombres de las pseudoclases no distinguen entre mayúsculas y minúsculas
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Priorizar por mayúsculas y minúsculas en caso de que se agreguen pseudos personalizados con letras mayúsculas
			// Recuerda que setFilters hereda de pseudos
			var args,
				fn = Expr.pseudos [pseudo] || Expr.setFilters [pseudo.toLowerCase ()] ||
					Sizzle.error ("pseudo no compatible:" + pseudo);

			// El usuario puede usar createPseudo para indicar que
			// se necesitan argumentos para crear la función de filtro
			// al igual que Sizzle
			if (fn [expando]) {
				return fn (argumento);
			}

			// Pero mantenemos el soporte para viejas firmas
			if (fn.length> 1) {
				args = [pseudo, pseudo, "", argumento];
				devuelve Expr.setFilters.hasOwnProperty (pseudo.toLowerCase ())?
					markFunction (función (semilla, coincidencias) {
						var idx,
							emparejado = fn (semilla, argumento),
							i = coincidente.length;
						mientras yo-- ) {
							idx = indexOf (semilla, emparejado [i]);
							seed [idx] =! (coincide con [idx] = emparejado [i]);
						}
					}):
					función (elem) {
						return fn (elem, 0, args);
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Pseudos potencialmente complejos
		"no": markFunction (función (selector) {
			// Recortar el selector pasado a compilar
			// para evitar el tratamiento de los principales y finales
			// espacios como combinators
			entrada var = [],
				resultados = [],
				matcher = compilar (selector.replace (rtrim, "$ 1"));

			return matcher [expando]?
				markFunction (función (semilla, coincidencias, contexto, xml) {
					var elem,
						incomparable = matcher (semilla, nulo, xml, []),
						i = seed.length;

					// Coincide con los elementos que no coinciden con `matcher`
					mientras yo-- ) {
						if ((elem = no coincidente [i])) {
							seed [i] =! (coincide con [i] = elem);
						}
					}
				}):
				función (elem, context, xml) {
					entrada [0] = elem;
					matcher (entrada, nulo, xml, resultados);
					// No guardes el elemento (problema n. ° 299)
					entrada [0] = nulo;
					return! results.pop ();
				};
		}),

		"tiene": markFunction (function (selector) {
			función de retorno (elem) {
				return Sizzle (selector, elem) .length> 0;
			};
		}),

		"contiene": markFunction (función (texto) {
			text = text.replace (runescape, funescape);
			función de retorno (elem) {
				return (elem.textContent || elem.innerText || getText (elem)) .indexOf (text)> -1;
			};
		}),

		// "Si un elemento está representado por un selector: lang ()
		// se basa únicamente en el valor de idioma del elemento
		// siendo igual al identificador C,
		// o comenzando con el identificador C inmediatamente seguido de "-".
		// La coincidencia de C con el valor de idioma del elemento se realiza sin distinción de mayúsculas y minúsculas.
		// El identificador C no tiene que ser un nombre de idioma válido. "
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction (function (lang) {
			// el valor lang debe ser un identificador válido
			if (! ridentifier.test (lang || ")) {
				Sizzle.error ("lang no compatible:" + lang);
			}
			lang = lang.replace (runescape, funescape) .toLowerCase ();
			función de retorno (elem) {
				var elemLang;
				hacer {
					if ((elemLang = documentIsHTML?
						elem.lang:
						elem.getAttribute ("xml: lang") || elem.getAttribute ("lang"))) {

						elemLang = elemLang.toLowerCase ();
						return elemLang === lang || elemLang.indexOf (lang + "-") === 0;
					}
				} while ((elem = elem.parentNode) && elem.nodeType === 1);
				falso retorno;
			};
		}),

		// Varios
		"objetivo": función (elem) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice (1) === elem.id;
		},

		"raíz": función (elem) {
			return elem === docElem;
		},

		"foco": función (elem) {
			return elem === document.activeElement && (! document.hasFocus || document.hasFocus ()) && !! (elem.type || elem.href || ~ elem.tabIndex);
		},

		// propiedades booleanas
		"enabled": createDisabledPseudo (false),
		"disabled": createDisabledPseudo (true),

		"checked": function (elem) {
			// En CSS3,: checked debe devolver los elementos seleccionados y seleccionados
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase ();
			return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !! elem.selected);
		},

		"seleccionado": función (elem) {
			// Acceder a esta propiedad hace que se seleccione por defecto
			// las opciones en Safari funcionan correctamente
			if (elem.parentNode) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === verdadero;
		},

		// Contenido
		"vacío": función (elem) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			//: empty es negado por el elemento (1) o los nodos de contenido (texto: 3; cdata: 4; entidad ref: 5),
			// pero no por otros (comentario: 8; instrucción de procesamiento: 7; etc.)
			// nodeType <6 funciona porque los atributos (2) no aparecen como niños
			para (elem = elem.firstChild; elem; elem = elem.nextSibling) {
				if (elem.nodeType <6) {
					falso retorno;
				}
			}
			devolver verdadero;
		},

		"padre": función (elem) {
			return! Expr.pseudos ["empty"] (elem);
		},

		// Elemento / tipos de entrada
		"encabezado": función (elem) {
			return rheader.test (elem.nodeName);
		},

		"entrada": función (elem) {
			devuelve rinputs.test (elem.nodeName);
		},

		"botón": función (elem) {
			var name = elem.nodeName.toLowerCase ();
			return name === "input" && elem.type === "button" || nombre === "botón";
		},

		"texto": función (elem) {
			var attr;
			return elem.nodeName.toLowerCase () === "input" &&
				elem.type === "text" &&

				// Soporte: IE <8
				// Aparecen nuevos valores de atributo HTML5 (por ejemplo, "búsqueda") con elem.type === "text"
				((attr = elem.getAttribute ("type")) == null || attr.toLowerCase () === "text");
		},

		// Position-in-collection
		"first": createPositionalPseudo (function () {
			devolver [0];
		}),

		"last": createPositionalPseudo (function (matchIndexes, length) {
			return [longitud - 1];
		}),

		"eq": createPositionalPseudo (function (matchIndexes, length, argument) {
			return [argumento <0? argumento + longitud: argumento];
		}),

		"incluso": createPositionalPseudo (function (matchIndexes, length) {
			var i = 0;
			para (; i <longitud; i + = 2) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		}),

		"impar": createPositionalPseudo (function (matchIndexes, length) {
			var i = 1;
			para (; i <longitud; i + = 2) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo (function (matchIndexes, length, argument) {
			var i = argumento <0? argumento + longitud: argumento;
			para (; --i> = 0;) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo (function (matchIndexes, length, argument) {
			var i = argumento <0? argumento + longitud: argumento;
			for (; ++ i <length;) {
				matchIndexes.push (i);
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos ["nth"] = Expr.pseudos ["eq"];

// Añadir botón / tipo de entrada pseudos
para (i en {radio: verdadero, casilla de verificación: verdadero, archivo: verdadero, contraseña: verdadero, imagen: verdadero}) {
	Expr.pseudos [i] = createInputPseudo (i);
}
for (i en {submit: true, reset: true}) {
	Expr.pseudos [i] = createButtonPseudo (i);
}

// API fácil para crear nuevos setFilters
function setFilters () {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters ();

tokenize = Sizzle.tokenize = function (selector, parseOnly) {
	var emparejado, partido, tokens, tipo,
		soFar, grupos, preFiltros,
		cached = tokenCache [selector + ""];

	if (en caché) {
		return parseOnly? 0: cached.slice (0);
	}

	soFar = selector;
	grupos = [];
	preFilters = Expr.preFilter;

	while (soFar) {

		// Coma y primera ejecución
		if (! matching || (match = rcomma.exec (soFar))) {
			if (coincidencia) {
				// No consuma comillas finales como válidas
				soFar = soFar.slice (coincide con [0] .length) || hasta aquí;
			}
			groups.push ((tokens = []));
		}

		emparejado = falso;

		// Combinators
		if ((match = rcombinators.exec (soFar))) {
			emparejado = match.shift ();
			tokens.push ({
				valor: emparejado,
				// Conecta los combinadores descendientes al espacio
				type: match [0] .replace (rtrim, "")
			});
			soFar = soFar.slice (matching.length);
		}

		// Filtros
		para (escriba en Expr.filter) {
			if ((match = matchExpr [tipo] .exec (soFar)) && (! preFilters [tipo] ||
				(match = preFilters [type] (match)))) {
				emparejado = match.shift ();
				tokens.push ({
					valor: emparejado,
					tipo: tipo,
					partidos: partido
				});
				soFar = soFar.slice (matching.length);
			}
		}

		if (! emparejado) {
			descanso;
		}
	}

	// Devuelve la longitud del exceso no válido
	// si solo estamos analizando
	// De lo contrario, lanzar un error o devolver tokens
	return parseOnly?
		soFar.length:
		hasta aquí ?
			Sizzle.error (selector):
			// Guarda en caché los tokens
			tokenCache (selector, grupos) .slice (0);
};

function toSelector (tokens) {
	var i = 0,
		len = tokens.length,
		selector = "";
	para (; i <len; i ++) {
		selector + = tokens [i] .value;
	}
	selector de devolución;
}

función addCombinator (matcher, combinator, base) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && clave === "parentNode",
		doneName = done ++;

	volver combinator.first?
		// Verificar contra el ancestro más cercano / elemento precedente
		función (elem, context, xml) {
			while ((elem = elem [dir])) {
				if (elem.nodeType === 1 || checkNonElements) {
					return matcher (elem, context, xml);
				}
			}
			falso retorno;
		}:

		// Verificar contra todos los ancestros / elementos precedentes
		función (elem, context, xml) {
			var oldCache, uniqueCache, outerCache,
				newCache = [dirruns, doneName];

			// No podemos establecer datos arbitrarios en nodos XML, por lo que no se benefician del almacenamiento en caché del combinador
			if (xml) {
				while ((elem = elem [dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						if (matcher (elem, context, xml)) {
							devolver verdadero;
						}
					}
				}
			} else {
				while ((elem = elem [dir])) {
					if (elem.nodeType === 1 || checkNonElements) {
						outerCache = elem [expando] || (elem [expando] = {});

						// Soporte: IE <9 solamente
						// Defiende contra attroperties clonadas (jQuery gh-1709)
						uniqueCache = outerCache [elem.uniqueID] || (outerCache [elem.uniqueID] = {});

						if (omitir && skip === elem.nodeName.toLowerCase ()) {
							elem = elem [dir] || elem;
						} else if ((oldCache = uniqueCache [clave]) &&
							oldCache [0] === dirruns && oldCache [1] === doneName) {

							// Asignar a newCache para que los resultados retrocedan a elementos anteriores
							return (newCache [2] = oldCache [2]);
						} else {
							// Reutilizar newcache para que los resultados se propaguen hacia atrás a los elementos anteriores
							uniqueCache [key] = newCache;

							// Un partido significa que hemos terminado; un error significa que tenemos que seguir comprobando
							if ((newCache [2] = matcher (elem, context, xml))) {
								devolver verdadero;
							}
						}
					}
				}
			}
			falso retorno;
		};
}

function elementMatcher (matchers) {
	devolver matchers.length> 1?
		función (elem, context, xml) {
			var i = matchers.length;
			mientras yo-- ) {
				if (! matchers [i] (elem, context, xml)) {
					falso retorno;
				}
			}
			devolver verdadero;
		}:
		matchers [0];
}

function multipleContexts (selector, contextos, resultados) {
	var i = 0,
		len = contexts.length;
	para (; i <len; i ++) {
		Sizzle (selector, contextos [i], resultados);
	}
	resultados de devolución;
}

función condensada (no coincidente, mapa, filtro, contexto, xml) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map! = null;

	para (; i <len; i ++) {
		if ((elem = no coincidente [i])) {
			if (! filter || filter (elem, context, xml)) {
				newUnmatched.push (elem);
				if (mapeado) {
					map.push (i);
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher (preFilter, selector, matcher, postFilter, postFinder, postSelector) {
	if (postFilter &&! postFilter [expando]) {
		postFilter = setMatcher (postFilter);
	}
	if (postFinder &&! postFinder [expando]) {
		postFinder = setMatcher (postFinder, postSelector);
	}
	return markFunction (función (semilla, resultados, contexto, xml) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexistente = results.length,

			// Obtener elementos iniciales de semilla o contexto
			elems = semilla || multipleContexts (selector || "*", context.nodeType? [context]: context, []),

			// Prefilter para obtener la entrada de matcher, preservando un mapa para la sincronización de resultados de inicialización
			matcherIn = preFilter && (seed || selector)?
				condense (elems, preMap, preFilter, context, xml):
				Elems,

			matcherOut = matcher?
				// Si tenemos un postFinder, o seed filtrado, o postFilter no semilla o resultados preexistentes,
				postFinder || (seed? preFilter: preexisting || postFilter)?

					// ... es necesario un procesamiento intermedio
					[]:

					// ... de lo contrario, usa los resultados directamente
					resultados:
				matcherIn;

		// Encuentra coincidencias principales
		if (matcher) {
			matcher (matcherIn, matcherOut, context, xml);
		}

		// Aplicar postFilter
		if (postFilter) {
			temp = condense (matcherOut, postMap);
			postFilter (temp, [], context, xml);

			// Ignorar elementos que fallan volviendo a moverlos a matcherIn
			i = temp.length;
			mientras yo-- ) {
				if ((elem = temp [i])) {
					matcherOut [postMap [i]] =! (matcherIn [postMap [i]] = elem);
				}
			}
		}

		si (semilla) {
			if (postFinder || preFilter) {
				if (postFinder) {
					// Obtenga el matcherOut final al condensar este intermedio en contextos postFinder
					temp = [];
					i = matcherOut.length;
					mientras yo-- ) {
						if ((elem = matcherOut [i])) {
							// Restaurar matcherIn ya que elem aún no es una coincidencia final
							temp.push ((matcherIn [i] = elem));
						}
					}
					postFinder (null, (matcherOut = []), temp, xml);
				}

				// Mueva los elementos coincidentes de la semilla a los resultados para mantenerlos sincronizados
				i = matcherOut.length;
				mientras yo-- ) {
					if ((elem = matcherOut [i]) &&
						(temp = postFinder? indexOf (semilla, elem): preMap [i])> -1) {

						seed [temp] =! (results [temp] = elem);
					}
				}
			}

		// Agregar elementos a los resultados, a través de postFinder si está definido
		} else {
			matcherOut = condensado (
				matcherOut === resultados?
					matcherOut.splice (preexistente, matcherOut.length):
					matcherOut
			);
			if (postFinder) {
				postFinder (null, resultados, matcherOut, xml);
			} else {
				push.apply (resultados, matcherOut);
			}
		}
	});
}

function matcherFromTokens (tokens) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative [tokens [0] .type],
		implicitRelative = leadingRelative || Expr.relative [""],
		i = leadingRelative? 1: 0,

		// El matcher fundacional asegura que los elementos son alcanzables desde el (los) contexto (s) de nivel superior
		matchContext = addCombinator (función (elem) {
			return elem === checkContext;
		}, implicitRelative, true),
		matchAnyContext = addCombinator (function (elem) {
			return indexOf (checkContext, elem)> -1;
		}, implicitRelative, true),
		matchers = [function (elem, context, xml) {
			var ret = (! leadingRelative && (xml || context! == outermostContext)) || (
				(checkContext = context) .nodeType?
					matchContext (elem, context, xml):
					matchAnyContext (elem, context, xml));
			// Evita colgar en el elemento (problema n. ° 299)
			checkContext = null;
			return ret;
		}];

	para (; i <len; i ++) {
		if ((matcher = Expr.relative [tokens [i] .type])) {
			matchers = [addCombinator (elementMatcher (matchers), matcher)];
		} else {
			matcher = Expr.filter [tokens [i] .type] .apply (null, tokens [i] .matches);

			// Retorno especial al ver un matcher posicional
			if (matcher [expando]) {
				// Encuentra el siguiente operador relativo (si lo hay) para un manejo adecuado
				j = ++ i;
				para (; j <len; j ++) {
					if (Expr.relative [tokens [j] .type]) {
						descanso;
					}
				}
				devuelve setMatcher (
					i> 1 && elementMatcher (matchers),
					i> 1 && toSelector (
						// Si el token anterior era un combinador descendiente, inserte un elemento any implícito `*`
						tokens.slice (0, i - 1) .concat ({value: tokens [i - 2] .type === ""? "" * ":" "})
					) .replace (rtrim, "$ 1"),
					matcher,
					i <j && matcherFromTokens (tokens.slice (i, j)),
					j <len && matcherFromTokens ((tokens = tokens.slice (j))),
					j <len && toSelector (tokens)
				);
			}
			matchers.push (matcher);
		}
	}

	return elementMatcher (matchers);
}

function matcherFromGroupMatchers (elementMatchers, setMatchers) {
	var bySet = setMatchers.length> 0,
		byElement = elementMatchers.length> 0,
		superMatcher = function (semilla, contexto, xml, resultados, más externo) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				inigualable = semilla && [],
				setMatched = [],
				contextBackup = outermostContext,
				// Siempre debemos tener elementos semilla o el contexto más externo
				elems = semilla || byElement && Expr.find ["TAG"] ("*", más externo),
				// Usa dirruns enteros iff este es el matcher más externo
				dirrunsUnique = (dirruns + = contextBackup == null? 1: Math.random () || 0.1),
				len = elems.length;

			if (outermost) {
				outermostContext = context === documento || contexto || más exterior;
			}

			// Agregar elementos que pasen elementMatchers directamente a los resultados
			// Soporte: IE <9, Safari
			// Tolerar las propiedades de NodeList (IE: "length"; Safari: <number>) haciendo coincidir elementos por id
			para (; i! == len && (elem = elems [i])! = null; i ++) {
				if (byElement && elem) {
					j = 0;
					if (! context && elem.ownerDocument! == document) {
						setDocument (elem);
						xml =! documentIsHTML;
					}
					while ((matcher = elementMatchers [j ++])) {
						if (matcher (elem, context || document, xml)) {
							results.push (elem);
							descanso;
						}
					}
					if (outermost) {
						dirruns = dirrunsUnique;
					}
				}

				// Seguimiento de elementos no coincidentes para establecer filtros
				if (bySet) {
					// Habrán pasado por todas las parejas posibles
					if ((elem =! matcher && elem)) {
						matchingCount--;
					}

					// Alarga la matriz para cada elemento, coincide o no
					si (semilla) {
						unmatched.push (elem);
					}
				}
			}

			// `i` ahora es el recuento de los elementos visitados anteriormente, y agregarlo a` matchedCount`
			// hace que este último sea no negativo.
			matchingCount + = i;

			// Aplicar filtros de conjunto a elementos no coincidentes
			// NOTA: Esto se puede omitir si no hay elementos no coincidentes (es decir, `matchedCount`
			// es igual a `i`), a menos que no hayamos visitado _any_ elementos en el ciclo anterior porque tenemos
			// sin elementos que coincidan y sin semilla.
			// Incrementando una cadena inicial "0" `i` permite que` i` permanezca como una cadena solo en ese
			// case, que dará como resultado un "00" `matchedCount` que difiere de` i` pero también es
			// numéricamente cero.
			if (bySet && i! == matchedCount) {
				j = 0;
				while ((matcher = setMatchers [j ++])) {
					matcher (sin igual, setMatched, context, xml);
				}

				si (semilla) {
					// Reintegrar las coincidencias de elementos para eliminar la necesidad de clasificar
					if (matchingCount> 0) {
						mientras yo-- ) {
							if (! (inigualable [i] || setMatched [i])) {
								setMatched [i] = pop.call (resultados);
							}
						}
					}

					// Descartar valores de marcador de posición de índice para obtener solo coincidencias reales
					setMatched = condense (setMatched);
				}

				// Añadir coincidencias a los resultados
				push.apply (results, setMatched);

				// Las combinaciones de conjuntos sin semillas que suceden con éxito en varias combinaciones exitosas estipulan la clasificación
				if (outermost &&! seed && setMatched.length> 0 &&
					(matchedCount + setMatchers.length)> 1) {

					Sizzle.uniqueSort (resultados);
				}
			}

			// Anula la manipulación de globales por parte de los marcadores anidados
			if (outermost) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			regreso sin igual;
		};

	volver por Set?
		markFunction (superMatcher):
		superMatcher;
}

compile = Sizzle.compile = function (selector, coincidencia / * Solo uso interno * /) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache [selector + ""];

	if (! cached) {
		// Genera una función de funciones recursivas que se puede usar para verificar cada elemento
		if (! match) {
			match = tokenize (selector);
		}
		i = match.length;
		mientras yo-- ) {
			cached = matcherFromTokens (coincidencia [i]);
			if (en caché [expando]) {
				setMatchers.push (en caché);
			} else {
				elementMatchers.push (en caché);
			}
		}

		// Guarda en caché la función compilada
		cached = compilerCache (selector, matcherFromGroupMatchers (elementMatchers, setMatchers));

		// Guardar selector y tokenización
		cached.selector = selector;
	}
	devolver en caché;
};

/ **
 * Una función de selección de bajo nivel que funciona con compilado de Sizzle
 * funciones de selector
 * Selector @param {String | Function} Selector o precompilado
 * Función de selector construida con Sizzle.compile
 * contexto @param {Element}
 * @param {Array} [resultados]
 * @param {Array} [seed] Un conjunto de elementos para hacer coincidir
 * /
select = Sizzle.select = function (selector, contexto, resultados, semilla) {
	var i, tokens, token, tipo, buscar,
		compiled = typeof selector === "function" && selector,
		match =! seed && tokenize ((selector = compiled.selector || selector));

	resultados = resultados || [];

	// Intenta minimizar las operaciones si solo hay un selector en la lista y no hay semillas
	// (el último de los cuales nos garantiza el contexto)
	if (match.length === 1) {

		// Reduce el contexto si el selector compuesto líder es una ID
		tokens = match [0] = match [0] .slice (0);
		if (tokens.length> 2 && (token = tokens [0]). tipo === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative [tokens [1] .type]) {

			context = (Expr.find ["ID"] (token.matches [0] .replace (runescape, funescape), context) || []) [0];
			if (! context) {
				resultados de devolución;

			// Los emparejamientos precompilados aún verificarán ancestros, así que sube un nivel
			} else if (compilado) {
				context = context.parentNode;
			}

			selector = selector.slice (tokens.shift (). value.length);
		}

		// Obtener un conjunto de semillas para la correspondencia de derecha a izquierda
		i = matchExpr ["needsContext"]. test (selector)? 0: tokens.length;
		mientras yo-- ) {
			token = tokens [i];

			// abortar si golpeamos un combinador
			if (Expr.relative [(type = token.type)]) {
				descanso;
			}
			if ((find = Expr.find [type])) {
				// Buscar, expandir el contexto para los principales combinadores de hermanos
				if ((semilla = encontrar (
					token.matches [0] .replace (runescape, funescape),
					rsibling.test (tokens [0] .type) && testContext (context.parentNode) || contexto
				))) {

					// Si seed está vacío o no quedan tokens, podemos regresar temprano
					tokens.splice (i, 1);
					selector = seed.length && toSelector (tokens);
					if (! selector) {
						push.apply (resultados, semilla);
						resultados de devolución;
					}

					descanso;
				}
			}
		}
	}

	// Compila y ejecuta una función de filtrado si no se proporciona una
	// Proporcionar `match` para evitar la retoqueización si modificamos el selector anterior
	(compilado || compilar (selector, partido)) (
		semilla,
		contexto,
		! documentIsHTML,
		resultados,
		! contexto || rsibling.test (selector) && testContext (context.parentNode) || contexto
	);
	resultados de devolución;
};

// asignaciones de una sola vez

// Clasificar estabilidad
support.sortStable = expando.split (""). sort (sortOrder) .join ("") === expando;

// Soporte: Chrome 14-35 +
// Siempre asume duplicados si no se pasan a la función de comparación
support.detectDuplicates = !! hasDuplicate;

// Initialize contra el documento predeterminado
setDocument ();

// Soporte: Webkit <537.32 - Safari 6.0.3 / Chrome 25 (arreglado en Chrome 27)
// Los nodos separados se siguen * uno al otro *
support.sortDetached = assert (function (el) {
	// Debería devolver 1, pero devuelve 4 (siguiente)
	return el.compareDocumentPosition (document.createElement ("fieldset")) & 1;
});

// Soporte: IE <8
// Prevenir la "interpolación" de atributo / propiedad
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if (! assert (function (el) {
	el.innerHTML = "<a href='#'> </a>";
	devuelve el.firstChild.getAttribute ("href") === "#";
})) {
	addHandle ("tipo | href | alto | ancho", función (elem, nombre, isXML) {
		if (! isXML) {
			return elem.getAttribute (name, name.toLowerCase () === "type"? 1: 2);
		}
	});
}

// Soporte: IE <9
// Usa defaultValue en lugar de getAttribute ("value")
if (! support.attributes ||! assert (function (el) {
	el.innerHTML = "<input />";
	el.firstChild.setAttribute ("valor", "");
	devuelve el.firstChild.getAttribute ("valor") === "";
})) {
	addHandle ("valor", función (elem, nombre, isXML) {
		if (! isXML && elem.nodeName.toLowerCase () === "input") {
			return elem.defaultValue;
		}
	});
}

// Soporte: IE <9
// Usa getAttributeNode para buscar booleanos cuando getAttribute mentiras
if (! assert (function (el) {
	return el.getAttribute ("deshabilitado") == nulo;
})) {
	addHandle (booleanos, función (elem, nombre, isXML) {
		var val;
		if (! isXML) {
			return elem [nombre] === ¿verdad? name.toLowerCase ():
					(val = elem.getAttributeNode (name)) && val.specified?
					val.value:
				nulo;
		}
	});
}

devolver Sizzle;

})( ventana );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Obsoleto
jQuery.expr [":"] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function (elem, dir, until) {
	var emparejado = [],
		truncado = hasta! == indefinido;

	while ((elem = elem [dir]) && elem.nodeType! == 9) {
		if (elem.nodeType === 1) {
			if (truncar && jQuery (elem) .is (hasta)) {
				descanso;
			}
			emparejado.push (elem);
		}
	}
	regreso emparejado;
};


var hermanos = función (n, elem) {
	var emparejado = [];

	para (; n; n = n.nextSibling) {
		if (n.nodeType === 1 && n! == elem) {
			emparejado.push (n);
		}
	}

	regreso emparejado;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName (elem, nombre) {

  return elem.nodeName && elem.nodeName.toLowerCase () === name.toLowerCase ();

};
var rsingleTag = (/ ^ <([az] [^ \ / \ 0>: \ x20 \ t \ r \ n \ f] *) [\ x20 \ t \ r \ n \ f] * \ /?> ( ?: <\ / \ 1> |) $ / i);



// Implementa la funcionalidad idéntica para filtro y no
función winnow (elementos, calificador, no) {
	if (isFunction (calificador)) {
		return jQuery.grep (elementos, función (elem, i) {
			¡regreso! calificador.call (elem, i, elem)! == no;
		});
	}

	// Elemento individual
	if (qualifier.nodeType) {
		return jQuery.grep (elementos, función (elem) {
			return (elem === calificador)! == no;
		});
	}

	// Arraylike de elementos (jQuery, argumentos, Array)
	if (typeof calificador! == "cadena") {
		return jQuery.grep (elementos, función (elem) {
			return (indexOf.call (calificador, elem)> -1)! == no;
		});
	}

	// Filtrado directamente para selectores simples y complejos
	return jQuery.filter (calificador, elementos, no);
}

jQuery.filter = function (expr, elems, not) {
	var elem = elems [0];

	si no ) {
		expr = ": not (" + expr + ")";
	}

	if (elems.length === 1 && elem.nodeType === 1) {
		return jQuery.find.matchesSelector (elem, expr)? [elem]: [];
	}

	return jQuery.find.matches (expr, jQuery.grep (elems, function (elem) {
		return elem.nodeType === 1;
	}));
};

jQuery.fn.extend ({
	find: function (selector) {
		var i, ret,
			len = this.length,
			self = esto;

		if (typeof selector! == "cadena") {
			return this.pushStack (jQuery (selector) .filter (function () {
				para (i = 0; i <len; i ++) {
					if (jQuery.contains (self [i], this)) {
						devolver verdadero;
					}
				}
			}));
		}

		ret = this.pushStack ([]);

		para (i = 0; i <len; i ++) {
			jQuery.find (selector, self [i], ret);
		}

		devolver len> 1? jQuery.uniqueSort (ret): ret;
	},
	filter: function (selector) {
		devuelve this.pushStack (winnow (this, selector || [], false));
	},
	no: función (selector) {
		devuelve this.pushStack (winnow (this, selector || [], true));
	},
	es: function (selector) {
		¡regreso!
			esta,

			// Si este es un selector posicional / relativo, verifique la membresía en el conjunto devuelto
			// tan $ ("p: first"). is ("p: last") no devolverá true para un documento con dos "p".
			typeof selector === "cadena" && rneedsContext.test (selector)?
				jQuery (selector):
				selector || [],
			falso
		).longitud;
	}
});


// Inicializar un objeto jQuery


// Una referencia central a la raíz jQuery (documento)
var rootjQuery,

	// Una forma simple de verificar cadenas de HTML
	// Prioriza a #id sobre <etiqueta> para evitar XSS a través de location.hash (# 9521)
	// Estricto reconocimiento HTML (# 11290: debe comenzar con <)
	// Acceso directo simple #id caso de velocidad
	rquickExpr = / ^ (?: \ s * (<[\ w \ W] +>) [^>] * | # ([\ w -] +)) $ /,

	init = jQuery.fn.init = function (selector, contexto, raíz) {
		var match, elem;

		// MANEJO: $ (""), $ (nulo), $ (indefinido), $ (falso)
		if (! selector) {
			devuelve esto;
		}

		// Método init () acepta un rootjQuery alternativo
		// para migrar puede admitir jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Manejar cadenas de HTML
		if (typeof selector === "cadena") {
			if (selector [0] === "<" &&
				selector [selector.length - 1] === ">" &&
				selector.length> = 3) {

				// Supongamos que las cadenas que comienzan y terminan con <> son HTML y omiten la comprobación de expresiones regulares
				match = [null, selector, null];

			} else {
				match = rquickExpr.exec (selector);
			}

			// Haga coincidir html o asegúrese de que no se especifique ningún contexto para #id
			if (match && (match [1] ||! context)) {

				// HANDLE: $ (html) -> $ (array)
				if (match [1]) {
					contexto = instancia de contexto de jQuery? contexto [0]: contexto;

					// La opción para ejecutar scripts es verdadera para back-compat
					// Permitir intencionalmente que se produzca el error si parseHTML no está presente
					jQuery.merge (this, jQuery.parseHTML (
						partido [1],
						context && context.nodeType? context.ownerDocument || contexto: documento,
						cierto
					));

					// HANDLE: $ (html, props)
					if (rsingleTag.test (match [1]) && jQuery.isPlainObject (context)) {
						para (partido en contexto) {

							// Las propiedades del contexto se llaman como métodos si es posible
							if (isFunction (this [match])) {
								este [partido] (contexto [partido]);

							// ... y configurados como atributos
							} else {
								this.attr (coincidencia, contexto [coincidencia]);
							}
						}
					}

					devuelve esto;

				// HANDLE: $ (# id)
				} else {
					elem = document.getElementById (coincidencia [2]);

					if (elem) {

						// Inyectar el elemento directamente en el objeto jQuery
						esto [0] = elem;
						this.length = 1;
					}
					devuelve esto;
				}

			// HANDLE: $ (expr, $ (...))
			} else if (! context || context.jquery) {
				return (context || root) .find (selector);

			// HANDLE: $ (expr, context)
			// (que es solo equivalente a: $ (context) .find (expr)
			} else {
				return this.constructor (context) .find (selector);
			}

		// HANDLE: $ (DOMElement)
		} else if (selector.nodeType) {
			este [0] = selector;
			this.length = 1;
			devuelve esto;

		// HANDLE: $ (función)
		// Acceso directo para documentos listos
		} else if (isFunction (selector)) {
			return root.ready! == undefined?
				root.ready (selector):

				// Ejecutar inmediatamente si ready no está presente
				selector (jQuery);
		}

		return jQuery.makeArray (selector, esto);
	};

// Dale a la función init el prototipo de jQuery para una instanciación posterior
init.prototype = jQuery.fn;

// Inicializar referencia central
rootjQuery = jQuery (documento);


var rparentsprev = / ^ (?: parents | prev (?: Until | All)) /,

	// Métodos garantizados para producir un conjunto único cuando se comienza desde un conjunto único
	guaranteedUnique = {
		niños: cierto,
		contenido: verdadero,
		siguiente: cierto,
		prev: cierto
	};

jQuery.fn.extend ({
	tiene: función (destino) {
		var targets = jQuery (target, this),
			l = targets.length;

		return this.filter (function () {
			var i = 0;
			para (; i <l; i ++) {
				if (jQuery.contains (this, targets [i])) {
					devolver verdadero;
				}
			}
		});
	},

	más cercano: función (selectores, contexto) {
		var cur,
			i = 0,
			l = this.length,
			emparejado = [],
			targets = typeof selectores! == "string" && jQuery (selectores);

		// Los selectores de posición nunca coinciden, ya que no hay _selection_ context
		if (! rneedsContext.test (selectores)) {
			para (; i <l; i ++) {
				para (cur = this [i]; cur && cur! == context; cur = cur.parentNode) {

					// Siempre salte fragmentos de documentos
					if (cur.nodeType <11 && (targets?
						targets.index (cur)> -1:

						// No pases elementos que no sean a Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector (cur, selectores))) {

						emparejado.push (cur);
						descanso;
					}
				}
			}
		}

		return this.pushStack (coincidente.length> 1? jQuery.uniqueSort (coincidente): coincidente);
	},

	// Determinar la posición de un elemento dentro del conjunto
	índice: función (elem) {

		// Sin argumento, índice de devolución en el padre
		if (! elem) {
			return (this [0] && this [0] .parentNode)? this.first (). prevAll (). length: -1;
		}

		// Índice en el selector
		if (typeof elem === "cadena") {
			return indexOf.call (jQuery (elem), esto [0]);
		}

		// Ubica la posición del elemento deseado
		return indexOf.call (esto,

			// Si recibe un objeto jQuery, se usa el primer elemento
			elem.jquery? elem [0]: elem
		);
	},

	agregar: función (selector, contexto) {
		devuelve this.pushStack (
			jQuery.uniqueSort (
				jQuery.merge (this.get (), jQuery (selector, contexto))
			)
		);
	},

	addBack: function (selector) {
		devuelve this.add (selector == null?
			this.prevObject: this.prevObject.filter (selector)
		);
	}
});

hermano de función (cur, dir) {
	while ((cur = cur [dir]) && cur.nodeType! == 1) {}
	devolver cur;
}

jQuery.each ({
	padre: función (elem) {
		var parent = elem.parentNode;
		return parent && parent.nodeType! == 11? padre: nulo;
	},
	padres: función (elem) {
		return dir (elem, "parentNode");
	},
	parentsUntil: function (elem, i, until) {
		devolver dir (elem, "parentNode", hasta);
	},
	siguiente: función (elem) {
		hermano de regreso (elem, "nextSibling");
	},
	prev: function (elem) {
		hermano de regreso (elem, "hermano anterior");
	},
	nextAll: function (elem) {
		return dir (elem, "nextSibling");
	},
	prevAll: function (elem) {
		return dir (elem, "previousSibling");
	},
	nextUntil: function (elem, i, until) {
		devolver dir (elem, "nextSibling", hasta);
	},
	prevUntil: function (elem, i, until) {
		devolver dir (elem, "previousSibling", hasta);
	},
	hermanos: función (elem) {
		hermanos de regreso ((elem.parentNode || {}) .firstChild, elem);
	},
	hijos: función (elem) {
		hermanos de regreso (elem.firstChild);
	},
	contenido: función (elem) {
        if (nodeName (elem, "iframe")) {
            return elem.contentDocument;
        }

        // Soporte: IE 9 - 11 solamente, iOS 7 solamente, navegador Android <= 4.3 solamente
        // Tratar el elemento de plantilla como uno normal en buscadores que
        // no lo soporto.
        if (nodeName (elem, "plantilla")) {
            elem = elem.content || elem;
        }

        return jQuery.merge ([], elem.childNodes);
	}
}, función (nombre, fn) {
	jQuery.fn [name] = function (until, selector) {
		var emparejado = jQuery.map (esto, fn, hasta);

		if (name.slice (-5)! == "Until") {
			selector = hasta;
		}

		if (selector && typeof selector === "cadena") {
			emparejado = jQuery.filter (selector, emparejado);
		}

		if (this.length> 1) {

			// Eliminar duplicados
			if (! guaranteedUnique [nombre]) {
				jQuery.uniqueSort (coincidente);
			}

			// orden inverso para los padres * y derivados previos
			if (rparentsprev.test (name)) {
				matching.reverse ();
			}
		}

		devuelve this.pushStack (emparejado);
	};
});
var rnothtmlwhite = (/ [^ \ x20 \ t \ r \ n \ f] + / g);



// Convertir las opciones formateadas en String en formateadas por Object
function createOptions (opciones) {
	var object = {};
	jQuery.each (options.match (rnothtmlwhite) || [], function (_, flag) {
		objeto [flag] = verdadero;
	});
	objeto de retorno;
}

/ *
 * Crea una lista de devolución de llamada utilizando los siguientes parámetros:
 *
 * opciones: una lista opcional de opciones separadas por espacios que cambiarán la forma
 * la lista de devolución de llamada se comporta o un objeto de opción más tradicional
 *
 * Por defecto, una lista de devolución de llamada actuará como una lista de devolución de eventos y puede ser
 * "disparado" varias veces.
 *
 * Posibles opciones:
 *
 * una vez: se asegurará de que la lista de devolución de llamada solo se active una vez (como un aplazado)
 *
 * memoria: hará un seguimiento de los valores anteriores y llamará a cualquier devolución de llamada agregada
 * después de que la lista ha sido disparada de inmediato con la última "memorización"
 * valores (como un aplazado)
 *
 * unique: asegurará que una devolución de llamada solo se pueda agregar una vez (no hay duplicados en la lista)
 *
 * stopOnFalse: interrumpe las llamadas cuando una devolución de llamada devuelve falso
 *
 * /
jQuery.Callbacks = function (opciones) {

	// Convierte las opciones de formato de cadena a formato de objeto si es necesario
	// (registramos la caché primero)
	opciones = tipo de opciones === "cadena"?
		createOptions (opciones):
		jQuery.extend ({}, opciones);

	var // Flag para saber si la lista está actualmente activa
		disparo,

		// Último valor de fuego para listas no olvidables
		memoria,

		// Marca para saber si la lista ya se activó
		despedido,

		// Bandera para evitar disparar
		bloqueado,

		// Lista de devolución real
		list = [],

		// Cola de datos de ejecución para listas repetibles
		queue = [],

		// Índice de devolución de llamada activa (modificada por agregar / eliminar según sea necesario)
		disparandoIndex = -1,

		// devolución de llamada de fuego
		fire = function () {

			// Aplicar una sola vez
			locked = locked || options.once;

			// Ejecutar callbacks para todas las ejecuciones pendientes,
			// respetando las anulaciones de disparosIndex y los cambios de tiempo de ejecución
			disparado = disparar = verdadero;
			for (; queue.length; firingIndex = -1) {
				memory = queue.shift ();
				while (++ fuegoIndex <list.length) {

					// Ejecute la devolución de llamada y verifique la finalización anticipada
					if (lista [igningIndex] .aplicar (memoria [0], memoria [1]) === false &&
						options.stopOnFalse) {

						// Salta al final y olvida los datos, así que .add no vuelve a disparar
						igningIndex = list.length;
						memoria = falso;
					}
				}
			}

			// Olvida los datos si hemos terminado con esto
			if (! options.memory) {
				memoria = falso;
			}

			disparando = falso;

			// Limpiar si hemos terminado de disparar para siempre
			if (bloqueado) {

				// Mantenga una lista vacía si tenemos datos para futuras llamadas
				if (memoria) {
					list = [];

				// De lo contrario, este objeto se gasta
				} else {
					list = "";
				}
			}
		},

		// objeto de devolución de llamada real
		self = {

			// Agregar una devolución de llamada o una colección de devoluciones de llamada a la lista
			agregar: función () {
				if (lista) {

					// Si tenemos memoria de una pasada, debemos disparar después de agregar
					if (memoria &&! disparo) {
						igningIndex = list.length - 1;
						queue.push (memoria);
					}

					(función add (args) {
						jQuery.each (args, function (_, arg) {
							if (isFunction (arg)) {
								if (! options.unique ||! self.has (arg)) {
									list.push (arg);
								}
							} else if (arg && arg.length && toType (arg)! == "cadena") {

								// Inspeccionar recursivamente
								agregar (arg);
							}
						});
					}) (argumentos);

					if (memoria &&! disparo) {
						fuego();
					}
				}
				devuelve esto;
			},

			// Eliminar una devolución de llamada de la lista
			remove: function () {
				jQuery.each (argumentos, función (_, arg) {
					índice de var;
					while ((index = jQuery.inArray (arg, list, index))> -1) {
						list.splice (índice, 1);

						// Manejar índices de tiro
						if (index <= fuegoIndex) {
							disparandoIndex--;
						}
					}
				});
				devuelve esto;
			},

			// Compruebe si una devolución de llamada dada está en la lista.
			// Si no se da ningún argumento, regrese si la lista tiene callbacks adjuntos o no.
			tiene: function (fn) {
				volver fn?
					jQuery.inArray (fn, list)> -1:
					list.length> 0;
			},

			// Eliminar todas las devoluciones de llamada de la lista
			empty: function () {
				if (lista) {
					list = [];
				}
				devuelve esto;
			},

			// Deshabilita .fire y .add
			// Abortar cualquier ejecución actual / pendiente
			// Borrar todas las devoluciones de llamada y valores
			disable: function () {
				locked = queue = [];
				list = memory = "";
				devuelve esto;
			},
			disabled: function () {
				lista de regreso!
			},

			// Deshabilitar .fire
			// También deshabilitamos .add a menos que tengamos memoria (ya que no tendría ningún efecto)
			// Abortar cualquier ejecución pendiente
			lock: function () {
				locked = queue = [];
				if (! memory &&! disparando) {
					list = memory = "";
				}
				devuelve esto;
			},
			locked: function () {
				volver !! bloqueado;
			},

			// Llamar a todas las devoluciones de llamada con el contexto y los argumentos dados
			fireWith: function (context, args) {
				if (! locked) {
					args = args || [];
					args = [context, args.slice? args.slice (): args];
					queue.push (args);
					if (! disparo) {
						fuego();
					}
				}
				devuelve esto;
			},

			// Llamar a todas las devoluciones de llamada con los argumentos dados
			fuego: función () {
				self.fireWith (esto, argumentos);
				devuelve esto;
			},

			// Para saber si las devoluciones de llamada ya se han llamado al menos una vez
			disparado: function () {
				¡vuelve! despedido;
			}
		};

	volverse a sí mismo;
};


Identidad de la función (v) {
	devolver v;
}
función Thrower (ex) {
	lanzar ex;
}

function adoptValue (valor, resolver, rechazar, noValue) {
	método var;

	tratar {

		// Verifica primero el aspecto de promesa para privilegiar el comportamiento sincrónico
		if (value && isFunction ((method = value.promise))) {
			method.call (value) .one (resolver) .fail (reject);

		// Otros tebeos
		} else if (value && isFunction ((method = value.then))) {
			method.call (value, resolve, reject);

		// Otros no tetables
		} else {

			// Controle los argumentos `resolve` dejando array # slice cast boolean` noValue` al entero:
			// * falso: [valor] .slice (0) => resolver (valor)
			// * true: [value] .slice (1) => resolve ()
			resolve.apply (undefined, [value] .slice (noValue));
		}

	// Para Promises / A +, convierta las excepciones en rechazos
	// Debido a que jQuery.when no desenvuelve los elementos inaceptables, podemos omitir los controles adicionales que aparecen en
	// Deferido # luego para suprimir condicionalmente el rechazo.
	} catch (valor) {

		// Soporte: solo Android 4.0
		// Funciones de modo estrictas invocadas sin .call / .apply get global-object context
		reject.apply (undefined, [value]);
	}
}

jQuery.extend ({

	Deferido: función (func) {
		var tuples = [

				// acción, agregar oyente, devoluciones de llamada,
				// ... .then handlers, argumento index, [estado final]
				["notificar", "progreso", jQuery.Callbacks ("memoria"),
					jQuery.Callbacks ("memoria"), 2],
				["resolver", "hecho", jQuery.Callbacks ("memoria de una vez"),
					jQuery.Callbacks ("una vez memoria"), 0, "resuelto"],
				["rechazar", "fallar", jQuery.Callbacks ("una vez memoria"),
					jQuery.Callbacks ("una vez memoria"), 1, "rechazado"]
			],
			estado = "pendiente",
			promesa = {
				función estatal() {
					estado de devolución;
				},
				siempre: función () {
					deferred.done (argumentos) .fail (argumentos);
					devuelve esto;
				},
				"catch": function (fn) {
					return promise.then (null, fn);
				},

				// Keep pipe para back-compat
				pipe: function (/ * fnDone, fnFail, fnProgress * /) {
					var fns = argumentos;

					return jQuery.Deferred (function (newDefer) {
						jQuery.each (tuplas, función (i, tupla) {

							// Asigna tuplas (progreso, hecho, falla) a argumentos (hecho, falla, progreso)
							var fn = isFunction (fns [tuple [4]]) && fns [tuple [4]];

							// deferred.progress (function () {bind to newDefer o newDefer.notify})
							// deferred.done (function () {bind to newDefer o newDefer.resolve})
							// deferred.fail (function () {bind to newDefer o newDefer.reject})
							diferido [tupla [1]] (función () {
								var returned = fn && fn.apply (esto, argumentos);
								if (returned && isFunction (returned.promise)) {
									returned.promise ()
										.progress (newDefer.notify)
										.done (newDefer.resolve)
										.fail (newDefer.reject);
								} else {
									newDefer [tuple [0] + "Con"] (
										esta,
										fn? [devuelto]: argumentos
									);
								}
							});
						});
						fns = null;
					}) .promise ();
				},
				then: function (onFulfilled, onRejected, onProgress) {
					var maxDepth = 0;
					resolución de la función (profundidad, diferido, controlador, especial) {
						función de retorno () {
							var that = this,
								args = argumentos,
								mightThrow = function () {
									var devuelto, entonces;

									// Soporte: Promises / A + sección 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignora los intentos de doble resolución
									if (profundidad <maxDepth) {
										regreso;
									}

									returned = handler.apply (eso, args);

									// Soporte: Promises / A + sección 2.3.1
									// https://promisesaplus.com/#point-48
									if (returned === deferred.promise ()) {
										lanzar nuevo TypeError ("auto-resolución de Thenable");
									}

									// Soporte: Promises / A + secciones 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Recuperar `luego` solo una vez
									then = devuelto &&

										// Soporte: Promesas / A + sección 2.3.4
										// https://promisesaplus.com/#point-64
										// Solo verifica objetos y funciones para la capacidad
										(typeof devuelto === "objeto" ||
											typeof devuelto === "función") &&
										devuelto.then;

									// Manejar un recuperable heredable
									if (isFunction (then)) {

										// Procesadores especiales (notificar) solo esperan la resolución
										if (especial) {
											luego llame(
												devuelto,
												resolver (maxDepth, diferido, identidad, especial),
												resolver (maxDepth, diferido, Thrower, especial)
											);

										// Los procesadores normales (resolver) también se enganchan en el progreso
										} else {

											// ... e ignorar los valores de resolución anteriores
											maxDepth ++;

											luego llame(
												devuelto,
												resolver (maxDepth, diferido, identidad, especial),
												resolver (maxDepth, diferido, Thrower, especial),
												resolver (maxDepth, diferido, identidad,
													deferred.notifyWith)
											);
										}

									// Manejar todos los demás valores devueltos
									} else {

										// Solo los controladores alternativos pasan el contexto
										// y valores múltiples (comportamiento no específico)
										if (handler! == Identidad) {
											eso = indefinido;
											args = [returned];
										}

										// Procesar el valor (es)
										// El proceso predeterminado es resolver
										(special || deferred.resolveWith) (eso, args);
									}
								},

								// Solo los procesadores normales (resolver) capturan y rechazan las excepciones
								proceso = especial?
									mightThrow:
									function () {
										tratar {
											mightThrow ();
										} catch (e) {

											if (jQuery.Deferred.exceptionHook) {
												jQuery.Deferred.exceptionHook (e,
													process.stackTrace);
											}

											// Soporte: Promises / A + sección 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignorar excepciones posteriores a la resolución
											if (profundidad + 1> = maxDepth) {

												// Solo los controladores alternativos pasan el contexto
												// y valores múltiples (comportamiento no específico)
												if (handler! == Thrower) {
													eso = indefinido;
													args = [e];
												}

												deferred.rejectWith (that, args);
											}
										}
									};

							// Soporte: Promises / A + sección 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resuelve las promesas inmediatamente para esquivar el rechazo falso de
							// errores subsiguientes
							if (profundidad) {
								proceso();
							} else {

								// Llamar a un gancho opcional para registrar la pila, en caso de excepción
								// ya que de lo contrario se pierde cuando la ejecución se vuelve asincrónica
								if (jQuery.Deferred.getStackHook) {
									process.stackTrace = jQuery.Deferred.getStackHook ();
								}
								window.setTimeout (proceso);
							}
						};
					}

					return jQuery.Deferred (function (newDefer) {

						// progress_handlers.add (...)
						tuplas [0] [3] .add (
							resolver(
								0,
								nuevoDefer,
								isFunction (onProgress)?
									en progreso :
									Identidad,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add (...)
						tuplas [1] [3] .add (
							resolver(
								0,
								nuevoDefer,
								isFunction (onFulfilled)?
									onFulfilled:
									Identidad
							)
						);

						// rejected_handlers.add (...)
						tuplas [2] [3] .add (
							resolver(
								0,
								nuevoDefer,
								isFunction (onRejected)?
									onRejected:
									Lanzador
							)
						);
					}) .promise ();
				},

				// Obtenga una promesa para este diferido
				// Si se proporciona obj, el aspecto de promesa se agrega al objeto
				promesa: función (obj) {
					return obj! = null? jQuery.extend (obj, promesa): promesa;
				}
			},
			diferido = {};

		// Añadir métodos específicos de la lista
		jQuery.each (tuplas, función (i, tupla) {
			var list = tuple [2],
				stateString = tuple [5];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promesa [tuple [1]] = list.add;

			// Manejar el estado
			if (stateString) {
				list.add (
					function () {

						// estado = "resuelto" (es decir, cumplido)
						// estado = "rechazado"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuplas [3 - i] [2] .disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuplas [3 - i] [3] .disable,

					// progress_callbacks.lock
					tuplas [0] [2] .lock,

					// progress_handlers.lock
					tuplas [0] [3] .lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add (tuple [3] .fire);

			// deferred.notify = function () {deferred.notifyWith (...)}
			// deferred.resolve = function () {deferred.resolveWith (...)}
			// deferred.reject = function () {deferred.rejectWith (...)}
			diferido [tuple [0]] = function () {
				diferido [tupla [0] + "Con"] (esto === diferido? indefinido: esto, argumentos);
				devuelve esto;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			diferido [tuple [0] + "Con"] = list.fireWith;
		});

		// Hacer que el diferido sea una promesa
		promesa.promiso (diferido);

		// Llamar func dado si hay alguno
		if (func) {
			func.call (diferido, diferido);
		}

		// ¡Todo listo!
		devolución diferida;
	},

	// Ayudante diferido
	cuando: function (singleValue) {
		var

			// recuento de subordinados incompletos
			remaining = arguments.length,

			// conteo de argumentos no procesados
			i = restante,

			// datos de cumplimiento subordinados
			resolveContexts = Array (i),
			resolveValues ​​= slice.call (argumentos),

			// el maestro diferido
			master = jQuery.Deferred (),

			// fábrica de devolución de llamada subordinada
			updateFunc = function (i) {
				función de retorno (valor) {
					resolveContexts [i] = this;
					resolveValues ​​[i] = arguments.length> 1? slice.call (argumentos): valor;
					if (! (--remaining)) {
						master.resolveWith (resolveContexts, resolveValues);
					}
				};
			};

		// Los argumentos simples y vacíos se adoptan como Promise.resolve
		if (restante <= 1) {
			adoptValue (singleValue, master.done (updateFunc (i)) .resolve, master.reject,
				!restante );

			// Use .then () para desplegar objetos secundarios secundarios (consulte gh-3000)
			if (master.state () === "pending" ||
				isFunction (resolveValues ​​[i] && resolveValues ​​[i] .then)) {

				return master.then ();
			}
		}

		// Se agregan varios argumentos como Promise.all array elements
		mientras yo-- ) {
			adoptValue (resolveValues ​​[i], updateFunc (i), master.reject);
		}

		return master.promise ();
	}
});


// Estos generalmente indican un error del programador durante el desarrollo,
// advertir sobre ellos lo antes posible en lugar de tragarlos por defecto.
var rerrorNames = / ^ (Eval | Internal | Range | Reference | Syntax | Type | URI) Error $ /;

jQuery.Deferred.exceptionHook = function (error, stack) {

	// Soporte: IE 8 - 9 solamente
	// La consola existe cuando las herramientas de desarrollo están abiertas, lo que puede suceder en cualquier momento
	if (window.console && window.console.warn && error && rerrorNames.test (error.name)) {
		window.console.warn ("excepción jQuery.Deferred:" + error.message, error.stack, stack);
	}
};




jQuery.readyException = function (error) {
	window.setTimeout (function () {
		lanzar error;
	});
};




// El diferido utilizado en DOM listo
var readyList = jQuery.Deferred ();

jQuery.fn.ready = function (fn) {

	ReadyList
		.then (fn)

		// Ajustar jQuery.readyException en una función para que la búsqueda
		// ocurre en el momento del manejo del error en lugar de la devolución de llamada
		// registro.
		.catch (función (error) {
			jQuery.readyException (error);
		});

	devuelve esto;
};

jQuery.extend ({

	// ¿El DOM está listo para ser utilizado? Establezca en verdadero una vez que ocurre.
	isReady: falso,

	// Un contador para rastrear cuántos artículos esperar antes
	// el evento listo se dispara. Ver # 6781
	ReadyWait: 1,

	// Manejar cuando el DOM está listo
	listo: función (espera) {

		// Abortar si hay retenciones pendientes o ya estamos listas
		if (wait === true? --jQuery.readyWait: jQuery.isReady) {
			regreso;
		}

		// Recuerda que el DOM está listo
		jQuery.isReady = verdadero;

		// Si un evento DOM Ready normal se dispara, disminuye y espera si es necesario
		if (wait! == true && --jQuery.readyWait> 0) {
			regreso;
		}

		// Si hay funciones enlazadas, ejecutar
		readyList.resolveWith (document, [jQuery]);
	}
});

jQuery.ready.then = readyList.then;

// El controlador de eventos listos y el método de auto limpieza
función completada () {
	document.removeEventListener ("DOMContentLoaded", completado);
	window.removeEventListener ("carga", completado);
	jQuery.ready ();
}

// Casos de captura donde se llama $ (document) .ready ()
// después de que el evento del navegador ya haya ocurrido.
// Soporte: IE <= 9 - 10 solamente
// El IE más antiguo a veces señala "interactivo" demasiado pronto
if (document.readyState === "complete" ||
	(document.readyState! == "cargando" &&! document.documentElement.doScroll)) {

	// Manejarlo de forma asíncrona para permitir que las secuencias de comandos tengan la oportunidad de retrasar listas
	window.setTimeout (jQuery.ready);

} else {

	// Usa la práctica devolución de llamada del evento
	document.addEventListener ("DOMContentLoaded", completado);

	// Una alternativa a window.onload, que siempre funcionará
	window.addEventListener ("carga", completado);
}




// Método multifuncional para obtener y establecer valores de una colección
// Los valores / s se pueden ejecutar opcionalmente si se trata de una función
var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
	var i = 0,
		len = elems.length,
		bulk = clave == nulo;

	// Establece muchos valores
	if (toType (key) === "object") {
		chainable = verdadero;
		para (yo en clave) {
			acceso (elems, fn, i, clave [i], true, emptyGet, raw);
		}

	// Establece un valor
	} else if (value! == undefined) {
		chainable = verdadero;

		if (! isFunction (value)) {
			raw = verdadero;
		}

		if (bulk) {

			// Las operaciones masivas se ejecutan contra todo el conjunto
			if (raw) {
				fn.call (elems, valor);
				fn = nulo;

			// ... excepto cuando se ejecutan valores de funciones
			} else {
				bulk = fn;
				fn = función (elem, clave, valor) {
					return bulk.call (jQuery (elem), valor);
				};
			}
		}

		if (fn) {
			para (; i <len; i ++) {
				fn (
					elems [i], clave, sin procesar?
					valor:
					value.call (elems [i], i, fn (elems [i], clave))
				);
			}
		}
	}

	if (encadenable) {
		devolver los elems;
	}

	// Obtiene
	if (bulk) {
		devolver fn.call (elems);
	}

	devolver len? fn (elems [0], tecla): emptyGet;
};


// Coincide con la cadena punteada para camelizar
var rmsPrefix = / ^ - ms- /,
	rdashAlpha = / - ([az]) / g;

// Utilizado por camelCase como devolución de llamada para reemplazar ()
función fcamelCase (todo, letra) {
	return letter.toUpperCase ();
}

// Convertir guiones a camelCase; utilizado por el css y los módulos de datos
// Soporte: IE <= 9 - 11, Edge 12 - 15
// Microsoft olvidó aumentar su prefijo de proveedor (# 9572)
function camelCase (cadena) {
	return string.replace (rmsPrefix, "ms-") .replace (rdashAlpha, fcamelCase);
}
var acceptData = function (owner) {

	// Solo acepta:
	// - Nodo
	// - Node.ELEMENT_NODE
	// - Node.DOCUMENT_NODE
	// - Objeto
	// - Alguna
	return owner.nodeType === 1 || owner.nodeType === 9 || ! (+ owner.nodeType);
};




Datos de la función () {
	this.expando = jQuery.expando + Data.uid ++;
}

Data.uid = 1;

Data.prototype = {

	caché: función (propietario) {

		// Verifica si el objeto propietario ya tiene un caché
		var value = owner [this.expando];

		// Si no, crea uno
		if (! value) {
			value = {};

			// Podemos aceptar datos para nodos sin elementos en los navegadores modernos,
			// pero no deberíamos, ver # 8335.
			// Siempre devuelve un objeto vacío.
			if (acceptData (owner)) {

				// Si es un nodo poco probable que se escriba o se buclee
				// usar asignación simple
				if (owner.nodeType) {
					owner [this.expando] = valor;

				// De lo contrario, asegúrelo en una propiedad no enumerable
				// configurable debe ser verdadero para permitir que la propiedad sea
				// eliminado cuando se eliminan los datos
				} else {
					Object.defineProperty (owner, this.expando, {
						valor: valor,
						configurable: verdadero
					});
				}
			}
		}

		valor de retorno;
	},
	conjunto: función (propietario, datos, valor) {
		var prop,
			cache = this.cache (propietario);

		// Handle: [propietario, clave, valor] args
		// Siempre use la clave camelCase (gh-2257)
		if (tipo de datos === "cadena") {
			caché [camelCase (data)] = value;

		// Handle: [owner, {properties}] args
		} else {

			// Copie las propiedades una por una en el objeto de caché
			para (prop en data) {
				caché [camelCase (prop)] = data [prop];
			}
		}
		caché de retorno;
	},
	get: function (propietario, clave) {
		tecla de retorno === indefinido?
			this.cache (propietario):

			// Siempre use la clave camelCase (gh-2257)
			owner [this.expando] && owner [this.expando] [camelCase (clave)];
	},
	acceso: función (propietario, clave, valor) {

		// En casos donde:
		//
		// 1. No se especificó ninguna clave
		// 2. Se especificó una clave de cadena, pero no se proporcionó ningún valor
		//
		// Toma la ruta de "lectura" y permite que el método get determine
		// qué valor devolver, respectivamente:
		//
		// 1. Todo el objeto de caché
		// 2. Los datos almacenados en la clave
		//
		if (clave === indefinido ||
				((tecla && typeof key === "cadena") && value === undefined)) {

			devuelve this.get (propietario, clave);
		}

		// Cuando la clave no es una cadena, o ambas son claves y valores
		// se especifican, establecen o extienden (objetos existentes) con:
		//
		// 1. Un objeto de propiedades
		// 2. Una clave y valor
		//
		this.set (propietario, clave, valor);

		// Dado que la ruta "set" puede tener dos posibles puntos de entrada
		// devuelve los datos esperados en función de la ruta que se tomó [*]
		valor de retorno! == indefinido? valor: clave;
	},
	remove: function (propietario, clave) {
		var i,
			cache = owner [this.expando];

		if (cache === undefined) {
			regreso;
		}

		if (key! == undefined) {

			// Soporte de matriz separada por espacio o cadena de claves
			if (Array.isArray (clave)) {

				// Si la clave es una matriz de teclas ...
				// Siempre configuramos las claves camelCase, así que quítelo.
				key = key.map (camelCase);
			} else {
				key = camelCase (clave);

				// Si existe una clave con espacios, úselo.
				// De lo contrario, cree una matriz haciendo coincidir espacios que no sean en blanco
				clave = clave en la memoria caché?
					[ llave ] :
					(key.match (rnothtmlwhite) || []);
			}

			i = key.length;

			mientras yo-- ) {
				eliminar caché [tecla [i]];
			}
		}

		// Eliminar el expando si no hay más datos
		if (clave === undefined || jQuery.isEmptyObject (cache)) {

			// Soporte: Chrome <= 35 - 45
			// El rendimiento de Webkit y Blink sufre al eliminar propiedades
			// desde los nodos DOM, por lo que se establece en indefinido en su lugar
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (error restringido)
			if (owner.nodeType) {
				owner [this.expando] = undefined;
			} else {
				eliminar propietario [this.expando];
			}
		}
	},
	hasData: function (owner) {
		var cache = owner [this.expando];
		return cache! == undefined &&! jQuery.isEmptyObject (cache);
	}
};
var dataPriv = new Data ();

var dataUser = new Data ();



// Resumen de implementación
//
// 1. Aplicar compatibilidad de superficie y semántica API con la rama 1.9.x.
// 2. Mejorar la capacidad de mantenimiento del módulo reduciendo el almacenamiento
// rutas a un solo mecanismo.
// 3. Utilice el mismo mecanismo único para admitir datos "privados" y de "usuario".
// 4. _Nunca_ exponer datos "privados" al código de usuario (TODO: Drop _data, _removeData)
// 5. Evite exponer detalles de implementación en objetos de usuario (por ejemplo, propiedades de expansión)
// 6. Proporcionar una ruta clara para la actualización de implementación a WeakMap en 2014

var rbrace = / ^ (?: \ {[\ w \ W] * \} | \ [[\ w \ W] * \]) $ /,
	rmultiDash = / [AZ] / g;

función getData (datos) {
	if (data === "true") {
		devolver verdadero;
	}

	if (data === "false") {
		falso retorno;
	}

	if (data === "null") {
		devolver nulo;
	}

	// Solo convierte a un número si no cambia la cadena
	if (data === + data + "") {
		retorno + datos;
	}

	if (rbrace.test (data)) {
		devuelve JSON.parse (datos);
	}

	datos de retorno;
}

function dataAttr (elem, key, data) {
	var nombre;

	// Si no se encontró nada internamente, intente buscar cualquier
	// datos del atributo data- * HTML5
	if (data === undefined && elem.nodeType === 1) {
		name = "data-" + key.replace (rmultiDash, "- $ &") .toLowerCase ();
		data = elem.getAttribute (nombre);

		if (tipo de datos === "cadena") {
			tratar {
				data = getData (datos);
			} catch (e) {}

			// Asegúrate de configurar los datos para que no se modifiquen más tarde
			dataUser.set (elem, clave, datos);
		} else {
			datos = indefinido;
		}
	}
	datos de retorno;
}

jQuery.extend ({
	hasData: function (elem) {
		return dataUser.hasData (elem) || dataPriv.hasData (elem);
	},

	datos: función (elem, nombre, datos) {
		return dataUser.access (elem, name, data);
	},

	removeData: function (elem, name) {
		dataUser.remove (elem, nombre);
	},

	// TODO: Ahora que todas las llamadas a _data y _removeData han sido reemplazadas
	// con llamadas directas a los métodos de dataPriv, estos pueden ser obsoletos.
	_data: function (elem, name, data) {
		return dataPriv.access (elem, name, data);
	},

	_removeData: function (elem, name) {
		dataPriv.remove (elem, nombre);
	}
});

jQuery.fn.extend ({
	datos: función (clave, valor) {
		var i, name, data,
			elem = this [0],
			attrs = elem && elem.attributes;

		// Obtiene todos los valores
		if (clave === undefined) {
			if (this.length) {
				data = dataUser.get (elem);

				if (elem.nodeType === 1 &&! dataPriv.get (elem, "hasDataAttrs")) {
					i = attrs.length;
					mientras yo-- ) {

						// Soporte: solo IE 11
						// Los elementos attrs pueden ser nulos (# 14894)
						if (attrs [i]) {
							name = attrs [i] .name;
							if (name.indexOf ("data-") === 0) {
								name = camelCase (name.slice (5));
								dataAttr (elem, nombre, datos [nombre]);
							}
						}
					}
					dataPriv.set (elem, "hasDataAttrs", verdadero);
				}
			}

			datos de retorno;
		}

		// Establece valores múltiples
		if (tipo de clave === "objeto") {
			return this.each (function () {
				dataUser.set (this, key);
			});
		}

		acceso de retorno (esto, función (valor) {
			var datos;

			// El objeto jQuery llamante (elemento coincide) no está vacío
			// (y por lo tanto tiene un elemento aparece en este [0]) y el
			// el parámetro `valor` no estaba indefinido. Un objeto jQuery vacío
			// dará como resultado `undefined` para elem = this [0] que lo hará
			// lanza una excepción si se hace un intento de leer un caché de datos.
			if (elem && value === undefined) {

				// Intenta obtener datos del caché
				// La clave siempre estará camelCased en Data
				data = dataUser.get (elem, key);
				if (data! == undefined) {
					datos de retorno;
				}

				// Intento de "descubrir" los datos en
				// datos personalizados HTML5- * attrs
				data = dataAttr (elem, key);
				if (data! == undefined) {
					datos de retorno;
				}

				// Intentamos muy duro, pero los datos no existen.
				regreso;
			}

			// Establecer los datos ...
			this.each (function () {

				// Siempre almacenamos la clave camelCased
				dataUser.set (this, key, value);
			});
		}, null, value, arguments.length> 1, null, true);
	},

	removeData: function (clave) {
		return this.each (function () {
			dataUser.remove (this, key);
		});
	}
});


jQuery.extend ({
	queue: function (elem, type, data) {
		var queue;

		if (elem) {
			tipo = (tipo || "fx") + "cola";
			queue = dataPriv.get (elem, type);

			// Aumenta la velocidad de dequeue saliendo rápidamente si esto es solo una búsqueda
			if (datos) {
				if (! queue || Array.isArray (data)) {
					queue = dataPriv.access (elem, type, jQuery.makeArray (data));
				} else {
					queue.push (datos);
				}
			}
			cola de retorno || [];
		}
	},

	dequeue: function (elem, type) {
		tipo = tipo || "fx";

		var queue = jQuery.queue (elem, type),
			startLength = queue.length,
			fn = queue.shift (),
			hooks = jQuery._queueHooks (elem, type),
			siguiente = función () {
				jQuery.dequeue (elem, tipo);
			};

		// Si la cola fx está eliminada, siempre elimine el progreso sentinel
		if (fn === "en progreso") {
			fn = queue.shift ();
			startLength--;
		}

		if (fn) {

			// Agregar un control de progreso para evitar que la cola fx sea
			// dequeued automáticamente
			if (tipo === "fx") {
				queue.unshift ("en progreso");
			}

			// Borrar la última función de detención de cola
			eliminar hooks.stop;
			fn.call (elem, siguiente, ganchos);
		}

		if (! startLength && hooks) {
			hooks.empty.fire ();
		}
	},

	// No público: genera un objeto queueHooks o devuelve el actual
	_queueHooks: function (elem, type) {
		var clave = tipo + "queueHooks";
		return dataPriv.get (elem, key) || dataPriv.access (elem, key, {
			empty: jQuery.Callbacks ("una vez memoria") .add (función () {
				dataPriv.remove (elem, [type + "queue", clave]);
			})
		});
	}
});

jQuery.fn.extend ({
	cola: función (tipo, datos) {
		var setter = 2;

		if (tipo de tipo! == "cadena") {
			datos = tipo;
			type = "fx";
			setter--;
		}

		if (arguments.length <setter) {
			return jQuery.queue (this [0], type);
		}

		devolver datos === undefined?
			esta :
			this.each (function () {
				var queue = jQuery.queue (this, type, data);

				// Asegurar un gancho para esta cola
				jQuery._queueHooks (esto, tipo);

				if (escribe === "fx" && queue [0]! == "inprogress") {
					jQuery.dequeue (esto, tipo);
				}
			});
	},
	dequeue: function (type) {
		return this.each (function () {
			jQuery.dequeue (esto, tipo);
		});
	},
	clearQueue: function (type) {
		devuelve this.queue (tipo || "fx", []);
	},

	// Obtener una promesa resuelta cuando las colas de un cierto tipo
	// se vacían (fx es el tipo por defecto)
	promesa: función (tipo, obj) {
		var tmp,
			recuento = 1,
			defer = jQuery.Deferred (),
			elementos = esto,
			i = this.length,
			resolve = function () {
				if (! (--count)) {
					defer.resolveWith (elementos, [elementos]);
				}
			};

		if (tipo de tipo! == "cadena") {
			obj = tipo;
			tipo = indefinido;
		}
		tipo = tipo || "fx";

		mientras yo-- ) {
			tmp = dataPriv.get (elementos [i], tipo + "queueHooks");
			if (tmp && tmp.empty) {
				contar ++;
				tmp.empty.add (resolver);
			}
		}
		resolver();
		return defer.promise (obj);
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/) .source;

var rcssNum = new RegExp ("^ (?: ([+ -]) = |) (" + pnum + ") ([az%] *) $", "i");


var cssExpand = ["Superior", "Derecho", "Inferior", "Izquierda"];

var isHiddenWithinTree = function (elem, el) {

		// isHiddenWithinTree podría ser llamado desde jQuery # filter function;
		// en ese caso, el elemento será el segundo argumento
		elem = el || elem;

		// El estilo en línea triunfa sobre todos
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// De lo contrario, verifique el estilo calculado
			// Soporte: Firefox <= 43 - 45
			// Los elementos desconectados pueden tener una visualización calculada: ninguno, así que primero confirma que elem es
			// en el documento.
			jQuery.contains (elem.ownerDocument, elem) &&

			jQuery.css (elem, "mostrar") === "ninguno";
	};

var swap = function (elem, options, callback, args) {
	var ret, nombre,
		viejo = {};

	// Recordar los valores anteriores e insertar los nuevos
	para (nombre en opciones) {
		old [name] = elem.style [nombre];
		elem.style [nombre] = opciones [nombre];
	}

	ret = callback.apply (elem, args || []);

	// Revertir los valores anteriores
	para (nombre en opciones) {
		elem.style [nombre] = viejo [nombre];
	}

	return ret;
};




función adjustCSS (elem, prop, valueParts, interpolación) {
	var ajustado, escala,
		maxIterations = 20,
		currentValue = interpolación?
			function () {
				return tween.cur ();
			}:
			function () {
				return jQuery.css (elem, prop, "");
			},
		initial = currentValue (),
		unit = valueParts && valueParts [3] || (jQuery.cssNumber [prop]? "": "px"),

		// Se requiere cálculo del valor inicial para posibles desajustes de unidades
		initialInUnit = (jQuery.cssNumber [prop] || unit! == "px" && + initial) &&
			rcssNum.exec (jQuery.css (elem, prop));

	if (initialInUnit && initialInUnit [3]! == unidad) {

		// Soporte: Firefox <= 54
		// Reducir a la mitad el valor del objetivo de iteración para evitar la interferencia de los límites superiores del CSS (gh-2144)
		inicial = inicial / 2;

		// Unidades de confianza informadas por jQuery.css
		unidad = unidad || initialInUnit [3];

		// Aproximación iterativa desde un punto de partida distinto de cero
		initialInUnit = + initial || 1;

		while (maxIterations--) {

			// Evaluamos y actualizamos nuestra mejor estimación (duplicando las suposiciones de cero).
			// Finaliza si la escala es igual o cruza 1 (lo que hace que el antiguo * producto nuevo sea no positivo).
			jQuery.style (elem, prop, initialInUnit + unit);
			if ((1 escala) * (1 - (escala = currentValue () / initial || 0.5)) <= 0) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style (elem, prop, initialInUnit + unit);

		// Asegúrate de actualizar las propiedades de interpolación más tarde
		valueParts = valueParts || [];
	}

	if (valueParts) {
		initialInUnit = + initialInUnit || + inicial || 0;

		// Aplicar desplazamiento relativo (+ = / - =) si se especifica
		ajustado = valorParts [1]?
			initialInUnit + (valueParts [1] + 1) * valueParts [2]:
			+ ValueParts [2];
		if (tween) {
			tween.unit = unidad;
			tween.start = initialInUnit;
			tween.end = ajustado;
		}
	}
	retorno ajustado;
}


var defaultDisplayMap = {};

función getDefaultDisplay (elem) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap [nodeName];

	if (pantalla) {
		pantalla de retorno;
	}

	temp = doc.body.appendChild (doc.createElement (nodeName));
	display = jQuery.css (temp, "display");

	temp.parentNode.removeChild (temp);

	if (mostrar === "ninguno") {
		display = "bloque";
	}
	defaultDisplayMap [nodeName] = visualización;

	pantalla de retorno;
}

función showHide (elementos, mostrar) {
	var display, elem,
		valores = [],
		índice = 0,
		longitud = elementos.length;

	// Determine el nuevo valor de visualización para los elementos que necesitan cambiar
	for (; index <length; index ++) {
		elem = elementos [índice];
		if (! elem.style) {
			continuar;
		}

		display = elem.style.display;
		if (mostrar) {

			// Debido a que forzamos la visibilidad sobre elementos ocultos en cascada, una acción inmediata (y lenta)
			// se requiere verificación en este primer ciclo a menos que tengamos un valor de visualización no vacío (cualquiera
			// en línea o en proceso de restauración)
			if (mostrar === "ninguno") {
				values ​​[index] = dataPriv.get (elem, "display") || nulo;
				if (! values ​​[index]) {
					elem.style.display = "";
				}
			}
			if (elem.style.display === "" && isHiddenWithinTree (elem)) {
				values ​​[index] = getDefaultDisplay (elem);
			}
		} else {
			if (display! == "ninguno") {
				valores [índice] = "ninguno";

				// Recuerda lo que estamos sobrescribiendo
				dataPriv.set (elem, "display", display);
			}
		}
	}

	// Establece la visualización de los elementos en un segundo ciclo para evitar el reflujo constante
	for (index = 0; index <length; index ++) {
		if (valores [índice]! = null) {
			elementos [índice] .style.display = valores [índice];
		}
	}

	elementos de retorno;
}

jQuery.fn.extend ({
	show: function () {
		return showHide (esto, verdadero);
	},
	hide: function () {
		return showHide (esto);
	},
	alternar: función (estado) {
		if (tipo de estado === "booleano") {
			estado de retorno? this.show (): this.hide ();
		}

		return this.each (function () {
			if (isHiddenWithinTree (this)) {
				jQuery (esto) .show ();
			} else {
				jQuery (this) .hide ();
			}
		});
	}
});
var rcheckableType = (/ ^ (?: checkbox | radio) $ / i);

var rtagName = (/ <([az] [^ \ / \ 0> \ x20 \ t \ r \ n \ f] +) / i);

var rscriptType = (/ ^ $ | ^ module $ | \ / (?: java | ecma) script / i);



// Tenemos que cerrar estas etiquetas para admitir XHTML (# 13200)
var wrapMap = {

	// Soporte: IE <= 9 solamente
	opción: [1, "<seleccionar múltiple = 'múltiple'>", "</ seleccionar>"],

	// Los analizadores XHTML no insertan mágicamente elementos en el
	// del mismo modo que lo hacen los analizadores de sopa de etiquetas. Entonces no podemos acortar
	// esto omitiendo <tbody> u otros elementos requeridos.
	thead: [1, "<table>", "</ table>"],
	col: [2, "<table> <colgroup>", "</ colgroup> </ table>"],
	tr: [2, "<table> <tbody>", "</ tbody> </ table>"],
	td: [3, "<table> <tbody> <tr>", "</ tr> </ tbody> </ table>"],

	_default: [0, "", ""]
};

// Soporte: IE <= 9 solamente
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll (context, tag) {

	// Soporte: IE <= 9 - 11 solamente
	// Utiliza typeof para evitar la invocación del método zero-argument en objetos host (# 15151)
	var ret;

	if (typeof context.getElementsByTagName! == "undefined") {
		ret = context.getElementsByTagName (tag || "*");

	} else if (typeof context.querySelectorAll! == "undefined") {
		ret = context.querySelectorAll (tag || "*");

	} else {
		ret = [];
	}

	if (tag === undefined || tag && nodeName (context, tag)) {
		return jQuery.merge ([context], ret);
	}

	return ret;
}


// Marcar los scripts como que ya han sido evaluados
function setGlobalEval (elems, refElements) {
	var i = 0,
		l = elems.length;

	para (; i <l; i ++) {
		dataPriv.set (
			elems [i],
			"globalEval",
			! refElements || dataPriv.get (refElements [i], "globalEval")
		);
	}
}


var rhtml = / <| & #? \ w +; /;

function buildFragment (elems, context, scripts, selection, ignored) {
	var elem, tmp, tag, wrap, contiene, j,
		fragment = context.createDocumentFragment (),
		nodes = [],
		i = 0,
		l = elems.length;

	para (; i <l; i ++) {
		elem = elems [i];

		if (elem || elem === 0) {

			// Añadir nodos directamente
			if (toType (elem) === "object") {

				// Soporte: Android <= 4.0 solamente, solo PhantomJS 1
				// push.apply (_, arraylike) se lanza en el antiguo WebKit
				jQuery.merge (nodos, elem.nodeType? [elem]: elem);

			// Convierte no-html en un nodo de texto
			} else if (! rhtml.test (elem)) {
				nodes.push (context.createTextNode (elem));

			// Convierte html en nodos DOM
			} else {
				tmp = tmp || fragment.appendChild (context.createElement ("div"));

				// Deserializar una representación estándar
				tag = (rtagName.exec (elem) || ["", ""]) [1] .toLowerCase ();
				wrap = wrapMap [tag] || wrapMap._default;
				tmp.innerHTML = wrap [1] + jQuery.htmlPrefilter (elem) + wrap [2];

				// Desciende a través de envoltorios al contenido correcto
				j = wrap [0];
				while (j--) {
					tmp = tmp.lastChild;
				}

				// Soporte: Android <= 4.0 solamente, solo PhantomJS 1
				// push.apply (_, arraylike) se lanza en el antiguo WebKit
				jQuery.merge (nodos, tmp.childNodes);

				// Recuerda el contenedor de nivel superior
				tmp = fragment.firstChild;

				// Asegurar que los nodos creados estén huérfanos (# 12392)
				tmp.textContent = "";
			}
		}
	}

	// Eliminar envoltorio del fragmento
	fragment.textContent = "";

	i = 0;
	while ((elem = nodes [i ++])) {

		// Omita los elementos que ya están en la colección de contexto (trac-4087)
		if (selección && jQuery.inArray (elem, selección)> -1) {
			if (ignorado) {
				ignored.push (elem);
			}
			continuar;
		}

		contains = jQuery.contains (elem.ownerDocument, elem);

		// Agregar a fragmento
		tmp = getAll (fragment.appendChild (elem), "script");

		// Conservar el historial de evaluación de guiones
		if (contiene) {
			setGlobalEval (tmp);
		}

		// Capturar ejecutables
		if (scripts) {
			j = 0;
			while ((elem = tmp [j ++])) {
				if (rscriptType.test (elem.type || "")) {
					scripts.push (elem);
				}
			}
		}
	}

	fragmento de retorno;
}


(función () {
	var fragmento = document.createDocumentFragment (),
		div = fragment.appendChild (document.createElement ("div")),
		input = document.createElement ("entrada");

	// Soporte: Android 4.0 - 4.3 solamente
	// Comprobar estado perdido si el nombre está configurado (# 11217)
	// Soporte: Windows Web Apps (WWA)
	// `name` y` type` deben usar .setAttribute para WWA (# 14901)
	input.setAttribute ("tipo", "radio");
	input.setAttribute ("checked", "checked");
	input.setAttribute ("nombre", "t");

	div.appendChild (entrada);

	// Soporte: Android <= 4.1 solamente
	// WebKit anterior no clona el estado verificado correctamente en fragmentos
	support.checkClone = div.cloneNode (true) .cloneNode (true) .lastChild.checked;

	// Soporte: IE <= 11 solamente
	// Asegúrate de que textarea (y checkbox) defaultValue esté clonado correctamente
	div.innerHTML = "<textarea> x </ textarea>";
	support.noCloneChecked = !! div.cloneNode (true) .lastChild.defaultValue;
}) ();
var documentElement = document.documentElement;



var
	rkeyEvent = / ^ clave /,
	rmouseEvent = / ^ (?: mouse | puntero | contextmenu | drag | drop) | click /,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue () {
	devolver verdadero;
}

function returnFalse () {
	falso retorno;
}

// Soporte: IE <= 9 solamente
// Ver # 13393 para más información
function safeActiveElement () {
	tratar {
		return document.activeElement;
	} catch (err) {}
}

function on (elem, types, selector, data, fn, one) {
	var origFn, type;

	// Los tipos pueden ser un mapa de tipos / manejadores
	if (tipo de tipos === "objeto") {

		// (tipos-Objeto, selector, datos)
		if (typeof selector! == "cadena") {

			// (tipos-Objeto, datos)
			datos = datos || selector;
			selector = indefinido;
		}
		para (escriba los tipos) {
			encendido (elem, tipo, selector, datos, tipos [tipo], uno);
		}
		regreso elem;
	}

	if (data == null && fn == null) {

		// (tipos, fn)
		fn = selector;
		data = selector = undefined;
	} else if (fn == null) {
		if (typeof selector === "cadena") {

			// (tipos, selector, fn)
			fn = datos;
			datos = indefinido;
		} else {

			// (tipos, datos, fn)
			fn = datos;
			data = selector;
			selector = indefinido;
		}
	}
	if (fn === falso) {
		fn = returnFalse;
	} else if (! fn) {
		regreso elem;
	}

	if (one === 1) {
		origFn = fn;
		fn = función (evento) {

			// Puede usar un conjunto vacío, ya que el evento contiene la información
			jQuery (). off (evento);
			return origFn.apply (esto, argumentos);
		};

		// Usa el mismo guid para que la persona que llama pueda eliminar usando origFn
		fn.guid = origFn.guid || (origFn.guid = jQuery.guid ++);
	}
	return elem.each (function () {
		jQuery.event.add (this, types, fn, data, selector);
	});
}

/ *
 * Funciones de ayuda para la gestión de eventos, no parte de la interfaz pública.
 * Apoyos a la biblioteca addEvent de Dean Edwards para muchas de las ideas.
 * /
jQuery.event = {

	global: {},

	agregar: función (elem, tipos, manejador, datos, selector) {

		var handleObjIn, eventHandle, tmp,
			eventos, t, handleObj,
			especiales, manejadores, tipo, espacios de nombres, origType,
			elemData = dataPriv.get (elem);

		// No adjunte eventos a noData ni a los nodos de texto / comentario (pero permita objetos simples)
		if (! elemData) {
			regreso;
		}

		// La persona que llama puede pasar un objeto de datos personalizados en lugar del manejador
		if ( handler.handler) {
			handleObjIn = controlador;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Asegurarse de que los selectores no válidos emitan excepciones en el momento de la conexión
		// Evalúa contra documentElement en caso de que elem sea un nodo que no sea un elemento (p. Ej., Documento)
		if (selector) {
			jQuery.find.matchesSelector (documentElement, selector);
		}

		// Asegúrate de que el controlador tenga una ID única, utilizada para buscarla / eliminarla más tarde
		if (! handler.guid) {
			handler.guid = jQuery.guid ++;
		}

		// Inicia la estructura de eventos del elemento y el controlador principal, si esta es la primera
		if (! (events = elemData.events)) {
			events = elemData.events = {};
		}
		if (! (eventHandle = elemData.handle)) {
			eventHandle = elemData.handle = function (e) {

				// Descartar el segundo evento de jQuery.event.trigger () y
				// cuando se invoca un evento después de que una página se descargó
				return typeof jQuery! == "undefined" && jQuery.event.triggered! == e.type?
					jQuery.event.dispatch.apply (elem, arguments): undefined;
			};
		}

		// Manejar múltiples eventos separados por un espacio
		types = (types || "") .match (rnothtmlwhite) || [""];
		t = tipos.length;
		while (t--) {
			tmp = rtypenamespace.exec (tipos [t]) || [];
			type = origType = tmp [1];
			espacios de nombres = (tmp [2] || "") .split (".") .sort ();

			// There * must * debe ser un tipo, no adjuntar controladores de espacio de nombres solo
			if (! type) {
				continuar;
			}

			// Si el evento cambia su tipo, use los manejadores de eventos especiales para el tipo cambiado
			especial = jQuery.event.special [tipo] || {};

			// Si el selector está definido, determine el tipo de api de evento especial; de lo contrario, indique el tipo
			type = (selector? special.delegateType: special.bindType) || tipo;

			// Actualización especial basada en el tipo de reinicio reciente
			especial = jQuery.event.special [tipo] || {};

			// handleObj se pasa a todos los controladores de eventos
			handleObj = jQuery.extend ({
				tipo: tipo,
				origType: origType,
				datos: datos,
				controlador: controlador,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test (selector),
				namespace: namespaces.join (".")
			}, handleObjIn);

			// Inicia la cola del controlador de eventos si somos los primeros
			if (! (handlers = eventos [tipo])) {
				manejadores = eventos [tipo] = [];
				handlers.delegateCount = 0;

				// Solo use addEventListener si el manejador de eventos especiales devuelve falso
				if (! special.setup ||
					special.setup.call (elem, data, namespaces, eventHandle) === false) {

					if (elem.addEventListener) {
						elem.addEventListener (type, eventHandle);
					}
				}
			}

			if (special.add) {
				special.add.call (elem, handleObj);

				if (! handleObj.handler.guid) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Agregar a la lista de controladores del elemento, delega delante
			if (selector) {
				handlers.splice (handlers.delegateCount ++, 0, handleObj);
			} else {
				handlers.push (handleObj);
			}

			// Mantenga un registro de los eventos que alguna vez se han utilizado, para la optimización de eventos
			jQuery.event.global [type] = true;
		}

	},

	// Separar un evento o conjunto de eventos de un elemento
	remove: function (elem, types, handler, selector, mappedTypes) {

		var j, origCount, tmp,
			eventos, t, handleObj,
			especiales, manejadores, tipo, espacios de nombres, origType,
			elemData = dataPriv.hasData (elem) && dataPriv.get (elem);

		if (! elemData ||! (events = elemData.events)) {
			regreso;
		}

		// Una vez para cada tipo. Namespace en types; tipo puede ser omitido
		types = (types || "") .match (rnothtmlwhite) || [""];
		t = tipos.length;
		while (t--) {
			tmp = rtypenamespace.exec (tipos [t]) || [];
			type = origType = tmp [1];
			espacios de nombres = (tmp [2] || "") .split (".") .sort ();

			// Desvincular todos los eventos (en este espacio de nombres, si se proporciona) para el elemento
			if (! type) {
				para (escriba eventos) {
					jQuery.event.remove (elem, type + types [t], handler, selector, true);
				}
				continuar;
			}

			especial = jQuery.event.special [tipo] || {};
			type = (selector? special.delegateType: special.bindType) || tipo;
			handlers = eventos [tipo] || [];
			tmp = tmp [2] &&
				nuevo RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\. |)") + "(\\. | $)");

			// Eliminar eventos coincidentes
			origCount = j = handlers.length;
			while (j--) {
				handleObj = controladores [j];

				if ((mappedTypes || origType === handleObj.origType) &&
					(! handler || handler.guid === handleObj.guid) &&
					(! tmp || tmp.test (handleObj.namespace)) &&
					(! selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector)) {
					handlers.splice (j, 1);

					if (handleObj.selector) {
						handlers.delegateCount--;
					}
					if (special.remove) {
						special.remove.call (elem, handleObj);
					}
				}
			}

			// Eliminar el controlador genérico de eventos si eliminamos algo y no existen más controladores
			// (evita el potencial de recursión sin fin durante la eliminación de manejadores de eventos especiales)
			if (origCount &&! handlers.length) {
				if (! special.teardown ||
					special.teardown.call (elem, namespaces, elemData.handle) === false) {

					jQuery.removeEvent (elem, type, elemData.handle);
				}

				eliminar eventos [tipo];
			}
		}

		// Eliminar datos y expandir si ya no se usa
		if (jQuery.isEmptyObject (events)) {
			dataPriv.remove (elem, "manejar eventos");
		}
	},

	dispatch: function (nativeEvent) {

		// Hacer un jQuery.Event escribible desde el objeto de evento nativo
		var event = jQuery.event.fix (nativeEvent);

		var i, j, ret, emparejado, handleObj, handlerQueue,
			args = new Array (arguments.length),
			manejadores = (dataPriv.get (this, "events") || {}) [event.type] || [],
			special = jQuery.event.special [event.type] || {};

		// Utiliza el jQuery.Event corregido en lugar del evento nativo (solo lectura)
		args [0] = evento;

		para (i = 1; i <arguments.length; i ++) {
			args [i] = argumentos [i];
		}

		event.delegateTarget = this;

		// Llamar al anzuelo preDispatch para el tipo mapeado, y dejarlo fianza si lo desea
		if (special.preDispatch && special.preDispatch.call (this, event) === false) {
			regreso;
		}

		// Determinar manejadores
		handlerQueue = jQuery.event.handlers.call (this, event, handlers);

		// Ejecutar delegados primero; es posible que quieran detener la propagación debajo de nosotros
		i = 0;
		while ((matched = handlerQueue [i ++]) &&! event.isPropagationStopped ()) {
			event.currentTarget = matched.elem;

			j = 0;
			while ((handleObj = matching.handlers [j ++]) &&
				! event.isImmediatePropagationStopped ()) {

				// El evento desencadenado debe 1) no tener espacio de nombre, o 2) tener espacio (s) de nombre
				// un subconjunto o igual a aquellos en el evento enlazado (ambos no pueden tener espacio de nombre).
				if (! event.rnamespace || event.rnamespace.test (handleObj.namespace)) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ((jQuery.event.special [handleObj.origType] || {}) .handle ||
						handleObj.handler) .apply (coincide con.elem, args);

					if (ret! == undefined) {
						if ((event.result = ret) === falso) {
							event.preventDefault ();
							event.stopPropagation ();
						}
					}
				}
			}
		}

		// Llamar al anzuelo postDispatch para el tipo mapeado
		if (special.postDispatch) {
			special.postDispatch.call (this, event);
		}

		return event.result;
	},

	handlers: function (event, handlers) {
		var i, handleObj, sel, coincide conHandlers, coincide conSelector,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Encuentra manejadores de delegados
		if (delegateCount &&

			// Soporte: IE <= 9
			// Black-hole SVG <use> árboles de instancias (trac-13180)
			cur.nodeType &&

			// Soporte: Firefox <= 42
			// Suprimir clics que violan las especificaciones que indican un botón de puntero no primario (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Soporte: solo IE 11
			// ... pero no la tecla de flecha "clics" de las entradas de radio, que pueden tener `button` -1 (gh-2343)
			! (event.type === "click" && event.button> = 1)) {

			for (; cur! == this; cur = cur.parentNode || this) {

				// No marque elementos que no sean elementos (# 13208)
				// No procesa clics en elementos desactivados (# 6911, # 8165, # 11382, # 11764)
				if (cur.nodeType === 1 &&! (event.type === "click" && cur.disabled === true)) {
					matchingHandlers = [];
					matchedSelectors = {};
					para (i = 0; i <delegateCount; i ++) {
						handleObj = manejadores [i];

						// No entre en conflicto con las propiedades Object.prototype (# 13203)
						sel = handleObj.selector + "";

						if (matchedSelectors [sel] === undefined) {
							matchedSelectors [sel] = handleObj.needsContext?
								jQuery (sel, this) .index (cur)> -1:
								jQuery.find (sel, this, null, [cur]) .length;
						}
						if (matchedSelectors [sel]) {
							matchedHandlers.push (handleObj);
						}
					}
					if (matchedHandlers.length) {
						handlerQueue.push ({elem: cur, handlers: matchedHandlers});
					}
				}
			}
		}

		// Agrega los manejadores restantes (directamente enlazados)
		cur = this;
		if (delegateCount <handlers.length) {
			handlerQueue.push ({elem: cur, handlers: handlers.slice (delegateCount)});
		}

		return handlerQueue;
	},

	addProp: function (name, hook) {
		Object.defineProperty (jQuery.Event.prototype, name, {
			enumerable: cierto,
			Configurable: cierto,

			get: isFunction (hook)?
				function () {
					if (this.originalEvent) {
							return hook (this.originalEvent);
					}
				}:
				function () {
					if (this.originalEvent) {
							return this.originalEvent [nombre];
					}
				},

			conjunto: función (valor) {
				Object.defineProperty (this, name, {
					enumerable: cierto,
					Configurable: cierto,
					escribible: cierto,
					valor: valor
				});
			}
		});
	},

	fix: function (originalEvent) {
		return originalEvent [jQuery.expando]?
			originalEvent:
			nuevo jQuery.Event (originalEvent);
	},

	especial: {
		carga: {

			// Previene los eventos disparados de image.load de bubbling a window.load
			noBubble: cierto
		},
		atención: {

			// Si es posible, active el evento nativo para que la secuencia de desenfoque / enfoque sea correcta
			trigger: function () {
				if (this! == safeActiveElement () && this.focus) {
					this.focus ();
					falso retorno;
				}
			},
			delegateType: "focusin"
		},
		desenfoque: {
			trigger: function () {
				if (this === safeActiveElement () && this.blur) {
					this.blur ();
					falso retorno;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// Para la casilla de verificación, activa el evento nativo de modo que el estado verificado sea el correcto
			trigger: function () {
				if (this.type === "checkbox" && this.click && nodeName (this, "input")) {
					this.click ();
					falso retorno;
				}
			},

			// Para coherencia entre navegadores, no dispare nativos .click () en enlaces
			_default: function (event) {
				return nodeName (event.target, "a");
			}
		},

		beforeunload: {
			postDispatch: function (event) {

				// Soporte: Firefox 20+
				// Firefox no alerta si el campo returnValue no está establecido.
				if (event.result! == undefined && event.originalEvent) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function (elem, type, handle) {

	// Este "si" es necesario para objetos simples
	if (elem.removeEventListener) {
		elem.removeEventListener (type, handle);
	}
};

jQuery.Event = function (src, props) {

	// Permitir instanciación sin la palabra clave 'nueva'
	if (! (esta instancia de jQuery.Event)) {
		return new jQuery.Event (src, props);
	}

	// Objeto de evento
	if (src && src.type) {
		this.originalEvent = src;
		this.type = src.type;

		// Los eventos que burbujean en el documento pueden haberse marcado como impedidos
		// por un controlador más abajo en el árbol; reflejar el valor correcto
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPredented === undefined &&

				// Soporte: Android <= 2.3 solamente
				src.returnValue === ¿falso?
			returnTrue:
			falso retorno;

		// Crear propiedades de destino
		// Soporte: Safari <= 6 - 7 solamente
		// Target no debe ser un nodo de texto (# 504, # 13143)
		this.target = (src.target && src.target.nodeType === 3)?
			src.target.parentNode:
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Tipo de evento
	} else {
		this.type = src;
	}

	// Poner propiedades provistas explícitamente en el objeto del evento
	if (props) {
		jQuery.extend (esto, accesorios);
	}

	// Crea una marca de tiempo si el evento entrante no tiene uno
	this.timeStamp = src && src.timeStamp || Date.now ();

	// Marcarlo como arreglado
	esto [jQuery.expando] = verdadero;
};

// jQuery.Event se basa en eventos DOM3 según lo especificado por el enlace de lenguaje ECMAScript
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: falso,

	preventDefault: function () {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if (e &&! this.isSimulated) {
			e.preventDefault ();
		}
	},
	stopPropagation: function () {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if (e &&! this.isSimulated) {
			e.stopPropagation ();
		}
	},
	stopImmediatePropagation: function () {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if (e &&! this.isSimulated) {
			e.stopImmediatePropagation ();
		}

		this.stopPropagation ();
	}
};

// Incluye todos los accesorios para eventos comunes, incluidos los accesorios específicos de KeyEvent y MouseEvent
jQuery.each ({
	altKey: cierto,
	burbujas: cierto,
	cancelable: cierto,
	changedTouches: cierto,
	ctrlKey: cierto,
	detalle: cierto,
	eventPhase: cierto,
	metaKey: verdadero,
	páginaX: cierto,
	pageY: cierto,
	shiftKey: cierto,
	vista: cierto,
	"char": cierto,
	charCode: cierto,
	clave: cierto,
	código clave: verdadero,
	botón: cierto,
	botones: cierto,
	clienteX: cierto,
	clienteY: cierto,
	offsetX: verdadero,
	offsetY: verdadero,
	punteroId: cierto,
	pointerType: verdadero,
	screenX: cierto,
	screenY: cierto,
	targetTouches: cierto,
	toElement: cierto,
	toques: cierto,

	which: function (event) {
		var button = event.button;

		// Agregar cuál para eventos clave
		if (event.which == null && rkeyEvent.test (event.type)) {
			return event.charCode! = null? event.charCode: event.keyCode;
		}

		// Agregar cuál para hacer clic: 1 === izquierda; 2 === medio; 3 === derecha
		if (! event.which && button! == undefined && rmouseEvent.test (event.type)) {
			if (button & 1) {
				return 1;
			}

			if (botón & 2) {
				devolver 3;
			}

			if (botón & 4) {
				regreso 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp);

// Crear mouseenter / leave events usando mouseover / out y event-time checks
// para que la delegación de eventos funcione en jQuery.
// Haz lo mismo para pointerenter / pointerleave y pointerover / pointerout
//
// Soporte: solo Safari 7
// Safari envía mouseenter con demasiada frecuencia; ver:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// para la descripción del error (también existía en las versiones anteriores de Chrome).
jQuery.each ({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "puntero",
	pointerleave: "puntero"
}, función (orig, corregir) {
	jQuery.event.special [orig] = {
		delegateType: corregir,
		bindType: corregir,

		manejar: función (evento) {
			var ret,
				objetivo = esto,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// Para mouseenter / leave, llame al controlador si está relacionado fuera del objetivo.
			// NB: No relatedTarget si el mouse se fue / ingresó a la ventana del navegador
			if (! related || (related! == target &&! jQuery.contains (target, related))) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply (esto, argumentos);
				event.type = fix;
			}
			return ret;
		}
	};
});

jQuery.fn.extend ({

	on: function (tipos, selector, datos, fn) {
		return on (this, types, selector, data, fn);
	},
	uno: función (tipos, selector, datos, fn) {
		return on (this, types, selector, data, fn, 1);
	},
	off: función (tipos, selector, fn) {
		var handleObj, tipo;
		if (types && types.preventDefault && types.handleObj) {

			// (evento) enviado jQuery.Event
			handleObj = types.handleObj;
			jQuery (types.delegateTarget) .off (
				handleObj.namespace?
					handleObj.origType + "." + handleObj.namespace:
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			devuelve esto;
		}
		if (tipo de tipos === "objeto") {

			// (tipos-objeto [, selector])
			para (escriba los tipos) {
				this.off (tipo, selector, tipos [tipo]);
			}
			devuelve esto;
		}
		if (selector === falso || typeof selector === "función") {

			// (tipos [, fn])
			fn = selector;
			selector = indefinido;
		}
		if (fn === falso) {
			fn = returnFalse;
		}
		return this.each (function () {
			jQuery.event.remove (this, types, fn, selector);
		});
	}
});


var

	/ * eslint-disable max-len * /

	// Ver https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = / <(?! área | br | col | inserción | hr | img | entrada | enlace | meta | param) (([az] [^ \ / \ 0> \ x20 \ t \ r \ n \ f] *) [^>] *) \ /> / gi,

	/ * eslint-enable * /

	// Soporte: IE <= 10 - 11, Edge 12 - 13 solamente
	// En IE / Edge, el uso de grupos regex aquí provoca graves ralentizaciones.
	// Ver https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = / <script | <style | <link / i,

	// checked = "checked" o checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = / ^ \ s * <: [| - | (! (\?: \] \ | -) CDATA \ [?)]> \ s * $ / g;

// Prefiere un tbody sobre su tabla primaria para contener nuevas filas
manipulación de funcionesTarget (elem, contenido) {
	if (nodeName (elem, "tabla") &&
		nodeName (content.nodeType! == 11? content: content.firstChild, "tr")) {

		return jQuery (elem) .children ("tbody") [0] || elem;
	}

	regreso elem;
}

// Reemplazar / restaurar el atributo de tipo de elementos de script para la manipulación segura de DOM
función disableScript (elem) {
	elem.type = (! elem.getAttribute ( "tipo") == null) + "/" + elem.type;
	regreso elem;
}
function restoreScript (elem) {
	if ((elem.type || "") .slice (0, 5) === "true /") {
		elem.type = elem.type.slice (5);
	} else {
		elem.removeAttribute ("tipo");
	}

	regreso elem;
}

function cloneCopyEvent (src, dest) {
	var i, l, tipo, pdataOld, pdataCur, udataOld, udataCur, eventos;

	if (dest.nodeType! == 1) {
		regreso;
	}

	// 1. Copiar datos privados: eventos, manejadores, etc.
	if (dataPriv.hasData (src)) {
		pdataOld = dataPriv.access (src);
		pdataCur = dataPriv.set (dest, pdataOld);
		events = pdataOld.events;

		if (eventos) {
			eliminar pdataCur.handle;
			pdataCur.events = {};

			para (escriba eventos) {
				para (i = 0, l = eventos [tipo] .length; i <l; i ++) {
					jQuery.event.add (dest, tipo, eventos [tipo] [i]);
				}
			}
		}
	}

	// 2. Copia datos de usuario
	if (dataUser.hasData (src)) {
		udataOld = dataUser.access (src);
		udataCur = jQuery.extend ({}, udataOld);

		dataUser.set (dest, udataCur);
	}
}

// Corregir errores de IE, ver pruebas de soporte
función fixInput (src, dest) {
	var nodeName = dest.nodeName.toLowerCase ();

	// No puede persistir el estado verificado de una casilla de verificación clonada o un botón de opción.
	if (nodeName === "input" && rcheckableType.test (src.type)) {
		dest.checked = src.checked;

	// No puede devolver la opción seleccionada al estado seleccionado predeterminado cuando las opciones de clonación
	} else if (nodeName === "input" || nodeName === "textarea") {
		dest.defaultValue = src.defaultValue;
	}
}

función domManip (colección, args, callback, ignorado) {

	// Aplanar cualquier matriz anidada
	args = concat.apply ([], args);

	var fragmento, primero, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args [0],
		valueIsFunction = isFunction (valor);

	// No podemos clonar fragmentos de Node que contengan marcados, en WebKit
	if (valueIsFunction ||
			(l> 1 && typeof value === "string" &&
				! support.checkClone && rchecked.test (value))) {
		return collection.each (función (índice) {
			var self = collection.eq (índice);
			if (valueIsFunction) {
				args [0] = value.call (this, index, self.html ());
			}
			domManip (self, args, callback, ignorado);
		});
	}

	si (l) {
		fragment = buildFragment (args, colección [0] .ownerDocument, false, colección, ignorado);
		first = fragment.firstChild;

		if (fragment.childNodes.length === 1) {
			fragmento = primero;
		}

		// Requerir nuevo contenido o un interés en los elementos ignorados para invocar la devolución de llamada
		if (first || ignored) {
			scripts = jQuery.map (getAll (fragmento, "script"), disableScript);
			hasScripts = scripts.length;

			// Usa el fragmento original para el último artículo
			// en vez del primero porque puede terminar
			// vaciarse incorrectamente en ciertas situaciones (# 8070).
			para (; i <l; i ++) {
				nodo = fragmento;

				if (i! == iNoClone) {
					node = jQuery.clone (node, true, true);

					// Mantener referencias a scripts clonados para una restauración posterior
					if (hasScripts) {

						// Soporte: Android <= 4.0 solamente, solo PhantomJS 1
						// push.apply (_, arraylike) se lanza en el antiguo WebKit
						jQuery.merge (scripts, getAll (nodo, "script"));
					}
				}

				callback.call (colección [i], nodo, i);
			}

			if (hasScripts) {
				doc = scripts [scripts.length - 1] .ownerDocument;

				// Rehabilitar scripts
				jQuery.map (scripts, restoreScript);

				// Evaluar secuencias de comandos ejecutables en la primera inserción de documentos
				para (i = 0; i <hasScripts; i ++) {
					nodo = scripts [i];
					if (rscriptType.test (node.type || "") &&
						! dataPriv.access (node, "globalEval") &&
						jQuery.contains (doc, node)) {

						if (node.src && (node.type || "") .toLowerCase ()! == "module") {

							// Dependencia AJAX opcional, pero no ejecutará scripts si no está presente
							if (jQuery._evalUrl) {
								jQuery._evalUrl (node.src);
							}
						} else {
							DOMEval (node.textContent.replace (rcleanScript, ""), doc, node);
						}
					}
				}
			}
		}
	}

	colección de devolución;
}

eliminar función (elem, selector, keepData) {
	nodo var,
		nodos = selector? jQuery.filter (selector, elem): elem,
		i = 0;

	for (; (node ​​= nodes [i])! = null; i ++) {
		if (! keepData && node.nodeType === 1) {
			jQuery.cleanData (getAll (node));
		}

		if (node.parentNode) {
			if (keepData && jQuery.contains (node.ownerDocument, node)) {
				setGlobalEval (getAll (node, "script"));
			}
			node.parentNode.removeChild (node);
		}
	}

	regreso elem;
}

jQuery.extend ({
	htmlPrefilter: function (html) {
		devuelve html.replace (rxhtmlTag, "<$ 1> </ $ 2>");
	},

	clone: ​​function (elem, dataAndEvents, deepDataAndEvents) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode (true),
			inPage = jQuery.contains (elem.ownerDocument, elem);

		// Soluciona problemas de clonación de IE
		if (! support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) &&
				! jQuery.isXMLDoc (elem)) {

			// Evitamos Sizzle aquí por motivos de rendimiento: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll (clon);
			srcElements = getAll (elem);

			for (i = 0, l = srcElements.length; i <l; i ++) {
				fixInput (srcElements [i], destElements [i]);
			}
		}

		// Copia los eventos desde el original al clon
		if (dataAndEvents) {
			if (deepDataAndEvents) {
				srcElements = srcElements || getAll (elem);
				destElements = destElements || getAll (clonar);

				for (i = 0, l = srcElements.length; i <l; i ++) {
					cloneCopyEvent (srcElements [i], destElements [i]);
				}
			} else {
				cloneCopyEvent (elem, clone);
			}
		}

		// Conservar el historial de evaluación de guiones
		destElements = getAll (clone, "script");
		if (destElements.length> 0) {
			setGlobalEval (destElements,! inPage && getAll (elem, "script"));
		}

		// Devuelve el conjunto clonado
		clon de retorno;
	},

	cleanData: function (elems) {
		var datos, elem, tipo,
			especial = jQuery.event.special,
			i = 0;

		para (; (elem = elems [i])! == undefined; i ++) {
			if (acceptData (elem)) {
				if ((data = elem [dataPriv.expando])) {
					if (data.events) {
						for (escriba en data.events) {
							if (especial [tipo]) {
								jQuery.event.remove (elem, type);

							// Este es un atajo para evitar la sobrecarga de jQuery.event.remove
							} else {
								jQuery.removeEvent (elem, type, data.handle);
							}
						}
					}

					// Soporte: Chrome <= 35 - 45+
					// Asignar indefinido en lugar de usar delete, ver Data # remove
					elem [dataPriv.expando] = undefined;
				}
				if (elem [dataUser.expando]) {

					// Soporte: Chrome <= 35 - 45+
					// Asignar indefinido en lugar de usar delete, ver Data # remove
					elem [dataUser.expando] = undefined;
				}
			}
		}
	}
});

jQuery.fn.extend ({
	detach: function (selector) {
		return remove (this, selector, true);
	},

	remove: function (selector) {
		return remove (esto, selector);
	},

	texto: función (valor) {
		acceso de retorno (esto, función (valor) {
			valor de retorno === indefinido?
				jQuery.text (esto):
				this.empty (). each (function () {
					if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
						this.textContent = valor;
					}
				});
		}, null, value, arguments.length);
	},

	append: function () {
		return domManip (esto, argumentos, función (elem) {
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = manipulationTarget (this, elem);
				target.appendChild (elem);
			}
		});
	},

	prepend: function () {
		return domManip (esto, argumentos, función (elem) {
			if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
				var target = manipulationTarget (this, elem);
				target.insertBefore (elem, target.firstChild);
			}
		});
	},

	before: function () {
		return domManip (esto, argumentos, función (elem) {
			if (this.parentNode) {
				this.parentNode.insertBefore (elem, this);
			}
		});
	},

	after: function () {
		return domManip (esto, argumentos, función (elem) {
			if (this.parentNode) {
				this.parentNode.insertBefore (elem, this.nextSibling);
			}
		});
	},

	empty: function () {
		var elem,
			i = 0;

		para (; (elem = this [i])! = null; i ++) {
			if (elem.nodeType === 1) {

				// Prevenir fugas de memoria
				jQuery.cleanData (getAll (elem, false));

				// Eliminar cualquier nodo restante
				elem.textContent = "";
			}
		}

		devuelve esto;
	},

	clone: ​​function (dataAndEvents, deepDataAndEvents) {
		dataAndEvents = dataAndEvents == null? falso: dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null? dataAndEvents: deepDataAndEvents;

		return this.map (function () {
			devuelve jQuery.clone (this, dataAndEvents, deepDataAndEvents);
		});
	},

	html: function (value) {
		acceso de retorno (esto, función (valor) {
			var elem = this [0] || {},
				i = 0,
				l = this.length;

			if (value === undefined && elem.nodeType === 1) {
				return elem.innerHTML;
			}

			// Mira si podemos tomar un atajo y solo usar innerHTML
			if (tipo de valor === "cadena" &&! rnoInnerhtml.test (valor) &&
				! wrapMap [(rtagName.exec (value) || ["", ""]) [1] .toLowerCase ()]) {

				value = jQuery.htmlPrefilter (valor);

				tratar {
					para (; i <l; i ++) {
						elem = esto [i] || {};

						// Eliminar nodos de elementos y evitar pérdidas de memoria
						if (elem.nodeType === 1) {
							jQuery.cleanData (getAll (elem, false));
							elem.innerHTML = valor;
						}
					}

					elem = 0;

				// Si usar innerHTML arroja una excepción, use el método alternativo
				} catch (e) {}
			}

			if (elem) {
				this.empty (). append (valor);
			}
		}, null, value, arguments.length);
	},

	replaceWith: function () {
		var ignored = [];

		// Haga los cambios, reemplazando cada elemento de contexto no ignorado con el nuevo contenido
		return domManip (esto, argumentos, función (elem) {
			var parent = this.parentNode;

			if (jQuery.inArray (esto, ignorado) <0) {
				jQuery.cleanData (getAll (this));
				if (padre) {
					parent.replaceChild (elem, this);
				}
			}

		// Forzar invocación de devolución de llamada
		}, ignorado);
	}
});

jQuery.each ({
	appendTo: "append",
	prependTo: "prepend",
	insertAntes: "antes",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, función (nombre, original) {
	jQuery.fn [name] = function (selector) {
		var elems,
			ret = [],
			insert = jQuery (selector),
			last = insert.length - 1,
			i = 0;

		para (; i <= último; i ++) {
			elems = i === ¿por último? esto: this.clone (verdadero);
			jQuery (inserte [i]) [original] (elems);

			// Soporte: Android <= 4.0 solamente, solo PhantomJS 1
			// .get () porque push.apply (_, arraylike) se lanza en el antiguo WebKit
			push.apply (ret, elems.get ());
		}

		devuelve this.pushStack (ret);
	};
});
var rnumnonpx = new RegExp ("^ (" + pnum + ") (? px) [az%] + $", "i");

var getStyles = function (elem) {

		// Soporte: IE <= 11 solamente, Firefox <= 30 (# 15098, # 14150)
		// IE arroja elementos creados en ventanas emergentes
		// FF mientras tanto lanza elementos de marco a través de "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if (! view ||! view.opener) {
			view = ventana;
		}

		return view.getComputedStyle (elem);
	};

var rboxStyle = new RegExp (cssExpand.join ("|"), "i");



(función () {

	// La ejecución de las pruebas pixelPosition y boxSizingReliable requiere solo un diseño
	// entonces se ejecutan al mismo tiempo para guardar el segundo cálculo.
	function computeStyleTests () {

		// Este es un singleton, necesitamos ejecutarlo solo una vez
		if (! div) {
			regreso;
		}

		container.style.cssText = "position: absolute; left: -11111px; width: 60px;" +
			"margin-top: 1px; relleno: 0; borde: 0";
		div.style.cssText =
			"position: relative; display: block; box-sizing: border-box; overflow: scroll;" +
			"margin: auto; border: 1px; relleno: 1px;" +
			"ancho: 60%; superior: 1%";
		documentElement.appendChild (contenedor) .appendChild (div);

		var divStyle = window.getComputedStyle (div);
		pixelPositionVal = divStyle.top! == "1%";

		// Soporte: Android 4.0 - 4.3 solamente, Firefox <= 3 - 44
		reliableMarginLeftVal = roundPixelMeasures (divStyle.marginLeft) === 12;

		// Soporte: Android 4.0 - 4.3 solamente, Safari <= 9.1 - 10.1, iOS <= 7.0 - 9.3
		// Algunos estilos regresan con valores porcentuales, aunque no deberían
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures (divStyle.right) === 36;

		// Soporte: IE 9 - 11 solamente
		// Detecta la notificación errónea de las dimensiones de contenido para el tamaño del cuadro: elementos del cuadro de borde
		boxSizingReliableVal = roundPixelMeasures (divStyle.width) === 36;

		// Soporte: solo IE 9
		// Detectar desbordamiento: desorden de desplazamiento (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absoluto";

		documentElement.removeChild (contenedor);

		// Anula el div para que no se almacene en la memoria y
		// también será un signo de que los controles ya se realizaron
		div = null;
	}

	function roundPixelMeasures (medida) {
		devuelve Math.round (parseFloat (medida));
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		confiableMarginLeftVal,
		container = document.createElement ("div"),
		div = document.createElement ("div");

	// Finaliza temprano en entornos limitados (sin navegador)
	if (! div.style) {
		regreso;
	}

	// Soporte: IE <= 9 - 11 solamente
	// El estilo del elemento clonado afecta al elemento fuente clonado (# 8908)
	div.style.backgroundClip = "contenido-box";
	div.cloneNode (true) .style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend (soporte, {
		boxSizingReliable: function () {
			computeStyleTests ();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function () {
			computeStyleTests ();
			return pixelBoxStylesVal;
		},
		pixelPosition: function () {
			computeStyleTests ();
			return pixelPositionVal;
		},
		reliableMarginLeft: function () {
			computeStyleTests ();
			devolver confiableMarginLeftVal;
		},
		scrollboxSize: function () {
			computeStyleTests ();
			return scrollboxSizeVal;
		}
	});
}) ();


función curCSS (elem, nombre, calculado) {
	var ancho, minWidth, maxWidth, ret,

		// Soporte: Firefox 51+
		// Recuperando el estilo antes de computar de alguna manera
		// soluciona un problema con obtener valores incorrectos
		// en elementos separados
		style = elem.style;

	calculado = calculado || getStyles (elem);

	// getPropertyValue es necesario para:
	// .css ('filtro') (IE 9 solamente, # 12537)
	// .css ('- propiedad personalizada) (# 3144)
	if (calculado) {
		ret = computed.getPropertyValue (name) || calculado [nombre];

		if (ret === "" &&! jQuery.contains (elem.ownerDocument, elem)) {
			ret = jQuery.style (elem, nombre);
		}

		// Un homenaje al "increíble hack de Dean Edwards"
		// El navegador Android devuelve el porcentaje de algunos valores,
		// pero el ancho parece ser confiablemente píxeles.
		// Esto va en contra de la especificación del borrador de CSSOM:
		// https://drafts.csswg.org/cssom/#resolved-values
		if (! support.pixelBoxStyles () && rnumnonpx.test (ret) && rboxStyle.test (name)) {

			// Recuerde los valores originales
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Poner los nuevos valores para obtener un valor calculado
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revertir los valores modificados
			style.width = ancho;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret! == undefined?

		// Soporte: IE <= 9 - 11 solamente
		// IE devuelve el valor de zIndex como un entero.
		ret + "":
		retirado;
}


función addGetHookIf (conditionFn, hookFn) {

	// Definir el gancho, comprobaremos en la primera ejecución si es realmente necesario.
	regreso {
		get: function () {
			if (condiciónFn ()) {

				// No es necesario enganchar (o no es posible usarlo debido
				// a la dependencia faltante), elimínelo.
				eliminar this.get;
				regreso;
			}

			// Gancho necesitado; redefinirlo para que la prueba de soporte no se ejecute de nuevo.
			return (this.get = hookFn) .apply (esto, argumentos);
		}
	};
}


var

	// Swappable si la pantalla es none o comienza con la tabla
	// excepto "tabla", "tabla-celda" o "tabla-título"
	// Consulte aquí los valores de visualización: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = / ^ - /,
	cssShow = {position: "absolute", visibility: "hidden", display: "block"},
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = ["Webkit", "Moz", "ms"],
	emptyStyle = document.createElement ("div") .style;

// Devuelve una propiedad css asignada a una propiedad con prefijo de un proveedor potencial
function vendorPropName (nombre) {

	// Acceso directo para nombres que no tienen prefijo de proveedor
	if (nombre en emptyStyle) {
		nombre de regreso;
	}

	// Verificar los nombres prefijados del proveedor
	var capName = name [0] .toUpperCase () + name.slice (1),
		i = cssPrefixes.length;

	mientras yo-- ) {
		name = cssPrefixes [i] + capName;
		if (nombre en emptyStyle) {
			nombre de regreso;
		}
	}
}

// Devuelve una propiedad asignada a lo que sugiere jQuery.cssProps o a
// una propiedad prefijada por un proveedor.
function finalPropName (nombre) {
	var ret = jQuery.cssProps [nombre];
	if (! ret) {
		ret = jQuery.cssProps [nombre] = vendorPropName (nombre) || nombre;
	}
	return ret;
}

function setPositiveNumber (elem, value, resta) {

	// Todos los valores relativos (+/-) ya han sido
	// normalizado en este punto
	var matches = rcssNum.exec (valor);
	devolver partidos?

		// Protección contra "restar" indefinido, por ejemplo, cuando se usa como en cssHooks
		Math.max (0, coincide con [2] - (resta || 0)) + (coincide con [3] || "px"):
		valor;
}

function boxModelAdjustment (elem, dimension, box, isBorderBox, styles, computedVal) {
	var i = dimensión === "ancho"? 1: 0,
		extra = 0,
		delta = 0;

	// El ajuste puede no ser necesario
	if (box === (isBorderBox? "border": "content")) {
		return 0;
	}

	para (; i <4; i + = 2) {

		// Ambos modelos de cajas excluyen el margen
		if (box === "margin") {
			delta + = jQuery.css (elem, box + cssExpand [i], true, styles);
		}

		// Si llegamos aquí con un cuadro de contenido, buscamos "relleno" o "borde" o "margen"
		if (! isBorderBox) {

			// Añadir relleno
			delta + = jQuery.css (elem, "relleno" + cssExpand [i], verdadero, estilos);

			// Para "borde" o "margen", agregue borde
			if (box! == "relleno") {
				delta + = jQuery.css (elem, "border" + cssExpand [i] + "Ancho", verdadero, estilos);

			// Pero aún así mantén un registro de lo contrario
			} else {
				extra + = jQuery.css (elem, "borde" + cssExpand [i] + "Ancho", verdadero, estilos);
			}

		// Si llegamos aquí con un cuadro de borde (contenido + relleno + borde), estamos buscando "contenido" o
		// "relleno" o "margen"
		} else {

			// Para "contenido", reste el relleno
			if (box === "contenido") {
				delta - = jQuery.css (elem, "relleno" + cssExpand [i], verdadero, estilos);
			}

			// Para "contenido" o "relleno", resta el borde
			if (box! == "margen") {
				delta - = jQuery.css (elem, "border" + cssExpand [i] + "Ancho", verdadero, estilos);
			}
		}
	}

	// Cuenta para contenido positivo-recuadro de canal de desplazamiento cuando se solicite al proporcionar computedVal
	if (! isBorderBox && computedVal> = 0) {

		// offsetWidth / offsetHeight es una suma redondeada de contenido, relleno, margen de desplazamiento y borde
		// Asumiendo un canal de desplazamiento entero, resta el resto y redondea hacia abajo
		delta + = Math.max (0, Math.ceil (
			elem ["offset" + dimensión [0] .toUpperCase () + dimension.slice (1)] -
			computedVal -
			delta -
			extra -
			0.5
		));
	}

	retorno delta;
}

function getWidthOrHeight (elem, dimension, extra) {

	// Comience con estilo computado
	var styles = getStyles (elem),
		val = curCSS (elem, dimensión, estilos),
		isBorderBox = jQuery.css (elem, "boxSizing", falso, estilos) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Soporte: Firefox <= 54
	// Devuelve un valor de confusión que no sea de píxel o finge ignorancia, según corresponda.
	if (rnumnonpx.test (val)) {
		if (! extra) {
			return val;
		}
		val = "auto";
	}

	// Compruebe el estilo en caso de que un navegador devuelva valores no confiables
	// para getComputedStyle regresa silenciosamente al elem.style confiable
	valueIsBorderBox = valueIsBorderBox &&
		(support.boxSizingReliable () || val === elem.style [dimension]);

	// Volver a offsetWidth / offsetHeight cuando el valor es "auto"
	// Esto sucede para elementos en línea sin configuración explícita (gh-3571)
	// Soporte: Android <= 4.1 - 4.3 solamente
	// También use offsetWidth / offsetHeight para las dimensiones en línea mal informadas (gh-3602)
	if (val === "auto" ||
		! parseFloat (val) && jQuery.css (elem, "display", false, styles) === "inline") {

		val = elem ["offset" + dimensión [0] .toUpperCase () + dimension.slice (1)];

		// offsetWidth / offsetHeight proporciona valores de cuadro de frontera
		valueIsBorderBox = true;
	}

	// Normalizar "" y automático
	val = parseFloat (val) || 0;

	// Ajuste para el modelo de caja del elemento
	regresar (val +
		boxModelAdjustment (
			elem,
			dimensión,
			extra || (isBorderBox? "borde": "contenido"),
			valueIsBorderBox,
			estilos,

			// Proporcione el tamaño calculado actual para solicitar el cálculo del canal de desplazamiento (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend ({

	// Añadir en ganchos de propiedades de estilo para anular el valor predeterminado
	// comportamiento de obtener y establecer una propiedad de estilo
	cssHooks: {
		opacidad: {
			get: function (elem, computed) {
				if (calculado) {

					// Siempre deberíamos obtener un número de la opacidad
					var ret = curCSS (elem, "opacidad");
					return ret === ""? "1": ret;
				}
			}
		}
	},

	// No agregue automáticamente "px" a estas propiedades posiblemente sin unidades
	cssNumber: {
		"animationIterationCount": verdadero,
		"columnCount": verdadero,
		"fillOpacity": cierto,
		"flexGrow": cierto,
		"flexShrink": cierto,
		"fontWeight": cierto,
		"lineHeight": cierto,
		"opacidad": cierto,
		"orden": cierto,
		"huérfanos": cierto,
		"viudas": cierto,
		"zIndex": verdadero,
		"zoom": verdadero
	},

	// Agregue las propiedades cuyos nombres desea corregir antes
	// configurando u obteniendo el valor
	cssProps: {},

	// Obtener y establecer la propiedad de estilo en un nodo DOM
	estilo: función (elem, nombre, valor, extra) {

		// No establece estilos en los nodos de texto y comentario
		if (! elem || elem.nodeType === 3 || elem.nodeType === 8 ||! elem.style) {
			regreso;
		}

		// Asegúrate de que estamos trabajando con el nombre correcto
		var ret, type, hooks,
			origName = camelCase (nombre),
			isCustomProp = rcustomProp.test (nombre),
			style = elem.style;

		// Asegúrate de que estamos trabajando con el nombre correcto. Nosotros no
		// desea consultar el valor si se trata de una propiedad personalizada de CSS
		// ya que están definidos por el usuario.
		if (! isCustomProp) {
			name = finalPropName (origName);
		}

		// Obtiene el gancho para la versión prefijada, luego la versión no prefijada
		hooks = jQuery.cssHooks [nombre] || jQuery.cssHooks [origName];

		// Verificamos si estamos configurando un valor
		if (value! == undefined) {
			tipo = tipo de valor;

			// Convertir "+ =" o "- =" en números relativos (# 7345)
			if (tipo === "cadena" && (ret = rcssNum.exec (valor)) && ret [1]) {
				value = adjustCSS (elem, name, ret);

				// Soluciona el bug # 9237
				tipo = "número";
			}

			// Asegúrese de que los valores nulos y NaN no estén establecidos (# 7116)
			if (value == null || value! == value) {
				regreso;
			}

			// Si se pasó un número, agregue la unidad (excepto para ciertas propiedades de CSS)
			if (tipo === "número") {
				valor + = ret && ret [3] || (jQuery.cssNumber [origName]? "": "px");
			}

			// background- * props afecta los valores del clon original
			if (! support.clearCloneStyle && value === "" && name.indexOf ("background") === 0) {
				estilo [nombre] = "heredar";
			}

			// Si se proporcionó un gancho, use ese valor; de lo contrario, simplemente configure el valor especificado
			if (! hooks ||! ("set" en ganchos) ||
				(valor = hooks.set (elem, valor, extra))!! == undefined) {

				if (isCustomProp) {
					style.setProperty (nombre, valor);
				} else {
					estilo [nombre] = valor;
				}
			}

		} else {

			// Si se proporcionó un gancho, obtenga el valor no calculado de allí
			if (hooks && "get" en los ganchos &&
				(ret = hooks.get (elem, false, extra))! == undefined) {

				return ret;
			}

			// De lo contrario, solo obtiene el valor del objeto de estilo
			devolver el estilo [nombre];
		}
	},

	css: function (elem, name, extra, styles) {
		var val, num, hooks,
			origName = camelCase (nombre),
			isCustomProp = rcustomProp.test (nombre);

		// Asegúrate de que estamos trabajando con el nombre correcto. Nosotros no
		// quiero modificar el valor si se trata de una propiedad personalizada de CSS
		// ya que están definidos por el usuario.
		if (! isCustomProp) {
			name = finalPropName (origName);
		}

		// Pruebe el nombre prefijado seguido del nombre no prefijado
		hooks = jQuery.cssHooks [nombre] || jQuery.cssHooks [origName];

		// Si se proporcionó un gancho, obtenga el valor calculado desde allí
		if (hooks && "get" en ganchos) {
			val = hooks.get (elem, true, extra);
		}

		// De lo contrario, si existe una forma de obtener el valor calculado, usa eso
		if (val === undefined) {
			val = curCSS (elem, nombre, estilos);
		}

		// Convierte "normal" en valor calculado
		if (val === "normal" && name en cssNormalTransform) {
			val = cssNormalTransform [nombre];
		}

		// Hacer numérico si forzado o un calificador fue provisto y val parece numérico
		if (extra === "" || extra) {
			num = parseFloat (val);
			devolver extra === verdadero || isFinite (num)? num || 0: val;
		}

		return val;
	}
});

jQuery.each (["alto", "ancho"], función (i, dimensión) {
	jQuery.cssHooks [dimension] = {
		get: function (elem, computed, extra) {
			if (calculado) {

				// Ciertos elementos pueden tener información de dimensión si los mostramos invisiblemente
				// pero debe tener un estilo de visualización actual que beneficie
				devuelve rdisplayswap.test (jQuery.css (elem, "display")) &&

					// Soporte: Safari 8+
					// Las columnas de tabla en Safari tienen offsetWidth distinto de cero cero
					// getBoundingClientRect (). ancho a menos que se modifique la visualización.
					// Soporte: IE <= 11 solamente
					// Ejecutando getBoundingClientRect en un nodo desconectado
					// en IE arroja un error.
					(! elem.getClientRects (). length ||! elem.getBoundingClientRect (). width)?
						swap (elem, cssShow, function () {
							return getWidthOrHeight (elem, dimensión, extra);
						}):
						getWidthOrHeight (elem, dimensión, extra);
			}
		},

		set: function (elem, value, extra) {
			var coincide,
				styles = getStyles (elem),
				isBorderBox = jQuery.css (elem, "boxSizing", falso, estilos) === "border-box",
				restar = extra && boxModelAdjustment (
					elem,
					dimensión,
					extra,
					isBorderBox,
					estilos
				);

			// Cuenta para dimensiones de recuadro de frontera poco fiables comparando el desplazamiento * con el calculado y
			// simulando un cuadro de contenido para obtener el borde y el relleno (gh-3699)
			if (isBorderBox && support.scrollboxSize () === styles.position) {
				restar = = Math.ceil (
					elem ["offset" + dimensión [0] .toUpperCase () + dimension.slice (1)] -
					ParseFloat (estilos [dimensión]) -
					boxModelAdjustment (elem, dimension, "border", false, styles) -
					0.5
				);
			}

			// Convierte a píxeles si se necesita ajuste de valor
			if (restar && (matches = rcssNum.exec (value)) &&
				(coincide con [3] || "px")! == "px") {

				elem.style [dimension] = valor;
				value = jQuery.css (elem, dimension);
			}

			return setPositiveNumber (elem, value, resta);
		}
	};
});

jQuery.cssHooks.marginLeft = addGetHookIf (support.reliableMarginLeft,
	función (elem, calculado) {
		if (calculado) {
			return (parseFloat (curCSS (elem, "marginLeft")) ||
				elem.getBoundingClientRect (). left -
					swap (elem, {marginLeft: 0}, function () {
						return elem.getBoundingClientRect (). left;
					})
				) + "px";
		}
	}
);

// Estos ganchos son usados ​​por animate para expandir propiedades
jQuery.each ({
	margen: "",
	relleno: "",
	ancho del borde"
}, función (prefijo, sufijo) {
	jQuery.cssHooks [prefix + sufijo] = {
		expandir: función (valor) {
			var i = 0,
				expandido = {},

				// Asume un solo número si no es una cadena
				partes = typeof value === "string"? value.split (""): [valor];

			para (; i <4; i ++) {
				expandido [prefijo + cssExpand [i] + sufijo] =
					partes [i] || partes [i - 2] || partes [0];
			}

			regreso expandido;
		}
	};

	if (prefijo! == "margen") {
		jQuery.cssHooks [prefijo + sufijo] .set = setPositiveNumber;
	}
});

jQuery.fn.extend ({
	css: función (nombre, valor) {
		acceso de retorno (esto, función (elem, nombre, valor) {
			var estilos, len,
				map = {},
				i = 0;

			if (Array.isArray (name)) {
				styles = getStyles (elem);
				len = name.length;

				para (; i <len; i ++) {
					map [nombre [i]] = jQuery.css (elem, nombre [i], falso, estilos);
				}

				mapa de retorno;
			}

			valor de retorno! == indefinido?
				jQuery.style (elem, nombre, valor):
				jQuery.css (elem, nombre);
		}, nombre, valor, arguments.length> 1);
	}
});


función Tween (elem, options, prop, end, easing) {
	return new Tween.prototype.init (elem, options, prop, end, easing);
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function (elem, options, prop, end, easing, unit) {
		this.elem = elem;
		this.prop = prop;
		this.easing = relajando || jQuery.easing._default;
		this.options = opciones;
		this.start = this.now = this.cur ();
		this.end = fin;
		this.unit = unidad || (jQuery.cssNumber [prop]? "": "px");
	},
	cur: function () {
		var hooks = Tween.propHooks [this.prop];

		return hooks && hooks.get?
			hooks.get (esto):
			Tween.propHooks._default.get (esto);
	},
	ejecutar: función (porcentaje) {
		var eased,
			hooks = Tween.propHooks [this.prop];

		if (this.options.duration) {
			this.pos = eased = jQuery.easing [this.easing] (
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = (this.end - this.start) * eased + this.start;

		if (this.options.step) {
			this.options.step.call (this.elem, this.now, this);
		}

		if (hooks && hooks.set) {
			hooks.set (this);
		} else {
			Tween.propHooks._default.set (this);
		}
		devuelve esto;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_defecto: {
		get: function (interpolación) {
			var resultado;

			// Usa una propiedad en el elemento directamente cuando no es un elemento DOM,
			// o cuando no existe una propiedad de estilo coincidente que exista.
			if (tween.elem.nodeType! == 1 ||
				tween.elem [tween.prop]! = null && tween.elem.style [tween.prop] == null) {
				return tween.elem [tween.prop];
			}

			// Pasar una cadena vacía como un 3er parámetro a .css automáticamente
			// intento un parseFloat y un repliegue a una cadena si el parse falla.
			// Los valores simples como "10px" se analizan en Float;
			// los valores complejos como "rotate (1rad)" se devuelven tal como están.
			result = jQuery.css (tween.elem, tween.prop, "");

			// Las cadenas vacías, nulas, indefinidas y "automáticas" se convierten a 0.
			retorno! resultado || resultado === "auto"? 0: resultado;
		},
		set: function (tween) {

			// Usa el gancho de paso para la compatibilidad de la espalda.
			// Usa cssHook si está allí.
			// Use .style si está disponible y use propiedades simples donde esté disponible.
			if (jQuery.fx.step [tween.prop]) {
				jQuery.fx.step [tween.prop] (interpolación);
			} else if (tween.elem.nodeType === 1 &&
				(tween.elem.style [jQuery.cssProps [tween.prop]]! = null ||
					jQuery.cssHooks [tween.prop])) {
				jQuery.style (tween.elem, tween.prop, tween.now + tween.unit);
			} else {
				tween.elem [tween.prop] = tween.now;
			}
		}
	}
};

// Soporte: IE <= 9 solamente
// Enfoque basado en pánico para configurar cosas en nodos desconectados
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function (tween) {
		if (tween.elem.nodeType && tween.elem.parentNode) {
			tween.elem [tween.prop] = tween.now;
		}
	}
};

jQuery.easing = {
	lineal: función (p) {
		return p;
	},
	oscilación: función (p) {
		return 0.5 - Math.cos (p * Math.PI) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 punto de extensión
jQuery.fx.step = {};




var
	fxNow, en progreso,
	rfxtypes = / ^ (?: toggle | show | hide) $ /,
	rrun = / queueHooks $ /;

programa de función () {
	if (inProgress) {
		if (document.hidden === false && window.requestAnimationFrame) {
			window.requestAnimationFrame (horario);
		} else {
			window.setTimeout (schedule, jQuery.fx.interval);
		}

		jQuery.fx.tick ();
	}
}

// Las animaciones creadas sincrónicamente se ejecutarán sincrónicamente
function createFxNow () {
	window.setTimeout (function () {
		fxNow = indefinido;
	});
	return (fxNow = Date.now ());
}

// Genera parámetros para crear una animación estándar
función genFx (tipo, includeWidth) {
	var que,
		i = 0,
		attrs = {height: type};

	// Si incluimos ancho, el valor de paso es 1 para hacer todos los valores de cssExpand,
	// de lo contrario, el valor del paso es 2 para omitir Left and Right
	includeWidth = includeWidth? 1: 0;
	para (; i <4; i + = 2 - includeWidth) {
		which = cssExpand [i];
		attrs ["margen" + que] = atributos ["relleno" + que] = tipo;
	}

	if (includeWidth) {
		attrs.opacity = attrs.width = tipo;
	}

	devolver attrs;
}

función createTween (valor, prop, animación) {
	varianza,
		collection = (Animation.tweeners [prop] || []) .concat (Animation.tweeners ["*"]),
		índice = 0,
		length = collection.length;
	for (; index <length; index ++) {
		if ((tween = colección [índice] .call (animación, prop, valor))) {

			// Hemos terminado con esta propiedad
			devolver la interpolación;
		}
	}
}

función defaultPrefilter (elem, props, opts) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, pantalla,
		isBox = "ancho" en apoyos || "altura" en los accesorios,
		anim = esto,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree (elem),
		dataShow = dataPriv.get (elem, "fxshow");

	// Las animaciones de omisión de colas secuestran los ganchos de fx
	if (! opts.queue) {
		hooks = jQuery._queueHooks (elem, "fx");
		if (hooks.unqueued == null) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function () {
				if (! hooks.unqueued) {
					oldfire ();
				}
			};
		}
		hooks.unqueued ++;

		anim.always (function () {

			// Asegúrese de que se llama al controlador completo antes de que finalice
			anim.always (function () {
				hooks.unqueued--;
				if (! jQuery.queue (elem, "fx") .length) {
					hooks.empty.fire ();
				}
			});
		});
	}

	// Detectar mostrar / ocultar animaciones
	para (prop in props) {
		value = props [prop];
		if (rfxtypes.test (value)) {
			eliminar accesorios [prop];
			alternar = alternar || valor === "alternar";
			if (value === (hidden? "hide": "show")) {

				// Pretenden estar ocultos si esto es un "show" y
				// aún hay datos de un show / hide detenido
				if (value === "show" && dataShow && dataShow [prop]! == undefined) {
					oculto = verdadero;

				// Ignorar todos los demás datos de mostrar / ocultar no operativos
				} else {
					continuar;
				}
			}
			orig [prop] = dataShow && dataShow [prop] || jQuery.style (elem, prop);
		}
	}

	// Rescate si esto no es operativo como .hide (). Hide ()
	propTween =! jQuery.isEmptyObject (props);
	if (! propTween && jQuery.isEmptyObject (orig)) {
		regreso;
	}

	// Restringir estilos de "desbordamiento" y "mostrar" durante las animaciones de cuadro
	if (isBox && elem.nodeType === 1) {

		// Soporte: IE <= 9 - 11, Edge 12 - 15
		// Registrar los 3 atributos de desbordamiento porque IE no deduce la taquigrafía
		// de overflowX y overflowY de idéntico valor y espejos de Edge solo
		// el valor de overflowX allí.
		opts.overflow = [style.overflow, style.overflowX, style.overflowY];

		// Identificar un tipo de visualización, prefiriendo mostrar / ocultar datos viejos a través de la cascada de CSS
		restoreDisplay = dataShow && dataShow.display;
		if (restoreDisplay == null) {
			restoreDisplay = dataPriv.get (elem, "display");
		}
		display = jQuery.css (elem, "display");
		if (mostrar === "ninguno") {
			if (restoreDisplay) {
				display = restoreDisplay;
			} else {

				// Obtener valores no vacíos al forzar temporalmente la visibilidad
				showHide ([elem], verdadero);
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css (elem, "display");
				showHide ([elem]);
			}
		}

		// Animar elementos en línea como en línea bloque
		if (display === "inline" || display === "inline-block" && restoreDisplay! = null) {
			if (jQuery.css (elem, "float") === "none") {

				// Restaure el valor de visualización original al final de las animaciones de show / hide puras
				if (! propTween) {
					anim.done (function () {
						style.display = restoreDisplay;
					});
					if (restoreDisplay == null) {
						display = style.display;
						restoreDisplay = display === "none"? "" : monitor;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if (opts.overflow) {
		style.overflow = "oculto";
		anim.always (function () {
			style.overflow = opts.overflow [0];
			style.overflowX = opts.overflow [1];
			style.overflowY = opts.overflow [2];
		});
	}

	// Implementar mostrar / ocultar animaciones
	propTween = falso;
	para (prop en orig) {

		// Configuración general de mostrar / ocultar para este elemento de animación
		if (! propTween) {
			if (dataShow) {
				if ("oculto" en dataShow) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access (elem, "fxshow", {display: restoreDisplay});
			}

			// Tienda oculta / visible para alternar, por lo que `.stop (). Toggle ()` "invierte"
			if (alternar) {
				dataShow.hidden =! hidden;
			}

			// Mostrar elementos antes de animarlos
			if (oculto) {
				showHide ([elem], verdadero);
			}

			/ * eslint-disable no-loop-func * /

			anim.done (function () {

			/ * eslint-enable no-loop-func * /

				// El paso final de una animación "ocultar" en realidad está ocultando el elemento
				if (! hidden) {
					showHide ([elem]);
				}
				dataPriv.remove (elem, "fxshow");
				para (prop en orig) {
					jQuery.style (elem, prop, orig [prop]);
				}
			});
		}

		// Configuración por propiedad
		propTween = createTween (hidden? dataShow [prop]: 0, prop, anim);
		if (! (prop en dataShow)) {
			dataShow [prop] = propTween.start;
			if (oculto) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

función propFilter (props, specialEasing) {
	índice var, nombre, suavizado, valor, ganchos;

	// camelCase, specialEasing y expandir el paso cssHook
	for (index in props) {
		name = camelCase (índice);
		easing = specialEasing [nombre];
		value = props [índice];
		if (Array.isArray (value)) {
			easing = valor [1];
			value = props [index] = value [0];
		}

		if (index! == nombre) {
			apoyos [nombre] = valor;
			eliminar accesorios [índice];
		}

		hooks = jQuery.cssHooks [nombre];
		if (hooks && "expand" en ganchos) {
			value = hooks.expand (valor);
			eliminar accesorios [nombre];

			// No del todo $ .extend, esto no sobrescribirá las claves existentes.
			// Reutilizando 'index' porque tenemos el "nombre" correcto
			for (index in value) {
				if (! (index in props)) {
					accesorios [índice] = valor [índice];
					specialEasing [index] = facilitación;
				}
			}
		} else {
			specialEasing [name] = easing;
		}
	}
}

función Animación (elem, propiedades, opciones) {
	var resultado,
		detenido,
		índice = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred (). always (function () {

			// No coincide elem en el: selector animado
			eliminar tick.elem;
		}),
		tick = function () {
			if (detenido) {
				falso retorno;
			}
			var currentTime = fxNow || createFxNow (),
				remaining = Math.max (0, animation.startTime + animation.duration - currentTime),

				// Soporte: solo Android 2.3
				// Error de colisión arcaico no nos permitirá usar `1 - (0.5 || 0)` (# 12497)
				temp = remaining / animation.duration || 0,
				porcentaje = 1 - temperatura,
				índice = 0,
				length = animation.tweens.length;

			for (; index <length; index ++) {
				animation.tweens [índice] .run (porcentaje);
			}

			deferred.notifyWith (elem, [animación, porcentaje, restante]);

			// Si hay más que hacer, cede
			if (porcentaje <1 && length) {
				regreso restante;
			}

			// Si esta era una animación vacía, sintetice una notificación de progreso final
			if (! length) {
				deferred.notifyWith (elem, [animación, 1, 0]);
			}

			// Resolver la animación e informar su conclusión
			deferred.resolveWith (elem, [animación]);
			falso retorno;
		},
		animation = deferred.promise ({
			elem: elem,
			accesorios: jQuery.extend ({}, propiedades),
			opts: jQuery.extend (true, {
				specialEasing: {},
				facilitación: jQuery.easing._default
			}, opciones),
			originalProperties: propiedades,
			originalOptions: opciones,
			startTime: fxNow || createFxNow (),
			duración: options.duration,
			tweens: [],
			createTween: function (prop, end) {
				var tween = jQuery.Tween (elem, animation.opts, prop, end,
						animation.opts.specialEasing [prop] || animation.opts.easing);
				animation.tweens.push (interpolación);
				devolver la interpolación;
			},
			stop: function (gotoEnd) {
				índice var = 0,

					// Si vamos al final, queremos ejecutar todos los tweens
					// de lo contrario nos salteamos esta parte
					length = gotoEnd? animation.tweens.length: 0;
				if (detenido) {
					devuelve esto;
				}
				parado = verdadero;
				for (; index <length; index ++) {
					animation.tweens [index] .run (1);
				}

				// Resolvemos cuando jugamos el último cuadro; de lo contrario, rechaza
				if (gotoEnd) {
					deferred.notifyWith (elem, [animación, 1, 0]);
					deferred.resolveWith (elem, [animation, gotoEnd]);
				} else {
					deferred.rejectWith (elem, [animación, gotoEnd]);
				}
				devuelve esto;
			}
		}),
		props = animation.props;

	propFilter (props, animation.opts.specialEasing);

	for (; index <length; index ++) {
		result = Animation.prefilters [index] .call (animación, elem, props, animation.opts);
		if (resultado) {
			if (isFunction (result.stop)) {
				jQuery._queueHooks (animation.elem, animation.opts.queue) .stop =
					result.stop.bind (resultado);
			}
			resultado de devolución;
		}
	}

	jQuery.map (props, createTween, animación);

	if (isFunction (animation.opts.start)) {
		animation.opts.start.call (elem, animación);
	}

	// Adjuntar devoluciones de llamadas de opciones
	animación
		.progress (animation.opts.progress)
		.done (animation.opts.done, animation.opts.complete)
		.fail (animation.opts.fail)
		.always (animation.opts.always);

	jQuery.fx.timer (
		jQuery.extend (tick, {
			elem: elem,
			anim: animación,
			queue: animation.opts.queue
		})
	);

	vuelta de animación;
}

jQuery.Animation = jQuery.extend (Animación, {

	tweeners: {
		"*": [función (prop, valor) {
			var tween = this.createTween (prop, value);
			adjustCSS (tween.elem, prop, rcssNum.exec (valor), interpolación);
			devolver la interpolación;
		}]
	},

	tweener: function (props, callback) {
		if (isFunction (props)) {
			devolución de llamada = accesorios;
			props = ["*"];
		} else {
			props = props.match (rnothtmlwhite);
		}

		var prop,
			índice = 0,
			length = props.length;

		for (; index <length; index ++) {
			prop = props [índice];
			Animation.tweeners [prop] = Animation.tweeners [prop] || [];
			Animation.tweeners [prop] .unshift (devolución de llamada);
		}
	},

	prefiltros: [defaultPrefilter],

	prefiltro: función (devolución de llamada, anteponer) {
		if (prepend) {
			Animation.prefilters.unshift (devolución de llamada);
		} else {
			Animation.prefilters.push (devolución de llamada);
		}
	}
});

jQuery.speed = function (speed, easing, fn) {
	var opt = speed && typeof speed === "object"? jQuery.extend ({}, velocidad): {
		completo: fn || ! fn && easing ||
			isFunction (velocidad) && velocidad,
		duración: velocidad,
		facilitación: fn y& easing || facilitando &&! isFunction (easing) && easing
	};

	// Ir al estado final si fx está desactivado
	if (jQuery.fx.off) {
		opt.duration = 0;

	} else {
		if (typeof opt.duration! == "number") {
			if (opt.duration en jQuery.fx.speeds) {
				opt.duration = jQuery.fx.speeds [opt.duration];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalizar opt.queue - true / undefined / null -> "fx"
	if (opt.queue == null || opt.queue === true) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function () {
		if (isFunction (opt.old)) {
			opt.old.call (esto);
		}

		if (opt.queue) {
			jQuery.dequeue (esto, opt.queue);
		}
	};

	return opt;
};

jQuery.fn.extend ({
	fadeTo: function (speed, to, easing, callback) {

		// Muestra cualquier elemento oculto después de configurar la opacidad a 0
		devuelve this.filter (isHiddenWithinTree) .css ("opacity", 0) .show ()

			// Animar al valor especificado
			.end (). animate ({opacity: to}, speed, easing, callback);
	},
	animate: function (prop, speed, easing, callback) {
		var empty = jQuery.isEmptyObject (prop),
			optall = jQuery.speed (velocidad, suavizado, devolución de llamada),
			doAnimation = function () {

				// Operar en una copia de prop para que el easing por propiedad no se pierda
				var anim = Animación (esto, jQuery.extend ({}, prop), optall);

				// Las animaciones vacías o el acabado se resuelven inmediatamente
				if (empty || dataPriv.get (this, "finish")) {
					anim.stop (verdadero);
				}
			};
			doAnimation.finish = doAnimation;

		regresa vacío || optall.queue === ¿falso?
			this.each (doAnimation):
			this.queue (optall.queue, doAnimation);
	},
	stop: function (type, clearQueue, gotoEnd) {
		var stopQueue = function (hooks) {
			var stop = hooks.stop;
			eliminar hooks.stop;
			detener (gotoEnd);
		};

		if (tipo de tipo! == "cadena") {
			gotoEnd = clearQueue;
			clearQueue = tipo;
			tipo = indefinido;
		}
		if (clearQueue && type! == false) {
			this.queue (tipo || "fx", []);
		}

		return this.each (function () {
			var dequeue = true,
				index = type! = null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get (this);

			if (índice) {
				if (data [index] && data [index] .stop) {
					stopQueue (datos [índice]);
				}
			} else {
				for (index in data) {
					if (data [index] && data [index] .stop && rrun.test (index)) {
						stopQueue (datos [índice]);
					}
				}
			}

			for (index = timers.length; index--;) {
				if (timers [index] .elem === this &&
					(tipo == null || temporizadores [índice] .queue === tipo)) {

					temporizadores [index] .anim.stop (gotoEnd);
					dequeue = falso;
					timers.splice (índice, 1);
				}
			}

			// Inicie el siguiente en la cola si el último paso no fue forzado.
			// Timers actualmente llamará a sus callbacks completos, que
			// dequeue pero solo si fueron goto End.
			if (dequeue ||! gotoEnd) {
				jQuery.dequeue (esto, tipo);
			}
		});
	},
	finalizar: función (tipo) {
		if (type! == false) {
			tipo = tipo || "fx";
		}
		return this.each (function () {
			índice var,
				data = dataPriv.get (esto),
				queue = data [type + "queue"],
				hooks = data [type + "queueHooks"],
				timers = jQuery.timers,
				longitud = cola? queue.length: 0;

			// Habilita el indicador de finalización en datos privados
			data.finish = true;

			// Vaciar la cola primero
			jQuery.queue (esto, tipo, []);

			if (hooks && hooks.stop) {
				hooks.stop.call (esto, verdadero);
			}

			// Busca cualquier animación activa y finaliza
			for (index = timers.length; index--;) {
				if (timers [index] .elem === this && timers [index] .queue === type) {
					temporizadores [índice] .anim.stop (verdadero);
					timers.splice (índice, 1);
				}
			}

			// Busca cualquier animación en la cola anterior y finaliza
			for (index = 0; index <length; index ++) {
				if (queue [índice] && queue [índice] .finish) {
					queue [index] .finish.call (this);
				}
			}

			// Desactivar la bandera de acabado
			eliminar data.finish;
		});
	}
});

jQuery.each (["alternar", "mostrar", "ocultar"], función (i, nombre) {
	var cssFn = jQuery.fn [nombre];
	jQuery.fn [name] = function (speed, easing, callback) {
		velocidad de retorno == nulo || typeof speed === "boolean"?
			cssFn.apply (esto, argumentos):
			this.animate (genFx (nombre, verdadero), velocidad, suavizado, devolución de llamada);
	};
});

// Generar atajos para animaciones personalizadas
jQuery.each ({
	slideDown: genFx ("mostrar"),
	slideUp: genFx ("ocultar"),
	slideToggle: genFx ("alternar"),
	fadeIn: {opacity: "show"},
	fadeOut: {opacity: "hide"},
	fadeToggle: {opacity: "toggle"}
}, function (name, props) {
	jQuery.fn [name] = function (speed, easing, callback) {
		devuelve this.animate (accesorios, velocidad, relajación, devolución de llamada);
	};
});

jQuery.timers = [];
jQuery.fx.tick = function () {
	temporizador var,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now ();

	para (; i <timers.length; i ++) {
		timer = temporizadores [i];

		// Ejecuta el temporizador y lo elimina con seguridad cuando termina (lo que permite la eliminación externa)
		if (! timer () && timers [i] === timer) {
			timers.splice (i--, 1);
		}
	}

	if (! timers.length) {
		jQuery.fx.stop ();
	}
	fxNow = indefinido;
};

jQuery.fx.timer = function (timer) {
	jQuery.timers.push (temporizador);
	jQuery.fx.start ();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function () {
	if (inProgress) {
		regreso;
	}

	inProgress = verdadero;
	programar();
};

jQuery.fx.stop = function () {
	inProgress = null;
};

jQuery.fx.speeds = {
	lento: 600,
	rápido: 200,

	// Velocidad predeterminada
	_default: 400
};


// Basado en el plugin de Clint Helfers, con permiso.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function (time, type) {
	tiempo = jQuery.fx? jQuery.fx.speeds [time] || tiempo tiempo;
	tipo = tipo || "fx";

	return this.queue (type, function (next, hooks) {
		var timeout = window.setTimeout (next, time);
		hooks.stop = function () {
			window.clearTimeout (tiempo de espera);
		};
	});
};


(función () {
	var input = document.createElement ("entrada"),
		select = document.createElement ("seleccionar"),
		opt = select.appendChild (document.createElement ("opción"));

	input.type = "casilla de verificación";

	// Soporte: Android <= 4.3 solamente
	// El valor predeterminado para una casilla de verificación debe estar "activado"
	support.checkOn = input.value! == "";

	// Soporte: IE <= 11 solamente
	// Debes acceder a selectedIndex para hacer que las opciones predeterminadas seleccionen
	support.optSelected = opt.selected;

	// Soporte: IE <= 11 solamente
	// Una entrada pierde su valor después de convertirse en una radio
	input = document.createElement ("entrada");
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
}) ();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend ({
	attr: function (nombre, valor) {
		acceso de retorno (esto, jQuery.attr, nombre, valor, arguments.length> 1);
	},

	removeAttr: function (name) {
		return this.each (function () {
			jQuery.removeAttr (this, name);
		});
	}
});

jQuery.extend ({
	attr: función (elem, nombre, valor) {
		var ret, hooks,
			nType = elem.nodeType;

		// No obtener / establecer atributos en los nodos de texto, comentario y atributo
		if (nType === 3 || nType === 8 || nType === 2) {
			regreso;
		}

		// Fallback to prop cuando los atributos no son compatibles
		if (typeof elem.getAttribute === "undefined") {
			return jQuery.prop (elem, nombre, valor);
		}

		// Los ganchos de atributo están determinados por la versión en minúsculas
		// Tomar gancho necesario si se define uno
		if (nType! == 1 ||! jQuery.isXMLDoc (elem)) {
			hooks = jQuery.attrHooks [name.toLowerCase ()] ||
				(jQuery.expr.match.bool.test (name)? boolHook: undefined);
		}

		if (value! == undefined) {
			if (value === null) {
				jQuery.removeAttr (elem, nombre);
				regreso;
			}

			if (hooks && "set" en ganchos &&
				(ret = hooks.set (elem, value, name))! == undefined) {
				return ret;
			}

			elem.setAttribute (name, value + "");
			valor de retorno;
		}

		if (hooks && "get" en los ganchos && (ret = hooks.get (elem, name))!! == null) {
			return ret;
		}

		ret = jQuery.find.attr (elem, nombre);

		// Los atributos inexistentes devuelven nulo, normalizamos a indefinido
		return ret == null? undefined: ret;
	},

	attrHooks: {
		tipo: {
			set: function (elem, value) {
				if (! support.radioValue && value === "radio" &&
					nodeName (elem, "input")) {
					var val = elem.value;
					elem.setAttribute ("tipo", valor);
					if (val) {
						elem.value = val;
					}
					valor de retorno;
				}
			}
		}
	},

	removeAttr: function (elem, value) {
		var nombre,
			i = 0,

			// Los nombres de atributos pueden contener caracteres de espacios en blanco que no sean HTML
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match (rnothtmlwhite);

		if (attrNames && elem.nodeType === 1) {
			while ((name = attrNames [i ++])) {
				elem.removeAttribute (nombre);
			}
		}
	}
});

// Ganchos para atributos booleanos
boolHook = {
	set: function (elem, value, name) {
		if (value === false) {

			// Eliminar atributos booleanos cuando se establece en falso
			jQuery.removeAttr (elem, nombre);
		} else {
			elem.setAttribute (nombre, nombre);
		}
		nombre de regreso;
	}
};

jQuery.each (jQuery.expr.match.bool.source.match (/ \ w + / g), función (i, nombre) {
	var getter = attrHandle [nombre] || jQuery.find.attr;

	attrHandle [name] = function (elem, name, isXML) {
		var ret, manejar,
			lowercaseName = name.toLowerCase ();

		if (! isXML) {

			// Evite un bucle infinito al eliminar temporalmente esta función del getter
			handle = attrHandle [minúsculasName];
			attrHandle [lowercaseName] = ret;
			ret = getter (elem, name, isXML)! = null?
				lowercaseName:
				nulo;
			attrHandle [lowercaseName] = handle;
		}
		return ret;
	};
});




var rfocusable = / ^ (?: input | select | textarea | button) $ / i,
	rclickable = / ^ (?: a | área) $ / i;

jQuery.fn.extend ({
	prop: function (nombre, valor) {
		acceso de retorno (esto, jQuery.prop, name, value, arguments.length> 1);
	},

	removeProp: function (name) {
		return this.each (function () {
			elimine esto [jQuery.propFix [nombre] || nombre ];
		});
	}
});

jQuery.extend ({
	prop: function (elem, name, value) {
		var ret, hooks,
			nType = elem.nodeType;

		// No obtener / establecer propiedades en los nodos de texto, comentario y atributo
		if (nType === 3 || nType === 8 || nType === 2) {
			regreso;
		}

		if (nType! == 1 ||! jQuery.isXMLDoc (elem)) {

			// arreglar el nombre y adjuntar ganchos
			name = jQuery.propFix [nombre] || nombre;
			hooks = jQuery.propHooks [nombre];
		}

		if (value! == undefined) {
			if (hooks && "set" en ganchos &&
				(ret = hooks.set (elem, value, name))! == undefined) {
				return ret;
			}

			return (elem [nombre] = valor);
		}

		if (hooks && "get" en los ganchos && (ret = hooks.get (elem, name))!! == null) {
			return ret;
		}

		return elem [nombre];
	},

	PropHooks: {
		tabIndex: {
			get: function (elem) {

				// Soporte: IE <= 9 - 11 solamente
				// elem.tabIndex no siempre devuelve el
				// valor correcto cuando no se ha establecido explícitamente
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Usa recuperación de atributos adecuada (# 12072)
				var tabindex = jQuery.find.attr (elem, "tabindex");

				if (tabindex) {
					return parseInt (tabindex, 10);
				}

				Si (
					rfocusable.test (elem.nodeName) ||
					rclickable.test (elem.nodeName) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"para": "htmlFor",
		"clase": "className"
	}
});

// Soporte: IE <= 11 solamente
// Accediendo a la propiedad selectedIndex
// obliga al navegador a respetar la configuración seleccionada
// en la opción
// El getter asegura que se selecciona una opción predeterminada
// cuando en un optgroup
// regla de eslint "expresiones no utilizadas" está deshabilitada para este código
// ya que considera tales accesiones noop
if (! support.optSelected) {
	jQuery.propHooks.selected = {
		get: function (elem) {

			/ * eslint no-unused-expressions: "off" * /

			var parent = elem.parentNode;
			if (padre && parent.parentNode) {
				parent.parentNode.selectedIndex;
			}
			devolver nulo;
		},
		set: function (elem) {

			/ * eslint no-unused-expressions: "off" * /

			var parent = elem.parentNode;
			if (padre) {
				parent.selectedIndex;

				if (parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each ([
	"tabIndex",
	"solo lectura",
	"longitud máxima",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"Frontera del marco",
	"contentEditable"
], función () {
	jQuery.propFix [this.toLowerCase ()] = this;
});




	// Franja y contracción de espacios en blanco de acuerdo con las especificaciones de HTML
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	función stripAndCollapse (valor) {
		var tokens = value.match (rnothtmlwhite) || [];
		return tokens.join ("");
	}


function getClass (elem) {
	return elem.getAttribute && elem.getAttribute ("clase") || "";
}

function classesToArray (valor) {
	if (Array.isArray (value)) {
		valor de retorno;
	}
	if (tipo de valor === "cadena") {
		return value.match (rnothtmlwhite) || [];
	}
	regreso [];
}

jQuery.fn.extend ({
	addClass: function (value) {
		var clases, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if (isFunction (value)) {
			devuelve this.each (function (j) {
				jQuery (this) .addClass (value.call (this, j, getClass (this)));
			});
		}

		classes = classesToArray (valor);

		if (classes.length) {
			while ((elem = this [i ++])) {
				curValue = getClass (elem);
				cur = elem.nodeType === 1 && ("" + stripAndCollapse (curValue) + "");

				if (cur) {
					j = 0;
					while ((clazz = classes [j ++])) {
						if (cur.indexOf ("" + clazz + "") <0) {
							cur + = clazz + "";
						}
					}

					// Solo asigne si es diferente para evitar el renderizado innecesario.
					finalValue = stripAndCollapse (cur);
					if (curValue! == valor final) {
						elem.setAttribute ("clase", valor final);
					}
				}
			}
		}

		devuelve esto;
	},

	removeClass: function (value) {
		var clases, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if (isFunction (value)) {
			devuelve this.each (function (j) {
				jQuery (this) .removeClass (value.call (this, j, getClass (this)));
			});
		}

		if (! arguments.length) {
			devuelve this.attr ("clase", "");
		}

		classes = classesToArray (valor);

		if (classes.length) {
			while ((elem = this [i ++])) {
				curValue = getClass (elem);

				// Esta expresión está aquí para una mejor compresibilidad (ver addClass)
				cur = elem.nodeType === 1 && ("" + stripAndCollapse (curValue) + "");

				if (cur) {
					j = 0;
					while ((clazz = classes [j ++])) {

						// Eliminar * todas las instancias
						while (cur.indexOf ("" + clazz + "")> -1) {
							cur = cur.replace ("" + clazz + "", "");
						}
					}

					// Solo asigne si es diferente para evitar el renderizado innecesario.
					finalValue = stripAndCollapse (cur);
					if (curValue! == valor final) {
						elem.setAttribute ("clase", valor final);
					}
				}
			}
		}

		devuelve esto;
	},

	toggleClass: function (value, stateVal) {
		var type = typeof value,
			isValidValue = tipo === "cadena" || Array.isArray (valor);

		if (typeof stateVal === "boolean" && isValidValue) {
			return stateVal? this.addClass (value): this.removeClass (value);
		}

		if (isFunction (value)) {
			return this.each (función (i) {
				jQuery (this) .toggleClass (
					value.call (this, i, getClass (this), stateVal),
					stateVal
				);
			});
		}

		return this.each (function () {
			var className, i, self, classNames;

			if (isValidValue) {

				// Alternar nombres de clases individuales
				i = 0;
				self = jQuery (esto);
				classNames = classesToArray (valor);

				while ((className = classNames [i ++])) {

					// Verifica cada className dado, lista de espacios separados
					if (self.hasClass (className)) {
						self.removeClass (className);
					} else {
						self.addClass (className);
					}
				}

			// Alternar nombre de clase completo
			} else if (value === undefined || type === "boolean") {
				className = getClass (this);
				if (className) {

					// Almacenar className si se establece
					dataPriv.set (this, "__className__", className);
				}

				// Si el elemento tiene un nombre de clase o si pasamos `falso`,
				// luego elimina el nombre de clase completo (si lo hubo, lo guardó anteriormente).
				// De lo contrario, devuelve lo que se guardó previamente (si hay algo),
				// volver a la cadena vacía si no se almacenó nada.
				if (this.setAttribute) {
					this.setAttribute ("clase",
						className || valor === falso?
						"":
						dataPriv.get (this, "__className__") || ""
					);
				}
			}
		});
	},

	hasClass: function (selector) {
		var className, elem,
			i = 0;

		className = "" + selector + "";
		while ((elem = this [i ++])) {
			if (elem.nodeType === 1 &&
				("" + stripAndCollapse (getClass (elem)) + "") .indexOf (className)> -1) {
					devolver verdadero;
			}
		}

		falso retorno;
	}
});




var rreturn = / \ r / g;

jQuery.fn.extend ({
	val: función (valor) {
		var hooks, ret, valueIsFunction,
			elem = this [0];

		if (! arguments.length) {
			if (elem) {
				hooks = jQuery.valHooks [elem.type] ||
					jQuery.valHooks [elem.nodeName.toLowerCase ()];

				if (ganchos &&
					"obtener" en ganchos &&
					(ret = hooks.get (elem, "valor"))!! == undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Manejar los casos de cuerdas más comunes
				if (typeof ret === "cadena") {
					return ret.replace (rreturn, "");
				}

				// Manejar casos donde el valor es nulo / undef o número
				return ret == null? "": ret;
			}

			regreso;
		}

		valueIsFunction = isFunction (valor);

		return this.each (función (i) {
			var val;

			if (this.nodeType! == 1) {
				regreso;
			}

			if (valueIsFunction) {
				val = value.call (this, i, jQuery (this) .val ());
			} else {
				val = valor;
			}

			// Tratar nulo / indefinido como ""; convertir números a cadena
			if (val == null) {
				val = "";

			} else if (typeof val === "número") {
				val + = "";

			} else if (Array.isArray (val)) {
				val = jQuery.map (val, function (value) {
					valor de retorno == nulo? "": valor + "";
				});
			}

			hooks = jQuery.valHooks [this.type] || jQuery.valHooks [this.nodeName.toLowerCase ()];

			// Si el conjunto devuelve indefinido, vuelve a la configuración normal
			if (! hooks ||! ("set" en los ganchos) || hooks.set (this, val, "value") === undefined) {
				this.value = val;
			}
		});
	}
});

jQuery.extend ({
	valHooks: {
		opción: {
			get: function (elem) {

				var val = jQuery.find.attr (elem, "valor");
				return val! = null?
					Val:

					// Soporte: IE <= 10 - 11 solamente
					// option.text arroja excepciones (# 14686, # 14858)
					// Franja y contracción del espacio en blanco
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse (jQuery.text (elem));
			}
		},
		seleccionar: {
			get: function (elem) {
				valor de var, opción, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					valores = uno? nulo : [],
					max = uno? índice + 1: opciones.length;

				if (índice <0) {
					i = max;

				} else {
					i = uno? índice: 0;
				}

				// Pasa por todas las opciones seleccionadas
				para (; i <max; i ++) {
					option = opciones [i];

					// Soporte: IE <= 9 solamente
					// IE8-9 no actualiza seleccionado después de restablecer el formulario (# 2551)
					if ((opción.selected || i === index) &&

							// No devuelve las opciones que están deshabilitadas o en un grupo de opciones deshabilitado
							! option.disabled &&
							(! option.parentNode.disabled ||
								! nodeName (option.parentNode, "optgroup"))) {

						// Obtenga el valor específico para la opción
						value = jQuery (option) .val ();

						// No necesitamos una matriz para una selecciona
						si uno ) {
							valor de retorno;
						}

						// Multi-Selects devuelve una matriz
						values.push (valor);
					}
				}

				valores de retorno;
			},

			set: function (elem, value) {
				var optionSet, option,
					options = elem.options,
					values ​​= jQuery.makeArray (valor),
					i = opciones.length;

				mientras yo-- ) {
					option = opciones [i];

					/ * eslint-disable no-cond-assign * /

					if (option.selected =
						jQuery.inArray (jQuery.valHooks.option.get (opción), valores)> -1
					) {
						optionSet = verdadero;
					}

					/ * eslint-enable no-cond-assign * /
				}

				// Forzar a los navegadores a comportarse de manera consistente cuando se establece un valor no coincidente
				if (! optionSet) {
					elem.selectedIndex = -1;
				}
				valores de retorno;
			}
		}
	}
});

// Radios y casillas de verificación getter / setter
jQuery.each (["radio", "casilla de verificación"], función () {
	jQuery.valHooks [this] = {
		set: function (elem, value) {
			if (Array.isArray (value)) {
				return (elem.checked = jQuery.inArray (jQuery (elem) .val (), valor)> -1);
			}
		}
	};
	if (! support.checkOn) {
		jQuery.valHooks [this] .get = function (elem) {
			return elem.getAttribute ("valor") === nulo? "on": elem.value;
		};
	}
});




// Devuelve jQuery para la inclusión de atributos solamente


support.focusin = "onfocusin" en la ventana;


var rfocusMorph = / ^ (?: focusinfocus | focusoutblur) $ /,
	stopPropagationCallback = function (e) {
		e.stopPropagation ();
	};

jQuery.extend (jQuery.event, {

	trigger: function (event, data, elem, onlyHandlers) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [elem || documento],
			type = hasOwn.call (event, "type")? event.type: event,
			namespaces = hasOwn.call (event, "namespace")? event.namespace.split ("."): [];

		cur = lastElement = tmp = elem = elem || documento;

		// No hacer eventos en el texto y nodos de comentarios
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			regreso;
		}

		// enfoca / difumina morfos para enfocar / salir; asegurarse de que no los estamos disparando en este momento
		if (rfocusMorph.test (tipo + jQuery.event.triggered)) {
			regreso;
		}

		if (type.indexOf (".")> -1) {

			// disparador espaciado de nombres; crear una expresión regular para hacer coincidir el tipo de evento en handle ()
			namespaces = type.split (".");
			type = namespaces.shift ();
			namespaces.sort ();
		}
		ontype = type.indexOf (":") <0 && "on" + type;

		// La persona que llama puede pasar un objeto jQuery.Event, Object o simplemente una cadena de tipo de evento
		event = event [jQuery.expando]?
			evento:
			nuevo jQuery.Event (tipo, tipo de evento === "objeto" && evento);

		// Trigger bitmask: & 1 para controladores nativos; & 2 para jQuery (siempre verdadero)
		event.isTrigger = onlyHandlers? 2: 3;
		event.namespace = namespaces.join (".");
		event.rnamespace = event.namespace?
			nuevo RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\. |)") + "(\\. | $)"):
			nulo;

		// Limpiar el evento en caso de que se reutilice
		event.result = undefined;
		if (! event.target) {
			event.target = elem;
		}

		// Clonar cualquier información entrante y anteponer el evento, creando la lista de argumentos del manejador
		data = data == null?
			[evento]:
			jQuery.makeArray (datos, [evento]);

		// Permitir que los eventos especiales dibujen fuera de las líneas
		especial = jQuery.event.special [tipo] || {};
		if (! onlyHandlers && special.trigger && special.trigger.apply (elem, data) === false) {
			regreso;
		}

		// Determine la ruta de propagación del evento de antemano, según la especificación de eventos W3C (# 9951)
		// Burbuja para documentar, luego para ventana; busque un propietario globalDocument var (# 9724)
		if (! onlyHandlers &&! special.noBubble &&! isWindow (elem)) {

			bubbleType = special.delegateType || tipo;
			if (! rfocusMorph.test (tipo de burbuja + tipo)) {
				cur = cur.parentNode;
			}
			for (; cur; cur = cur.parentNode) {
				eventPath.push (cur);
				tmp = cur;
			}

			// Solo agregue la ventana si tenemos que documentar (p. Ej., No obj o DOM separado)
			if (tmp === (elem.ownerDocument || documento)) {
				eventPath.push (tmp.defaultView || tmp.parentWindow || ventana);
			}
		}

		// Controladores de fuego en la ruta del evento
		i = 0;
		while ((cur = eventPath [i ++]) &&! event.isPropagationStopped ()) {
			lastElement = cur;
			event.type = i> 1?
				bubbleType:
				special.bindType || tipo;

			// manejador jQuery
			handle = (dataPriv.get (cur, "events") || {}) [event.type] &&
				dataPriv.get (cur, "handle");
			if (handle) {
				handle.apply (cur, data);
			}

			// Controlador nativo
			handle = ontype && cur [ontype];
			if (manejar && handle.apply && acceptData (cur)) {
				event.result = handle.apply (cur, data);
				if (event.result === false) {
					event.preventDefault ();
				}
			}
		}
		event.type = tipo;

		// Si nadie impidió la acción predeterminada, hazlo ahora
		if (! onlyHandlers &&! event.isDefaultPrevented ()) {

			if ((! special._default ||
				special._default.apply (eventPath.pop (), data) === false) &&
				acceptData (elem)) {

				// Llamar a un método DOM nativo en el destino con el mismo nombre que el evento.
				// No haga acciones predeterminadas en la ventana, ahí es donde se encuentran las variables globales (# 6170)
				if (ontype && isFunction (elem [type]) &&! isWindow (elem)) {

					// No vuelva a activar un evento onFOO cuando llamemos a su método FOO ()
					tmp = elem [ontype];

					if (tmp) {
						elem [ontype] = null;
					}

					// Prevenir el reinicio del mismo evento, ya que ya lo borramos
					jQuery.event.triggered = tipo;

					if (event.isPropagationStopped ()) {
						lastElement.addEventListener (type, stopPropagationCallback);
					}

					elem [tipo] ();

					if (event.isPropagationStopped ()) {
						lastElement.removeEventListener (type, stopPropagationCallback);
					}

					jQuery.event.triggered = undefined;

					if (tmp) {
						elem [ontype] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Aprovechar un evento de donantes para simular uno diferente
	// Usado solo para eventos `focus (in | out)`
	simular: función (tipo, elemento, evento) {
		var e = jQuery.extend (
			nuevo jQuery.Event (),
			evento,
			{
				tipo: tipo,
				isSimulated: true
			}
		);

		jQuery.event.trigger (e, null, elem);
	}

});

jQuery.fn.extend ({

	trigger: function (type, data) {
		return this.each (function () {
			jQuery.event.trigger (tipo, datos, esto);
		});
	},
	triggerHandler: function (type, data) {
		var elem = this [0];
		if (elem) {
			return jQuery.event.trigger (tipo, datos, elem, verdadero);
		}
	}
});


// Soporte: Firefox <= 44
// Firefox no tiene eventos de enfoque (in | out)
// Boleto relacionado - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Soporte: Chrome <= 48 - 49, Safari <= 9.0 - 9.1
// focus (in | out) los eventos se disparan después de los eventos focus y blur,
// que es violación de especificaciones - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Boleto relacionado - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if (! support.focusin) {
	jQuery.each ({focus: "focusin", desenfoque: "focusout"}, función (orig, corregir) {

		// Adjunte un único controlador de captura en el documento mientras alguien quiere focusin / focusout
		var handler = function (event) {
			jQuery.event.simulate (fix, event.target, jQuery.event.fix (event));
		};

		jQuery.event.special [fix] = {
			setup: function () {
				var doc = this.ownerDocument || esta,
					attach = dataPriv.access (doc, fix);

				if (! attachments) {
					doc.addEventListener (orig, handler, true);
				}
				dataPriv.access (doc, fix, (attach || 0) + 1);
			},
			desmontaje: función () {
				var doc = this.ownerDocument || esta,
					attach = dataPriv.access (doc, fix) - 1;

				if (! attachments) {
					doc.removeEventListener (orig, handler, true);
					dataPriv.remove (doc, fix);

				} else {
					dataPriv.access (doc, fix, attach);
				}
			}
		};
	});
}
var location = window.location;

var nonce = Date.now ();

var rquery = (/ \? /);



// Análisis cruzado de xml
jQuery.parseXML = function (data) {
	var xml;
	if (! data || typeof data! == "cadena") {
		devolver nulo;
	}

	// Soporte: IE 9 - 11 solamente
	// IE arroja parseFromString con entrada no válida.
	tratar {
		xml = (new window.DOMParser ()) .parseFromString (datos, "texto / xml");
	} catch (e) {
		xml = indefinido;
	}

	if (! xml || xml.getElementsByTagName ("parsererror") .length) {
		jQuery.error ("XML no válido:" + datos);
	}
	devolver xml;
};


var
	rbracket = / \ [\] $ /,
	rCRLF = / \ r? \ n / g,
	rsubmitterTypes = / ^ (?: submit | button | image | reset | file) $ / i,
	rsubmittable = / ^ (?: input | select | textarea | keygen) / i;

function buildParams (prefix, obj, traditional, add) {
	var nombre;

	if (Array.isArray (obj)) {

		// serializar el elemento de la matriz.
		jQuery.each (obj, función (i, v) {
			if (traditional || rbracket.test (prefix)) {

				// Trata cada elemento de la matriz como un escalar.
				agregar (prefijo, v);

			} else {

				// El elemento no es escalar (matriz u objeto), codifica su índice numérico.
				buildParams (
					prefix + "[" + (typeof v === "object" && v! = null? i: "") + "]",
					v,
					tradicional,
					añadir
				);
			}
		});

	} else if (! traditional && toType (obj) === "object") {

		// serializar el elemento del objeto.
		para (nombre en obj) {
			buildParams (prefijo + "[" + nombre + "]", obj [nombre], tradicional, agregar);
		}

	} else {

		// Serializar elemento escalar.
		agregar (prefijo, obj);
	}
}

// serializar una matriz de elementos de formulario o un conjunto de
// clave / valores en una cadena de consulta
jQuery.param = function (a, traditional) {
	prefijo var,
		s = [],
		add = function (key, valueOrFunction) {

			// Si el valor es una función, inícielo y use su valor de retorno
			var value = isFunction (valueOrFunction)?
				valueOrFunction ():
				valueOrFunction;

			s [s.length] = encodeURIComponent (key) + "=" +
				encodeURIComponent (value == null? "": value);
		};

	// Si se pasó una matriz, supongamos que es una matriz de elementos de formulario.
	if (Array.isArray (a) || (a.jquery &&! jQuery.isPlainObject (a))) {

		// serializar los elementos del formulario
		jQuery.each (a, function () {
			add (this.name, this.value);
		});

	} else {

		// Si es tradicional, codifique la forma "antigua" (la forma 1.3.2 o anterior)
		// lo hizo), de lo contrario codifica params recursivamente.
		para (prefijo en a) {
			buildParams (prefix, a [prefix], traditional, add);
		}
	}

	// Devuelve la serialización resultante
	return s.join ("&");
};

jQuery.fn.extend ({
	serialize: function () {
		return jQuery.param (this.serializeArray ());
	},
	serializeArray: function () {
		return this.map (function () {

			// Se puede agregar propHook para "elementos" para filtrar o agregar elementos de formulario
			var elements = jQuery.prop (this, "elementos");
			elementos de retorno? jQuery.makeArray (elementos): esto;
		})
		.filter (función () {
			var type = this.type;

			// Use .is (": disabled") para que fieldset [disabled] funcione
			devuelve this.name &&! jQuery (this) .is (": disabled") &&
				rsubmittable.test (this.nodeName) &&! rsubmitterTypes.test (tipo) &&
				(this.checked ||! rcheckableType.test (type));
		})
		.map (función (i, elem) {
			var val = jQuery (this) .val ();

			if (val == null) {
				devolver nulo;
			}

			if (Array.isArray (val)) {
				return jQuery.map (val, function (val) {
					return {name: elem.name, value: val.replace (rCRLF, "\ r \ n")};
				});
			}

			return {name: elem.name, value: val.replace (rCRLF, "\ r \ n")};
		} ).obtener();
	}
});


var
	r20 = /% 20 / g,
	rhash = /#.*$/,
	rantiCache = / ([? &]) _ = [^ &] * /,
	rheaders = / ^ (. *?): [\ t] * ([^ \ r \ n] *) $ / mg,

	// # 7653, # 8125, # 8152: detección de protocolo local
	rlocalProtocol = /^(?:about|app|app-storage|++extension|file|res|widget):$/,
	rnoContent = / ^ (?: GET | HEAD) $ /,
	rprotocol = / ^ \ / \ //,

	/ * Prefiltros
	 * 1) Son útiles para introducir tipos de datos personalizados (consulte ajax / jsonp.js para ver un ejemplo)
	 * 2) Estos se llaman:
	 * - ANTES de pedir un transporte
	 * - DESPUÉS de la serialización de param (los datos son una cadena si s.processData es verdadero)
	 * 3) la clave es el tipo de datos
	 * 4) el símbolo de catchall "*" se puede usar
	 * 5) la ejecución comenzará con el tipo de datos de transporte y luego continuará hasta "*" si es necesario
	 * /
	prefilters = {},

	/ * Enlaces de transporte
	 * 1) clave es el tipo de datos
	 * 2) el símbolo de catchall "*" se puede usar
	 * 3) la selección comenzará con el tipo de datos de transporte y LUEGO irá a "*" si es necesario
	 * /
	transportes = {},

	// Evitar la secuencia de comentario-prolog char (# 10098); debe aplacar la pelusa y evadir la compresión
	allTypes = "* /". concat ("*"),

	// Etiqueta de anclaje para analizar el origen del documento
	originAnchor = document.createElement ("a");
	originAnchor.href = location.href;

// Base "constructor" para jQuery.ajaxPrefilter y jQuery.ajaxTransport
función addToPrefiltersOrTransports (estructura) {

	// dataTypeExpression es opcional y su valor predeterminado es "*"
	función de retorno (dataTypeExpression, func) {

		if (typeof dataTypeExpression! == "cadena") {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase (). match (rnothtmlwhite) || [];

		if (isFunction (func)) {

			// Para cada tipo de datos en dataTypeExpression
			while ((dataType = dataTypes [i ++])) {

				// Anteponer si se solicita
				if (dataType [0] === "+") {
					dataType = dataType.slice (1) || "*";
					(structure [dataType] = structure [dataType] || []) .unshift (func);

				// De lo contrario, anexar
				} else {
					(structure [dataType] = structure [dataType] || []) .push (func);
				}
			}
		}
	};
}

// Función de inspección de base para prefiltros y transportes
function inspectPrefiltersOrTransports (structure, options, originalOptions, jqXHR) {

	var inspected = {},
		seekingTransport = (estructura === transportes);

	función inspeccionar (dataType) {
		var seleccionado;
		inspeccionado [dataType] = true;
		jQuery.each (structure [dataType] || [], function (_, prefilterOrFactory) {
			var dataTypeOrTransport = prefilterOrFactory (opciones, originalOptions, jqXHR);
			if (typeof dataTypeOrTransport === "string" &&
				! seekingTransport &&! inspected [dataTypeOrTransport]) {

				options.dataTypes.unshift (dataTypeOrTransport);
				inspeccionar (dataTypeOrTransport);
				falso retorno;
			} else if (seekingTransport) {
				return! (selected = dataTypeOrTransport);
			}
		});
		regreso seleccionado;
	}

	volver inspeccionar (options.dataTypes [0]) || ! inspeccionado ["*"] && inspeccionar ("*");
}

// Una extensión especial para las opciones de Ajax
// que toma opciones "planas" (no se debe extender en profundidad)
// Soluciones # 9887
function ajaxExtend (target, src) {
	var clave, profundo,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	para (clave en src) {
		if (src [clave]! == undefined) {
			(flatOptions [key]? target: (deep || (deep = {}))) [key] = src [key];
		}
	}
	si (profundo) {
		jQuery.extend (verdadero, objetivo, profundo);
	}

	objetivo de retorno;
}

/ * Maneja las respuestas a una solicitud ajax:
 * - encuentra el tipo de datos correcto (media entre el tipo de contenido y el tipo de datos esperado)
 * - devuelve la respuesta correspondiente
 * /
function ajaxHandleResponses (s, jqXHR, respuestas) {

	var ct, type, tipo de datos final, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Eliminar auto dataType y obtener content-type en el proceso
	while (dataTypes [0] === "*") {
		dataTypes.shift ();
		if (ct === undefined) {
			ct = s.mimeType || jqXHR.getResponseHeader ("Content-Type");
		}
	}

	// Compruebe si se trata de un tipo de contenido conocido
	if (ct) {
		para (escriba los contenidos) {
			if (contenidos [tipo] && contenidos [tipo] .test (ct)) {
				dataTypes.unshift (tipo);
				descanso;
			}
		}
	}

	// Verifique si tenemos una respuesta para el tipo de datos esperado
	if (dataTypes [0] en las respuestas) {
		finalDataType = dataTypes [0];
	} else {

		// Pruebe los tipos de datos convertibles
		para (escriba las respuestas) {
			if (! dataTypes [0] || s.converters [type + "" + dataTypes [0]]) {
				tipo_de_datos = tipo;
				descanso;
			}
			if (! firstDataType) {
				firstDataType = tipo;
			}
		}

		// O simplemente usa el primero
		finalDataType = tipo de datos final || firstDataType;
	}

	// Si encontramos un tipo de datos
	// Añadimos el tipo de datos a la lista si es necesario
	// y devolver la respuesta correspondiente
	if (tipo de datos final) {
		if (tipo de datos final! == tipos de datos [0]) {
			dataTypes.unshift (tipo de datos final);
		}
		respuestas de devolución [tipo de datos final];
	}
}

/ * Conversiones de cadena dada la solicitud y la respuesta original
 * También establece los campos de respuestaXXX en la instancia jqXHR
 * /
función ajaxConvert (s, response, jqXHR, isSuccess) {
	var conv2, actual, conv, tmp, prev,
		convertidores = {},

		// Trabaja con una copia de dataTypes en caso de que necesitemos modificarla para la conversión
		dataTypes = s.dataTypes.slice ();

	// Crear mapa de conversores con claves en minúsculas
	if (dataTypes [1]) {
		para (conv en s.converters) {
			convertidores [conv.toLowerCase ()] = s.converters [conv];
		}
	}

	current = dataTypes.shift ();

	// Convertir a cada tipo de datos secuenciales
	while (actual) {

		if (s.responseFields [current]) {
			jqXHR [s.responseFields [current]] = respuesta;
		}

		// Aplicar el filtro de datos si se proporciona
		if (! prev && isSuccess && s.dataFilter) {
			response = s.dataFilter (response, s.dataType);
		}

		prev = actual;
		current = dataTypes.shift ();

		if (actual) {

			// Solo hay trabajo por hacer si el dataType actual no es automático
			if (actual === "*") {

				current = prev;

			// Convierte respuesta si prev dataType no es automático y difiere de current
			} else if (prev! == "*" && prev! == current) {

				// Busca un convertidor directo
				conv = convertidores [prev + "" + current] || convertidores ["*" + actual];

				// Si no se encuentra ninguno, busca un par
				if (! conv) {
					for (conv2 en convertidores) {

						// Si las salidas de conv2 son actuales
						tmp = conv2.split ("");
						if (tmp [1] === current) {

							// Si prev se puede convertir a entrada aceptada
							conv = convertidores [prev + "" + tmp [0]] ||
								convertidores ["*" + tmp [0]];
							if (conv) {

								// Convertidores de equivalencia condensada
								if (conv === true) {
									conv = convertidores [conv2];

								// De lo contrario, inserte el tipo de datos intermedio
								} else if (convertidores [conv2]! == verdadero) {
									current = tmp [0];
									dataTypes.unshift (tmp [1]);
								}
								descanso;
							}
						}
					}
				}

				// Aplica el convertidor (si no es una equivalencia)
				if (conv! == true) {

					// A menos que se permita que los errores burbujeen, captúrelos y devuélvalos
					if (conv && s.throws) {
						respuesta = conv (respuesta);
					} else {
						tratar {
							respuesta = conv (respuesta);
						} catch (e) {
							regreso {
								estado: "parsererror",
								error: conv? e: "Sin conversión de" + prev + "a" + actual
							};
						}
					}
				}
			}
		}
	}

	return {estado: "éxito", datos: respuesta};
}

jQuery.extend ({

	// Contador para mantener el número de consultas activas
	activo: 0,

	// Caché del encabezado modificado por última vez para la próxima solicitud
	última modificación: {},
	etag: {},

	ajaxConfiguraciones: {
		url: location.href,
		tipo: "GET",
		isLocal: rlocalProtocol.test (location.protocol),
		global: cierto,
		processData: cierto,
		asincrónico: cierto,
		contentType: "application / x-www-form-urlencoded; charset = UTF-8",

		/ *
		tiempo de espera: 0,
		datos: nulo,
		dataType: null,
		nombre de usuario: null,
		contraseña: null,
		caché: nulo,
		throws: falso,
		tradicional: falso,
		encabezados: {},
		* /

		acepta: {
			"*": todos los tipos,
			texto: "texto / plano",
			html: "text / html",
			xml: "application / xml, text / xml",
			json: "application / json, text / javascript"
		},

		contenido: {
			xml: / \ bxml \ b /,
			html: / \ bhtml /,
			json: / \ bjson \ b /
		},

		Campos de respuesta: {
			xml: "responseXML",
			texto: "responseText",
			json: "responseJSON"
		},

		// Convertidores de datos
		// Las llaves separan la fuente (o catchall "*") y los tipos de destino con un solo espacio
		convertidores: {

			// Convertir cualquier cosa en texto
			"* text": Cadena,

			// Texto a html (verdadero = sin transformación)
			"texto html": verdadero,

			// Evaluamos el texto como una expresión json
			"texto json": JSON.parse,

			// Analizar texto como xml
			"texto xml": jQuery.parseXML
		},

		// Para las opciones que no deberían extenderse en profundidad:
		// puede agregar sus propias opciones personalizadas aquí si
		// y cuando creas uno que no debería ser
		// profundo extendido (ver ajaxExtend)
		flatOptions: {
			url: cierto,
			contexto: verdadero
		}
	},

	// Crea un objeto de configuración completo en el objetivo
	// con ambos campos ajaxSettings y configuraciones.
	// Si se omite el objetivo, escribe en ajaxSettings.
	ajaxSetup: function (target, settings) {
		volver a la configuración?

			// Construyendo un objeto de configuración
			ajaxExtend (ajaxExtend (target, jQuery.ajaxSettings), configuración):

			// Extendiendo ajaxSettings
			ajaxExtend (jQuery.ajaxSettings, target);
	},

	ajaxPrefilter: addToPrefiltersOrTransports (prefiltros),
	ajaxTransport: addToPrefiltersOrTransports (transportes),

	// método principal
	ajax: function (url, options) {

		// Si url es un objeto, simula la firma pre-1.5
		if (typeof url === "objeto") {
			opciones = url;
			url = indefinido;
		}

		// Forzar opciones para ser un objeto
		opciones = opciones || {};

		transporte de var,

			// URL sin param anti-caché
			cacheURL,

			// encabezados de respuesta
			responseHeadersString,
			ResponsibleHeaders,

			// maneje de tiempo de espera
			timeoutTimer,

			// Limpieza de URL var
			urlAnchor,

			// Estado de solicitud (se convierte en falso al enviar y verdadero al finalizar)
			terminado,

			// Para saber si los eventos globales deben ser enviados
			fireGlobal,

			// Variable de bucle
			yo,

			// parte no almacenada en la url
			sin cachear,

			// Crea el objeto de opciones final
			s = jQuery.ajaxSetup ({}, opciones),

			// Contexto de devolución de llamada
			callbackContext = s.context || s,

			// Contexto para eventos globales es callbackContext si es un nodo DOM o colección jQuery
			globalEventContext = s.context &&
				(callbackContext.nodeType || callbackContext.jquery)?
					jQuery (callbackContext):
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred (),
			completeDeferred = jQuery.Callbacks ("una vez memoria"),

			// devoluciones de llamada dependientes del estado
			statusCode = s.statusCode || {},

			// Encabezados (se envían todos a la vez)
			requestHeaders = {},
			requestHeadersNames = {},

			// mensaje de aborto predeterminado
			strAbort = "cancelado",

			// Fake xhr
			jqXHR = {
				ReadyState: 0,

				// Crea headers hashtable si es necesario
				getResponseHeader: function (key) {
					var match;
					si (completado) {
						if (! responseHeaders) {
							responseHeaders = {};
							while ((match = rheaders.exec (responseHeadersString))) {
								responseHeaders [coincidencia [1] .toLowerCase ()] = coincidencia [2];
							}
						}
						match = responseHeaders [key.toLowerCase ()];
					}
					partido de vuelta == nulo? null: coincidencia;
				},

				// Cadena sin procesar
				getAllResponseHeaders: function () {
					¿regreso completado? responseHeadersString: null;
				},

				// Guarda el encabezado en caché
				setRequestHeader: function (name, value) {
					if (completed == null) {
						name = requestHeadersNames [name.toLowerCase ()] =
							requestHeadersNames [name.toLowerCase ()] || nombre;
						requestHeaders [nombre] = valor;
					}
					devuelve esto;
				},

				// Anula el encabezado de tipo de contenido de respuesta
				overrideMimeType: function (type) {
					if (completed == null) {
						s.mimeType = tipo;
					}
					devuelve esto;
				},

				// devoluciones de llamada dependientes del estado
				statusCode: function (map) {
					código var;
					if (mapa) {
						si (completado) {

							// Ejecutar las devoluciones de llamada apropiadas
							jqXHR.always (map [jqXHR.status]);
						} else {

							// Lazy-agrega las nuevas devoluciones de llamada de una manera que conserva las antiguas
							para (código en el mapa) {
								statusCode [code] = [statusCode [code], map [code]];
							}
						}
					}
					devuelve esto;
				},

				// Cancelar la solicitud
				abortar: función (statusText) {
					var finalText = statusText || strAbort;
					if (transporte) {
						transport.abort (texto final);
					}
					hecho (0, finalText);
					devuelve esto;
				}
			};

		// Adjuntar aplazamientos
		deferred.promise (jqXHR);

		// Agregar protocolo si no se proporciona (los prefiltros pueden esperarlo)
		// Manejar la URL falsy en el objeto de configuración (# 10093: consistencia con la firma anterior)
		// También usamos el parámetro url si está disponible
		s.url = ((url || s.url || location.href) + "")
			.replace (rprotocol, location.protocol + "//");

		// Opción de método Alias ​​para escribir según ticket # 12004
		s.type = options.method || options.type || en el método || en el tipo;

		// Extraer tipos de datos list
		s.dataTypes = (s.dataType || "*") .toLowerCase (). match (rnothtmlwhite) || [""];

		// Una solicitud entre dominios está en orden cuando el origen no coincide con el origen actual.
		if (s.crossDomain == null) {
			urlAnchor = document.createElement ("a");

			// Soporte: IE <= 8 - 11, Edge 12 - 15
			// IE arroja una excepción al acceder a la propiedad href si url está mal formado,
			// ej. http://example.com:80x/
			tratar {
				urlAnchor.href = s.url;

				// Soporte: IE <= 8 - 11 solamente
				// La propiedad de host del Anchor no se establece correctamente cuando s.url es relativo
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host! ==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch (e) {

				// Si hay un error al analizar la URL, supongamos que es crossDomain,
				// puede ser rechazado por el transporte si no es válido
				s.crossDomain = true;
			}
		}

		// Convertir datos si aún no hay una cadena
		if (s.data && s.processData && typeof s.data! == "string") {
			s.data = jQuery.param (s.data, s.traditional);
		}

		// Aplicar prefiltros
		inspeccionarPrefiltersOrTransports (prefiltros, s, opciones, jqXHR);

		// Si la solicitud se anuló dentro de un prefiltro, deténgase allí
		si (completado) {
			devolver jqXHR;
		}

		// Podemos lanzar eventos globales a partir de ahora si se nos pide
		// No desencadenar eventos si jQuery.event no está definido en un escenario de uso de AMD (# 15118)
		fireGlobals = jQuery.event && s.global;

		// Esté atento a un nuevo conjunto de solicitudes
		if (fireGlobals && jQuery.active ++ === 0) {
			jQuery.event.trigger ("ajaxStart");
		}

		// Mayúsculas del tipo
		s.type = s.type.toUpperCase ();

		// Determinar si la solicitud tiene contenido
		s.hasContent =! rnoContent.test (s.type);

		// Guarda la URL en caso de que juguemos con If-Modified-Since
		// y / o encabezado If-None-Match más tarde
		// Eliminar hash para simplificar la manipulación de URL
		cacheURL = s.url.replace (rhash, "");

		// Manejo de más opciones para solicitudes sin contenido
		if (! s.hasContent) {

			// Recuerda el hash para que podamos volver a colocarlo
			uncached = s.url.slice (cacheURL.length);

			// Si los datos están disponibles y deben procesarse, añada datos a la URL
			if (s.data && (s.processData || typeof s.data === "string")) {
				cacheURL + = (rquery.test (cacheURL)? "&": "?") + s.data;

				// # 9682: eliminar datos para que no se usen en un eventual reintento
				eliminar datos;
			}

			// Agrega o actualiza el parámetro anti-cache si es necesario
			if (s.cache === falso) {
				cacheURL = cacheURL.replace (rantiCache, "$ 1");
				uncached = (rquery.test (cacheURL)? "&": "?") + "_ =" + (nonce ++) + sin cachear;
			}

			// Ponga hash y anti-cache en la URL que será solicitada (gh-1732)
			s.url = cacheURL + no guardado en caché;

		// Cambiar '% 20' a '+' si esto está codificado en el contenido del cuerpo (gh-2658)
		} else if (s.data && s.processData &&
			(s.contentType || "") .indexOf ("application / x-www-form-urlencoded") === 0) {
			s.data = s.data.replace (r20, "+");
		}

		// Establece el encabezado If-Modified-Since y / o If-None-Match, si está en el modo ifModified.
		if (s.ifModified) {
			if (jQuery.lastModified [cacheURL]) {
				jqXHR.setRequestHeader ("If-Modified-Since", jQuery.lastModified [cacheURL]);
			}
			if (jQuery.etag [cacheURL]) {
				jqXHR.setRequestHeader ("If-None-Match", jQuery.etag [cacheURL]);
			}
		}

		// Establecer el encabezado correcto, si se envían datos
		if (s.data && s.hasContent && s.contentType! == false || options.contentType) {
			jqXHR.setRequestHeader ("Content-Type", s.contentType);
		}

		// Establecer el encabezado Acepta para el servidor, dependiendo del tipo de datos
		jqXHR.setRequestHeader (
			"Aceptar",
			s.dataTypes [0] && s.accepts [s.dataTypes [0]]?
				s.accepts [s.dataTypes [0]] +
					(s.dataTypes [0]! == "*"? "," + allTypes + "; q = 0.01": ""):
				s.accepts ["*"]
		);

		// Verifica la opción de encabezados
		para (i en s.headers) {
			jqXHR.setRequestHeader (i, s.headers [i]);
		}

		// Permitir encabezados / tipos mimet personalizados y abortar temprano
		if (s.beforeSend &&
			(antes de Enviar.call (callbackContext, jqXHR, s) === falso || completed)) {

			// Abortar si no se ha hecho ya y regresar
			return jqXHR.abort ();
		}

		// Abortar ya no es una cancelación
		strAbort = "abortar";

		// Instala devoluciones de llamada en diferidos
		completeDeferred.add (s.complete);
		jqXHR.done (s.success);
		jqXHR.fail (s.error);

		// Obtener transporte
		transport = inspectPrefiltersOrTransports (transportes, s, opciones, jqXHR);

		// Si no hay transporte, abortamos automáticamente
		if (! transport) {
			hecho (-1, "Sin transporte");
		} else {
			jqXHR.readyState = 1;

			// Enviar evento global
			if (fireGlobals) {
				globalEventContext.trigger ("ajaxSend", [jqXHR, s]);
			}

			// Si la solicitud fue abortada dentro de ajaxSend, deténganse allí
			si (completado) {
				devolver jqXHR;
			}

			// Se acabó el tiempo
			if (s.async && s.timeout> 0) {
				timeoutTimer = window.setTimeout (function () {
					jqXHR.abort ("tiempo de espera");
				}, s.timeout);
			}

			tratar {
				completado = falso
				transport.send (requestHeaders, hecho);
			} catch (e) {

				// Retiro de las excepciones posteriores a la finalización
				si (completado) {
					arrojar e;
				}

				// Propagar a otros como resultados
				hecho (-1, e);
			}
		}

		// Devolución de llamada cuando todo está hecho
		función realizada (estado, nativeStatusText, respuestas, encabezados) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore las invocaciones repetidas
			si (completado) {
				regreso;
			}

			completado = verdadero;

			// Borrar el tiempo de espera si existe
			if (timeoutTimer) {
				window.clearTimeout (timeoutTimer);
			}

			// Desvío de transporte para la recolección temprana de basura
			// (sin importar cuánto tiempo se usará el objeto jqXHR)
			transporte = indefinido;

			// encabezados de respuesta de caché
			responseHeadersString = encabezados || "";

			// Configurar readyState
			jqXHR.readyState = estado> 0? 4: 0;

			// Determinar si fue exitoso
			isSuccess = estado> = 200 && estado <300 || estado === 304;

			// Obtener datos de respuesta
			if (respuestas) {
				response = ajaxHandleResponses (s, jqXHR, respuestas);
			}

			// Convertir sin importar qué (de esa forma los campos de respuestaXXX siempre están configurados)
			respuesta = ajaxConvert (s, respuesta, jqXHR, isSuccess);

			// Si tiene éxito, maneje el tipo de encadenamiento
			if (isSuccess) {

				// Establece el encabezado If-Modified-Since y / o If-None-Match, si está en el modo ifModified.
				if (s.ifModified) {
					modified = jqXHR.getResponseHeader ("Last-Modified");
					si (modificado) {
						jQuery.lastModified [cacheURL] = modificado;
					}
					modified = jqXHR.getResponseHeader ("etag");
					si (modificado) {
						jQuery.etag [cacheURL] = modificado;
					}
				}

				// si no hay contenido
				if (estado === 204 || s.type === "HEAD") {
					statusText = "nocontent";

				// si no se modifica
				} else if (estado === 304) {
					statusText = "notmodified";

				// Si tenemos datos, conviértelos
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess =! error;
				}
			} else {

				// Extraer error de statusText y normalizar para non-aborts
				error = statusText;
				if (estado ||! statusText) {
					statusText = "error";
					if (estado <0) {
						estado = 0;
					}
				}
			}

			// Establecer datos para el objeto falso xhr
			jqXHR.status = estado;
			jqXHR.statusText = (nativeStatusText || statusText) + "";

			// Éxito / Error
			if (isSuccess) {
				deferred.resolveWith (callbackContext, [success, statusText, jqXHR]);
			} else {
				deferred.rejectWith (callbackContext, [jqXHR, statusText, error]);
			}

			// devoluciones de llamada dependientes del estado
			jqXHR.statusCode (statusCode);
			statusCode = undefined;

			if (fireGlobals) {
				globalEventContext.trigger (isSuccess? "ajaxSuccess": "ajaxError",
					[jqXHR, s, isSuccess? éxito: error]);
			}

			// Completo
			completeDeferred.fireWith (callbackContext, [jqXHR, statusText]);

			if (fireGlobals) {
				globalEventContext.trigger ("ajaxComplete", [jqXHR, s]);

				// Manejar el contador AJAX global
				if (! (--jQuery.active)) {
					jQuery.event.trigger ("ajaxStop");
				}
			}
		}

		devolver jqXHR;
	},

	getJSON: function (url, data, callback) {
		return jQuery.get (url, data, callback, "json");
	},

	getScript: function (url, callback) {
		return jQuery.get (url, undefined, callback, "script");
	}
});

jQuery.each (["obtener", "publicar"], función (i, método) {
	jQuery [método] = función (url, data, callback, type) {

		// Cambia los argumentos si el argumento de datos fue omitido
		if (isFunction (data)) {
			tipo = tipo || llamar de vuelta;
			devolución de llamada = datos;
			datos = indefinido;
		}

		// La url puede ser un objeto de opciones (que luego debe tener .url)
		return jQuery.ajax (jQuery.extend ({
			url: url,
			tipo: método,
			dataType: tipo,
			datos: datos,
			éxito: devolución de llamada
		}, jQuery.isPlainObject (url) && url));
	};
});


jQuery._evalUrl = function (url) {
	return jQuery.ajax ({
		url: url,

		// Hacer esto explícito, ya que el usuario puede anular esto a través de ajaxSetup (# 11264)
		tipo: "GET",
		dataType: "script",
		caché: cierto,
		async: falso,
		global: falso,
		"throws": cierto
	});
};


jQuery.fn.extend ({
	wrapAll: function (html) {
		var wrap;

		if (this [0]) {
			if (isFunction (html)) {
				html = html.call (esto [0]);
			}

			// Los elementos para envolver el objetivo alrededor
			wrap = jQuery (html, this [0] .ownerDocument) .eq (0) .clone (true);

			if (este [0] .parentNode) {
				wrap.insertBefore (this [0]);
			}

			wrap.map (function () {
				var elem = esto;

				while (elem.firstElementChild) {
					elem = elem.firstElementChild;
				}

				regreso elem;
			}) .append (this);
		}

		devuelve esto;
	},

	wrapInner: function (html) {
		if (isFunction (html)) {
			return this.each (función (i) {
				jQuery (this) .wrapInner (html.call (this, i));
			});
		}

		return this.each (function () {
			var self = jQuery (esto),
				contents = self.contents ();

			if (contents.length) {
				contents.wrapAll (html);

			} else {
				self.append (html);
			}
		});
	},

	wrap: function (html) {
		var htmlIsFunction = isFunction (html);

		return this.each (función (i) {
			jQuery (this) .wrapAll (htmlIsFunction? html.call (this, i): html);
		});
	},

	desenvolver: función (selector) {
		this.parent (selector) .not ("cuerpo") .each (función () {
			jQuery (this) .replaceWith (this.childNodes);
		});
		devuelve esto;
	}
});


jQuery.expr.pseudos.hidden = function (elem) {
	¡return! jQuery.expr.pseudos.visible (elem);
};
jQuery.expr.pseudos.visible = function (elem) {
	return !! (elem.offsetWidth || elem.offsetHeight || elem.getClientRects (). length);
};




jQuery.ajaxSettings.xhr = function () {
	tratar {
		return new window.XMLHttpRequest ();
	} catch (e) {}
};

var xhrSuccessStatus = {

		// El protocolo de archivo siempre arroja el código de estado 0, suponga 200
		0: 200,

		// Soporte: IE <= 9 solamente
		// # 1450: a veces IE devuelve 1223 cuando debería ser 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr ();

support.cors = !! xhrSupported && ("withCredentials" en xhrSupported);
support.ajax = xhrSupported = !! xhrSupported;

jQuery.ajaxTransport (función (opciones) {
	devolución de llamada var, errorCallback;

	// Cross domain solo está permitido si se admite a través de XMLHttpRequest
	if (support.cors || xhrSupported &&! options.crossDomain) {
		regreso {
			enviar: función (encabezados, completo) {
				var i,
					xhr = options.xhr ();

				xhr.open (
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Aplicar campos personalizados si se proporcionan
				if (options.xhrFields) {
					for (i en options.xhrFields) {
						xhr [i] = options.xhrFields [i];
					}
				}

				// Ignorar el tipo de mime si es necesario
				if (options.mimeType && xhr.overrideMimeType) {
					xhr.overrideMimeType (options.mimeType);
				}

				// encabezado X-Requerido-Con
				// Para solicitudes entre dominios, ya que las condiciones para una verificación previa son
				// similar a un rompecabezas, simplemente nunca lo configuramos para estar seguros.
				// (siempre se puede configurar por solicitud o incluso usando ajaxSetup)
				// Para las solicitudes del mismo dominio, no cambiará el encabezado si ya se proporcionó.
				if (! options.crossDomain &&! headers ["X-Requested-With"]) {
					encabezados ["X-Requested-With"] = "XMLHttpRequest";
				}

				// Establecer encabezados
				para (i en encabezados) {
					xhr.setRequestHeader (i, encabezados [i]);
				}

				// Llamar de vuelta
				callback = function (type) {
					función de retorno () {
						if (devolución de llamada) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if (escribe === "abortar") {
								xhr.abort ();
							} else if (type === "error") {

								// Soporte: IE <= 9 solamente
								// En un aborto nativo manual, IE9 arroja
								// errores en cualquier acceso de propiedad que no esté readyState
								if (typeof xhr.status! == "number") {
									completo (0, "error");
								} else {
									completar(

										// Archivo: el protocolo siempre genera el estado 0; ver # 8605, # 14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								completar(
									xhrSuccessStatus [xhr.status] || xhr.status,
									xhr.statusText,

									// Soporte: IE <= 9 solamente
									// IE9 no tiene XHR2 pero lanza en binario (trac-11426)
									// Para XHR2 no text, deja que la persona que llama lo maneje (gh-2498)
									(xhr.responseType || "text")!! == "texto" ||
									typeof xhr.responseText! == "cadena"?
										{binary: xhr.response}:
										{text: xhr.responseText},
									xhr.getAllResponseHeaders ()
								);
							}
						}
					};
				};

				// Escucha los eventos
				xhr.onload = callback ();
				errorCallback = xhr.onerror = xhr.ontimeout = devolución de llamada ("error");

				// Soporte: solo IE 9
				// Usa onreadystatechange para reemplazar onabort
				// para manejar abortos no capturados
				if (xhr.onabort! == undefined) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function () {

						// Comprobar readyState antes del tiempo de espera a medida que cambia
						if (xhr.readyState === 4) {

							// Permitir que Onerror se llame primero,
							// pero eso no manejará un aborto nativo
							// También, save errorCallback a una variable
							// como no se puede acceder a xhr.onerror
							window.setTimeout (function () {
								if (devolución de llamada) {
									errorCallback ();
								}
							});
						}
					};
				}

				// Crea la devolución de llamada abortada
				callback = callback ("abortar");

				tratar {

					// Envíe la solicitud (esto puede generar una excepción)
					xhr.send (options.hasContent && options.data || null);
				} catch (e) {

					// # 14683: solo vuelve a lanzar si todavía no se ha notificado como un error
					if (devolución de llamada) {
						arrojar e;
					}
				}
			},

			abortar: function () {
				if (devolución de llamada) {
					llamar de vuelta();
				}
			}
		};
	}
});




// Impedir la ejecución automática de scripts cuando no se proporcionó un tipo de datos explícito (Ver gh-2432)
jQuery.ajaxPrefilter (función (es) {
	if (s.crossDomain) {
		s.contents.script = false;
	}
});

// Instalar script dataType
jQuery.ajaxSetup ({
	acepta: {
		script: "texto / javascript, aplicación / javascript," +
			"application / ecmascript, application / x-ecmascript"
	},
	contenido: {
		script: / \ b (?: java | ecma) script \ b /
	},
	convertidores: {
		"secuencia de comandos de texto": función (texto) {
			jQuery.globalEval (texto);
			devolver el texto;
		}
	}
});

// Manejar el caso especial del caché y el dominio cruzado
jQuery.ajaxPrefilter ("script", función (es) {
	if (s.cache === undefined) {
		s.cache = falso;
	}
	if (s.crossDomain) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport ("script", función (es) {

	// Este transporte solo se ocupa de solicitudes de dominios cruzados
	if (s.crossDomain) {
		var script, callback;
		regreso {
			enviar: función (_, completar) {
				script = jQuery ("<script>") .prop ({
					charset: s.scriptCharset,
					src: s.url
				} ).en(
					"Error de carga",
					callback = function (evt) {
						script.remove ();
						callback = null;
						if (evt) {
							completo (evt.type === "error"? 404: 200, evt.type);
						}
					}
				);

				// Utiliza la manipulación DOM nativa para evitar nuestro engaño domManip AJAX
				document.head.appendChild (script [0]);
			},
			abortar: function () {
				if (devolución de llamada) {
					llamar de vuelta();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = / (=) \? (? = & | $) | \? \? /;

// Configuración predeterminada de jsonp
jQuery.ajaxSetup ({
	jsonp: "devolución de llamada",
	jsonpCallback: function () {
		var callback = oldCallbacks.pop () || (jQuery.expando + "_" + (nonce ++));
		esta [devolución de llamada] = verdadero;
		devolver devolución de llamada;
	}
});

// Detecta, normaliza opciones e instala devoluciones de llamada para solicitudes jsonp
jQuery.ajaxPrefilter ("json jsonp", función (s, originalSettings, jqXHR) {

	var callbackName, sobrescrito, responseContainer,
		jsonProp = s.jsonp! == false && (rjsonp.test (s.url)?
			"url":
			typeof s.data === "string" &&
				(s.contentType || "")
					.indexOf ("application / x-www-form-urlencoded") === 0 &&
				rjsonp.test (s.data) && "data"
		);

	// Manejar si el tipo de datos esperado es "jsonp" o tenemos un parámetro para establecer
	if (jsonProp || s.dataTypes [0] === "jsonp") {

		// Obtener nombre de devolución de llamada, recordando el valor preexistente asociado a él
		callbackName = s.jsonpCallback = isFunction (s.jsonpCallback)?
			s.jsonpCallback ():
			s.jsonpCallback;

		// Insertar devolución de llamada en url o datos de formulario
		if (jsonProp) {
			s [jsonProp] = s [jsonProp] .replace (rjsonp, "$ 1" + callbackName);
		} else if (s.jsonp! == falso) {
			s.url + = (rquery.test (s.url)? "&": "?") + s.jsonp + "=" + callbackName;
		}

		// Usa el convertidor de datos para recuperar json luego de la ejecución del script
		s.converters ["script json"] = function () {
			if (! responseContainer) {
				jQuery.error (callbackName + "no se llamó");
			}
			return responseContainer [0];
		};

		// Force json dataType
		s.dataTypes [0] = "json";

		// Instalar devolución de llamada
		sobrescrito = ventana [callbackName];
		ventana [callbackName] = function () {
			responseContainer = argumentos;
		};

		// Función de limpieza (dispara después de los convertidores)
		jqXHR.always (function () {

			// Si el valor anterior no existía, elimínelo
			if (sobrescrito === undefined) {
				jQuery (ventana) .removeProp (callbackName);

			// De lo contrario, restaurar el valor preexistente
			} else {
				ventana [callbackName] = sobrescrito;
			}

			// Guarda de nuevo como gratis
			if (s [callbackName]) {

				// Asegúrate de que volver a usar las opciones no arruine las cosas
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Guarda el nombre de devolución de llamada para uso futuro
				oldCallbacks.push (callbackName);
			}

			// Llamar si era una función y tenemos una respuesta
			if (responseContainer && isFunction (sobrescrito)) {
				sobrescrito (responseContainer [0]);
			}

			responseContainer = sobrescrito = indefinido;
		});

		// Delegar al script
		devolver "script";
	}
});




// Soporte: solo Safari 8
// En Safari 8 documentos creados a través de document.implementation.createHTMLDocument
// colapso de formularios hermanos: el segundo se convierte en hijo del primero.
// Debido a eso, esta medida de seguridad debe ser desactivada en Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = (function () {
	var body = document.implementation.createHTMLDocument ("") .body;
	body.innerHTML = "<form> </ form> <form> </ form>";
	return body.childNodes.length === 2;
}) ();


// Los "datos" de argumento deberían ser una cadena de html
// contexto (opcional): si se especifica, el fragmento se creará en este contexto,
// defaults to document
// keepScripts (opcional): si es verdadero, incluirá scripts pasados ​​en la cadena html
jQuery.parseHTML = function (data, context, keepScripts) {
	if (tipo de datos! == "cadena") {
		regreso [];
	}
	if (tipo de contexto === "booleano") {
		keepScripts = contexto;
		contexto = falso;
	}

	var base, analizado, scripts;

	if (! context) {

		// Detener las secuencias de comandos o los controladores de eventos en línea para que no se ejecuten inmediatamente
		// usando document.implementation
		if (support.createHTMLDocument) {
			context = document.implementation.createHTMLDocument ("");

			// Establecer el href base para el documento creado
			// entonces cualquier elemento analizado con URL
			// se basan en la URL del documento (gh-2965)
			base = context.createElement ("base");
			base.href = document.location.href;
			context.head.appendChild (base);
		} else {
			contexto = documento;
		}
	}

	parsed = rsingleTag.exec (datos);
	scripts =! keepScripts && [];

	// etiqueta única
	if (analizado) {
		return [context.createElement (analizado [1])];
	}

	parsed = buildFragment ([data], context, scripts);

	if (scripts && scripts.length) {
		jQuery (scripts) .remove ();
	}

	return jQuery.merge ([], parsed.childNodes);
};


/ **
 * Cargar una url en una página
 * /
jQuery.fn.load = function (url, params, callback) {
	var selector, tipo, respuesta,
		self = esto,
		off = url.indexOf ("");

	if (off> -1) {
		selector = stripAndCollapse (url.slice (off));
		url = url.slice (0, apagado);
	}

	// Si es una función
	if (isFunction (params)) {

		// Suponemos que es la devolución de llamada
		devolución de llamada = params;
		params = indefinido;

	// De lo contrario, crea una cadena param
	} else if (params && typeof params === "objeto") {
		type = "POST";
	}

	// Si tenemos elementos para modificar, haga la solicitud
	if (self.length> 0) {
		jQuery.ajax ({
			url: url,

			// Si la variable "tipo" no está definida, se usará el método "GET".
			// Hacer que el valor de este campo sea explícito desde
			// el usuario puede anularlo a través del método ajaxSetup
			tipo: tipo || "OBTENER",
			dataType: "html",
			datos: params
		}) .done (function (responseText) {

			// Guardar respuesta para usar en devolución de llamada completa
			respuesta = argumentos;

			self.html (selector?

				// Si se especificó un selector, busque los elementos correctos en un div falso
				// Excluir scripts para evitar errores IE 'Permiso denegado'
				jQuery ("<div>") .append (jQuery.parseHTML (responseText)) .find (selector):

				// De lo contrario, use el resultado completo
				responseText);

		// Si la solicitud tiene éxito, esta función obtiene "datos", "estado", "jqXHR"
		// pero se ignoran porque la respuesta se configuró arriba.
		// Si falla, esta función obtiene "jqXHR", "estado", "error"
		}) .always (callback && function (jqXHR, estado) {
			self.each (function () {
				callback.apply (esto, respuesta || [jqXHR.responseText, status, jqXHR]);
			});
		});
	}

	devuelve esto;
};




// Adjuntar un conjunto de funciones para el manejo de eventos AJAX comunes
jQuery.each ([
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], función (i, tipo) {
	jQuery.fn [type] = function (fn) {
		devuelve this.on (tipo, fn);
	};
});




jQuery.expr.pseudos.animated = function (elem) {
	return jQuery.grep (jQuery.timers, function (fn) {
		return elem === fn.elem;
	} ).longitud;
};




jQuery.offset = {
	setOffset: function (elem, options, i) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css (elem, "posición"),
			curElem = jQuery (elem),
			props = {};

		// Establecer la posición primero, en el caso superior / izquierda se establecen incluso en elem estático
		if (position === "static") {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset ();
		curCSSTop = jQuery.css (elem, "arriba");
		curCSSLeft = jQuery.css (elem, "izquierda");
		calculatePosition = (position === "absolute" || position === "fixed") &&
			(curCSSTop + curCSSLeft) .indexOf ("auto")> -1;

		// Necesito poder calcular la posición si cualquiera
		// arriba o izquierda es automático y la posición es absoluta o fija
		if (calculatePosition) {
			curPosition = curElem.position ();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat (curCSSTop) || 0;
			curLeft = parseFloat (curCSSLeft) || 0;
		}

		if (isFunction (opciones)) {

			// Usa jQuery.extend aquí para permitir la modificación del argumento de coordenadas (gh-1848)
			options = options.call (elem, i, jQuery.extend ({}, curOffset));
		}

		if (options.top! = null) {
			props.top = (opciones.top - curOffset.top) + curTop;
		}
		if (options.left! = null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}

		if ("usar" en opciones) {
			options.using.call (elem, props);

		} else {
			curElem.css (accesorios);
		}
	}
};

jQuery.fn.extend ({

	// offset () relaciona el cuadro de borde de un elemento con el origen del documento
	desplazamiento: función (opciones) {

		// Preservar el encadenamiento para setter
		if (arguments.length) {
			opciones de devolución === undefined?
				esta :
				this.each (función (i) {
					jQuery.offset.setOffset (esto, opciones, i);
				});
		}

		var rect, win,
			elem = this [0];

		if (! elem) {
			regreso;
		}

		// Devuelve ceros para elementos desconectados y ocultos (mostrar: ninguno) (gh-2310)
		// Soporte: IE <= 11 solamente
		// Ejecutando getBoundingClientRect en un
		// nodo desconectado en IE arroja un error
		if (! elem.getClientRects (). length) {
			return {top: 0, izquierda: 0};
		}

		// Obtener posición relativa al documento agregando desplazamiento de ventana gráfica a gBCR relativo a la ventana gráfica
		rect = elem.getBoundingClientRect ();
		win = elem.ownerDocument.defaultView;
		regreso {
			arriba: rect.top + win.pageYOffset,
			izquierda: rect.left + win.pageXOffset
		};
	},

	// position () relaciona el cuadro de margen de un elemento con el cuadro de relleno de su padre desplazado
	// Esto corresponde al comportamiento del posicionamiento absoluto de CSS
	posición: función () {
		if (! this [0]) {
			regreso;
		}

		var offsetParent, offset, doc,
			elem = this [0],
			parentOffset = {top: 0, izquierda: 0};

		// posición: f elementos indexados se compensan desde la ventana gráfica, que a su vez siempre tiene un desplazamiento cero
		if (jQuery.css (elem, "position") === "fixed") {

			// Asumir posición: fijo implica disponibilidad de getBoundingClientRect
			offset = elem.getBoundingClientRect ();

		} else {
			offset = this.offset ();

			// Cuenta para el elemento primario * offset *, que puede ser el documento o su elemento raíz
			// cuando se identifica un elemento posicionado estáticamente
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while (offsetParent &&
				(offsetParent === doc.body || offsetParent === doc.documentElement) &&
				jQuery.css (offsetParent, "position") === "static") {

				offsetParent = offsetParent.parentNode;
			}
			if (offsetParent && offsetParent! == elem && offsetParent.nodeType === 1) {

				// Incorporar bordes en su desplazamiento, ya que están fuera de su origen de contenido
				parentOffset = jQuery (offsetParent) .offset ();
				parentOffset.top + = jQuery.css (offsetParent, "borderTopWidth", true);
				parentOffset.left + = jQuery.css (offsetParent, "borderLeftWidth", true);
			}
		}

		// Restar compensaciones de padres y márgenes de elementos
		regreso {
			arriba: offset.top - parentOffset.top - jQuery.css (elem, "marginTop", verdadero),
			left: offset.left - parentOffset.left - jQuery.css (elem, "marginLeft", verdadero)
		};
	},

	// Este método devolverá documentElement en los siguientes casos:
	// 1) Para el elemento dentro del iframe sin offsetParent, este método regresará
	// documentElement de la ventana primaria
	// 2) Para el elemento oculto o separado
	// 3) Para cuerpo o elemento html, es decir, en el caso del nodo html, se devolverá
	//
	// pero esas excepciones nunca fueron presentadas como casos de uso de la vida real
	// y podrían considerarse como resultados más preferibles.
	//
	// Esta lógica, sin embargo, no está garantizada y puede cambiar en cualquier momento en el futuro
	offsetParent: function () {
		return this.map (function () {
			var offsetParent = this.offsetParent;

			while (offsetParent && jQuery.css (offsetParent, "position") === "static") {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		});
	}
});

// Crea los métodos scrollLeft y scrollTop
jQuery.each ({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (method, prop) {
	var top = "pageYOffset" === prop;

	jQuery.fn [method] = function (val) {
		acceso de retorno (esto, función (elem, método, val) {

			// Coalesce documentos y ventanas
			var win;
			if (isWindow (elem)) {
				ganar = elem;
			} else if (elem.nodeType === 9) {
				win = elem.defaultView;
			}

			if (val === undefined) {
				volver ganar? ganar [prop]: elem [método];
			}

			if (win) {
				win.scrollTo (
					!parte superior ? val: win.pageXOffset,
					parte superior ? val: win.pageYOffset
				);

			} else {
				elem [método] = val;
			}
		}, método, val, arguments.length);
	};
});

// Soporte: Safari <= 7 - 9.1, Chrome <= 37 - 49
// Agrega los cssHooks superiores / izquierdos usando jQuery.fn.position
// Error de Webkit: https://bugs.webkit.org/show_bug.cgi?id=29084
// Error de parpadeo: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle devuelve el porcentaje cuando se especifica para arriba / izquierda / abajo / derecha;
// en lugar de hacer que el módulo css dependa del módulo de compensación, simplemente verifíquelo aquí
jQuery.each (["arriba", "izquierda"], función (i, prop) {
	jQuery.cssHooks [prop] = addGetHookIf (support.pixelPosition,
		función (elem, calculado) {
			if (calculado) {
				computed = curCSS (elem, prop);

				// Si curCSS devuelve porcentaje, repliegue para compensar
				devuelve rnumnonpx.test (computado)?
					jQuery (elem) .position () [prop] + "px":
					calculado
			}
		}
	);
});


// Crea los métodos innerHeight, innerWidth, height, width, outerHeight y outerWidth
jQuery.each ({Altura: "altura", ancho: "ancho"}, función (nombre, tipo) {
	jQuery.each ({relleno: "interior" + nombre, contenido: tipo, "": "exterior" + nombre},
		function (defaultExtra, funcName) {

		// El margen es solo para outerHeight, outerWidth
		jQuery.fn [funcName] = function (margin, value) {
			var chainable = arguments.length && (defaultExtra || typeof margin! == "booleano"),
				extra = defaultExtra || (margen === verdadero || valor === verdadero? "margen": "borde");

			acceso de retorno (esto, función (elem, tipo, valor) {
				var doc;

				if (isWindow (elem)) {

					// $ (ventana) .outerWidth / Height return w / h incluyendo barras de desplazamiento (gh-1729)
					return funcName.indexOf ("outer") === 0?
						elem ["interior" + nombre]:
						elem.document.documentElement ["client" + name];
				}

				// Obtener ancho o altura del documento
				if (elem.nodeType === 9) {
					doc = elem.documentElement;

					// Ya sea scroll [Ancho / Alto] o desplazamiento [Ancho / Alto] o cliente [Ancho / Alto],
					// lo que sea mejor
					devuelve Math.max (
						elem.body ["scroll" + nombre], doc ["scroll" + nombre],
						elem.body ["offset" + nombre], doc ["offset" + nombre],
						doc ["cliente" + nombre]
					);
				}

				valor de retorno === indefinido?

					// Obtener ancho o alto en el elemento, solicitando pero no forzando parseFloat
					jQuery.css (elem, tipo, extra):

					// Establecer ancho o alto en el elemento
					jQuery.style (elem, type, value, extra);
			}, tipo, encadenable? margen: indefinido, encadenable);
		};
	});
});


jQuery.each (("desenfocar el enfoque enfocar en el enfoque cambiar el tamaño desplazarse hacer clic en pulsarclick" +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave" +
	"change select submit keydown button keyup contextmenu") .split (""),
	función (i, nombre) {

	// Manejar el enlace del evento
	jQuery.fn [name] = function (data, fn) {
		return arguments.length> 0?
			this.on (nombre, nulo, datos, fn):
			this.trigger (nombre);
	};
});

jQuery.fn.extend ({
	hover: function (fnOver, fnOut) {
		devuelve this.mouseenter (fnOver) .mouseleave (fnOut || fnOver);
	}
});




jQuery.fn.extend ({

	bind: function (tipos, datos, fn) {
		devuelve this.on (types, null, data, fn);
	},
	desvinculación: función (tipos, fn) {
		devuelve this.off (types, null, fn);
	},

	delegar: función (selector, tipos, datos, fn) {
		return this.on (tipos, selector, datos, fn);
	},
	undelegate: function (selector, tipos, fn) {

		// (namespace) o (selector, types [, fn])
		return arguments.length === 1?
			this.off (selector, "**"):
			this.off (tipos, selector || "**", fn);
	}
});

// Vincula una función a un contexto, opcionalmente aplicando parcialmente cualquier
// argumentos.
// jQuery.proxy está en desuso para promover los estándares (específicamente el enlace Function #)
// Sin embargo, no está programado para su eliminación pronto
jQuery.proxy = function (fn, context) {
	var tmp, args, proxy;

	if (tipo de contexto === "cadena") {
		tmp = fn [contexto];
		contexto = fn;
		fn = tmp;
	}

	// Verificación rápida para determinar si el objetivo es invocable, en la especificación
	// esto arroja un TypeError, pero solo devolveremos undefined.
	if (! isFunction (fn)) {
		regreso indefinido;
	}

	// enlace simulado
	args = slice.call (argumentos, 2);
	proxy = function () {
		return fn.apply (context || this, args.concat (slice.call (argumentos)));
	};

	// Establece el guid del controlador único al mismo del controlador original, por lo que se puede eliminar
	proxy.guid = fn.guid = fn.guid || jQuery.guid ++;

	proxy de devolución;
};

jQuery.holdReady = function (hold) {
	if (mantener) {
		jQuery.readyWait ++;
	} else {
		jQuery.ready (verdadero);
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function (obj) {

	// A partir de jQuery 3.0, isNumeric está limitado a
	// cadenas y números (primitivos u objetos)
	// que puede ser forzado a números finitos (gh-2662)
	var type = jQuery.type (obj);
	return (tipo === "número" || tipo === "cadena") &&

		// parseFloat NaNs falsos positivos de lanzamiento numérico ("")
		// ... pero malinterpreta cadenas de números iniciales, particularmente literales hexadecimales ("0x ...")
		// la substracción fuerza infinitos a NaN
		! isNaN (obj - parseFloat (obj));
};




// Registrarse como un módulo AMD con nombre, ya que jQuery se puede concatenar con otro
// los archivos que pueden usar definen, pero no a través de un script de concatenación apropiado que
// entiende los módulos AMD anónimos. Un AMD con nombre es más seguro y más robusto
// forma de registrarse. Se usa jquery en minúscula porque los nombres de los módulos de AMD son
// derivado de nombres de archivos, y jQuery normalmente se entrega en minúsculas
// nombre del archivo. Haga esto después de crear el global para que si un módulo AMD quiere
// para llamar a noConflict para ocultar esta versión de jQuery, funcionará.

// Tenga en cuenta que para una máxima portabilidad, las bibliotecas que no son jQuery deberían
// se declaran como módulos anónimos y evitan establecer un global si
// El cargador AMD está presente. jQuery es un caso especial. Para más información, ver
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if (typeof define === "function" && define.amd) {
	define ("jquery", [], function () {
		devolver jQuery;
	});
}




var

	// Mapa sobre jQuery en caso de sobreescritura
	_jQuery = window.jQuery,

	// Mapa sobre $ en caso de sobreescritura
	_ $ = ventana. $;

jQuery.noConflict = function (deep) {
	if (window. $ === jQuery) {
		ventana. $ = _ $;
	}

	if (profundo && window.jQuery === jQuery) {
		window.jQuery = _jQuery;
	}

	devolver jQuery;
};

// Exponer jQuery y $ identificadores, incluso en AMD
// (# 7102 # comment: 10, https://github.com/jquery/jquery/pull/557)
// y CommonJS para emuladores de navegador (# 13566)
if (! noGlobal) {
	window.jQuery = window. $ = jQuery;
}




devolver jQuery;
});