

App = {};

App.Tipos = ["Caracteres", "Periodo"];
App.Tipos.CARACTERES = App.Tipos[0];
App.Tipos.PERIODO = App.Tipos[1];

App.Periodo = function (dataInicial, dataFinal) {
    var self = this;

    self.dataInicial = dataInicial;
    self.dataFinal = dataFinal;
};

App.Campo = function (p) {
    var self = this;

    self.nome = p.nome;
    self.tipo = p.tipo;
};

App.CampoCaracteres = function (p) {
    var self = this;

    self.nome = p.nome;
    self.tipo = App.Tipos.CARACTERES;
}

App.CampoPeriodo = function (p) {
    var self = this;

    self.nome = p.nome;
    self.tipo = App.Tipos.PERIODO;
}

App.Requisicao = function () {
    var self = this;

    self.filtros = [];

    self.novoFiltro = function (p) {
        var filtro = new App.Campo(p);
        self.filtros.push(filtro);

        return self;
    };
};

App.Selecao = function (p) {
    var self = this;

    self.campo = new App.Campo(p.campo);
    self.valor = p.valor;
};

App.Resposta = function () {
    var self = this;

    self.selecoes = [];

    self.novaSelecao = function (p) {
        var selecao = new App.Selecao(p);
        self.selecoes.push(selecao);

        return self;
    };
};

App.Componente = function () {
    var self = this;

    self.filtros = [];

    self.recuperarSelecoes = function () {
        return ko.toJSON(self.selecoes);
    };

    self.novaSelecao = function (p) {
        var selecao = new App.Selecao({ campo: p, valor: "teste" });
        self.filtros.push(selecao);
    }
};

App.criarComponente = function (requisicao) {
    var componente = new App.Componente();

    requisicao.filtros.forEach(function (filtro) {
        componente.novaSelecao(filtro);
    });

    return componente;
};