

Filtro = {};

Filtro.Tipos = ["Caracteres", "Periodo"];
Filtro.Tipos.CARACTERES = Filtro.Tipos[0];
Filtro.Tipos.PERIODO = Filtro.Tipos[1];

Filtro.Requisicao = function () {
    var self = this;

    self.filtros = [];

    self.novoFiltro = function (p) {
        var filtro = new Filtro.Campo(p);
        self.filtros.push(filtro);

        return self;
    };
};

Filtro.Campo = function (p) {
    var self = this;

    self.nome = p.nome;
    self.tipo = p.tipo;
    self.valoresIniciais = p.valoresIniciais;
    self.valoresSelecionados = ko.observableArray();
};

Filtro.CampoCaractere = function (p) {
    var self = this;

    self.nome = p.nome;
    self.tipo = Filtro.Tipos.CARACTERES;
    self.valoresSelecionados = ko.observableArray();

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

Filtro.Componente = function () {
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

    self.limparFiltros = function (filtro, valor) {
        filtro.limparFiltros(filtro, valor);
    }

    self.aplicarFiltro = function (filtro, valor) {
        filtro.aplicarFiltro(filtro, valor);
    }

    self.recuperarSelecoes = function () {

        var resposta = ko.toJSON(self.filtros);
        alert(resposta);
        return resposta;
    };

    self.novoFiltro = function (p) {
        if (p.tipo === Filtro.Tipos.CARACTERES) {

            var filtro = new Filtro.CampoCaractere({ nome: p.nome, valoresIniciais: p.valoresIniciais });
        } else {

            var filtro = new Filtro.Campo({ nome: p.nome, tipo: p.tipo, valoresIniciais: p.valoresIniciais });
        }

        self.filtros.push(filtro);
    };
};

Filtro.criarComponente = function (requisicao) {
    var componente = new Filtro.Componente();

    requisicao.filtros.forEach(function (filtro) {
        componente.novoFiltro(filtro);
    });

    return componente;
};

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