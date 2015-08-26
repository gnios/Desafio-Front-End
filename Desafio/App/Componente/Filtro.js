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

    self.limparFiltros = function () {
        self.valoresSelecionados.removeAll();
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

    self.limparFiltros = function () {
        for (var i = 0; i < self.valoresIniciais.length; i++) {
            self.valoresIniciais[i].selecionado(false);
        }
        self.valoresSelecionados.removeAll();
    };
};


Filtro.Periodo = function (p) {
    var self = this;
    Filtro.Generico.call(self, p);

    self.tipo = Filtro.Tipos.PERIODO;
    self.dataInicial = null;
    self.dataFinal = null;
    //self.periodo = ko.computed(function () {
    //    return self.dataInicial() + " " + self.dataFinal();
    //});

    self.aplicarFiltro = function (filtro, valor) {
        filtro.valoresSelecionados.push(filtro.dataInicial + " - " + filtro.dataFinal);
    };
};

ko.components.register('filtro', {
    viewModel: function (params) {
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

            var resposta = [];
            self.filtros().forEach(function (filtro) {
                resposta.push({ nome: filtro.nome, tipo: filtro.tipo, valoresSelecionados: filtro.valoresSelecionados });
            });
            resposta = ko.toJSON(resposta);
            alert(resposta);
            return resposta;
        };

        self.limparTodosFiltros = function () {
            self.filtros().forEach(function (filtro) {
                filtro.limparFiltros();
            });
        }

        self.novoFiltro = function (p) {
            var filtro = Filtro.Criar({ nome: p.nome, tipo: p.tipo, valoresIniciais: p.valoresIniciais });
            self.filtros.push(filtro);
        };

        var requisicao = params.value;

        requisicao.filtros.forEach(function (filtro) {
            self.novoFiltro(filtro);
        });

        $(".btnToggle").click(function () {
            $(".slide-content").slideFadeToggle();
        });
    },
    template:
        '<a class="btnToggle button" href="#"><i class="icon icon-filter icon-with-margin-right"></i> FILTROS SELECIONADOS</a>\
                <div class="slide-panel">\
                <div class="slide-content with-four-elements">\
                    <div name="filtros" data-bind="foreach: filtros">\
                        <div data-bind="template: { name: tipo, data: $data }"></div>\
                    </div>\
                    <div class="footer-buttons">\
                        <a class="button withAccent" data-bind="click:recuperarSelecoes"><i class="icon icon-filter icon-with-margin-right"></i>Aplicar Filtros</a>\
                        <a class="button withAccent" data-bind="click:limparTodosFiltros"><i class="icon icon-trash icon-with-margin-right"></i>Limpar Todos</a>\
                    </div>\
                </div>\
            </div>'
});