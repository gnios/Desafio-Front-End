App = {};

App.Requisicao = function () {
    var self = this;

    self.filtros = [];

    self.novoFiltro = function (p) {
        var filtro = new App.Campo(p);
        self.filtros.push(filtro);

        return self;
    };
};


App.Campo = function (p) {
    var self = this;

    self.nome = p.nome;
    self.tipo = p.tipo;
    self.valoresIniciais = p.valoresIniciais;
    self.valoresSelecionados = p.valoresSelecionados;
};


App.criarComponente = function (requisicao) {
    var componente = new App.Componente();

    requisicao.filtros.forEach(function (filtro) {
        componente.novoFiltro(filtro);
    });

    return componente;
};

App.Componente = function () {
    var self = this;
    self.filtros = ko.observableArray();

    self.calcularTamanhoBox = function () {

        var quantidadeMaxima = 4;
        var quantidadeFiltros = self.filtros().length;

        if (quantidadeFiltros > quantidadeMaxima) {
            quantidadeFiltros = quantidadeMaxima;
        }
        return ("100" / quantidadeFiltros) + "%";
    }

    self.recuperarSelecoes = function () {

        var resposta = ko.toJSON(self.filtros);
        alert(resposta);
        return resposta;
    };

    self.novoFiltro = function (p) {
        var filtro = Filtro.Criar({ nome: p.nome, tipo: p.tipo, valoresIniciais: p.valoresIniciais });
        self.filtros.push(filtro);
    };
};



Filtro = {};

Filtro.Tipos = ["Caracteres", "Periodo"];

Filtro.Tipos.CARACTERES = Filtro.Tipos[0];
Filtro.Tipos.PERIODO = Filtro.Tipos[1];

Filtro.Criar = function (p) {
    if (p.tipo === Filtro.Tipos.CARACTERES) {
        return new Filtro.Caracteres(p);
    } if (p.tipo === Filtro.Tipos.PERIODO) {
        return new Filtro.Periodo(p);
    } else {
        return new Filtro.Generico(p);
    }
}

Filtro.Generico = function (p) {
    var self = this;
    self.nome = p.nome;
    self.valoresIniciais = p.valoresIniciais;
    self.valoresSelecionados = ko.observableArray();

    self.aplicarFiltro = function (filtro, valor) {
        filtro.valoresSelecionados.push(valor);
    }

    self.limparFiltros = function (filtro, valor) {
        filtro.valoresSelecionados.removeAll();
    };
};

Filtro.Caracteres = function (p) {
    var self = this;
    Filtro.Generico.call(self, p);

    self.tipo = Filtro.Tipos.CARACTERES;
    self.valoresIniciais = p.valoresIniciais.map(function (valor) {
        var valorInicial = { texto: valor, selecionado: ko.observable(false) };
        return valorInicial;
    });

    self.aplicarFiltro = function (filtro, valor) {
        filtro.valoresSelecionados.removeAll();
        for (var i = 0; i < filtro.valoresIniciais.length; i++) {
            if (filtro.valoresIniciais[i].selecionado() === true) {
                filtro.valoresSelecionados.push(filtro.valoresIniciais[i].texto);
            }
        }
    };

    self.limparFiltros = function (filtro, valor) {
        for (var i = 0; i < filtro.valoresIniciais.length; i++) {
            filtro.valoresIniciais[i].selecionado(false);
        }
        filtro.valoresSelecionados.removeAll();
    };
}


Filtro.Periodo = function (p) {
    var self = this;
    Filtro.Generico.call(self, p);

    self.tipo = Filtro.Tipos.PERIODO;
    self.dataInicial = ko.observable();
    self.dataFinal = ko.observable();
    self.periodo = ko.computed(function () {
        return self.dataInicial() + " " + self.dataFinal();
    });

    self.aplicarFiltro = function (filtro, valor) {
        filtro.valoresSelecionados.removeAll();
        filtro.valoresSelecionados.push(filtro.periodo);
    };
}

Filtro.Resposta = function () {
    var self = this;

    self.selecoes = [];

    self.novoFiltro = function (p) {
        var selecao = new Filtro.Selecao(p);
        self.selecoes.push(selecao);

        return self;
    };
};

//ko.components.register('like-widget', {
//    viewModel: function (params) {

//        //var filtro = ko.observable(params.valor || '');
//        var teste = ko.observable('TESTE');;
//    },
//    template:
//        '<div class="box left">\
//            <header>\
//                <span class="uk-badge uk-badge-notification uk-badge-success">1</span>\
//               <input data-bind="value: teste()" /> \
//                <div class="uikit-dropdown right" data-uk-dropdown="{mode:"click"}">\
//                    <a class="uk-button right" href="#"><i class="icon icon-trash"></i></a>\
//                    <a class="uk-button uikit-trigger right" href="#"><i class="icon icon-plus"></i></a>\
//                    <div class="uk-dropdown">\
//                        <ul class="menu">\
//                            <li class="item">\
//                                <a href="#" class="link" title="Dropdown Item 1">Dropdown Item 1</a>\
//                            </li>\
//                            <li class="item">\
//                                <a href="#" class="link" title="Dropdown Item 2">Dropdown Item 2</a>\
//                            </li>\
//                            <li class="item">\
//                                <a href="#" class="link" title="Dropdown Item 3">Dropdown Item 3</a>\
//                            </li>\
//                            <li class="item">\
//                                <a href="#" class="link" title="Dropdown Item 4">Dropdown Item 4</a>\
//                            </li>\
//                            <li class="item">\
//                                <a href="#" class="link" title="Dropdown Item 5">Dropdown Item 5</a>\
//                            </li>\
//                        </ul>\
//                    </div>\
//                </div>\
//                <span class="divider"></span>\
//            </header>\
//            <div class="content">Left Floated Box</div>\
//        </div>'
//});

//ko.components.register('filtros', {
//    viewModel: function (params) {
//        var self = this;
//        self.filtro = ko.observable(params.value.filtros);
//    },
//    template: '<div name="filtros" data-bind="foreach: filtro">\
//                       <span>TESTE</span>\
//                       <div data-bind="template: { name: tipo, data: $data }"></div>\
//                </div>'
//});