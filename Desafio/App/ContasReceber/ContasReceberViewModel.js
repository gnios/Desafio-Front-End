function ContasReceber(contasReceber) {
    var self = this;
    self.codigo = ko.observable(contasReceber.codigo || '');
    self.numeroRPS = ko.observable(contasReceber.numeroRPS || '');
    self.nomeCliente = ko.observable(contasReceber.nomeCliente || '');
    self.nomeRazaoSocial = ko.observable(contasReceber.nomeRazaoSocial || '');
    self.nomeUnidadeNegocio = ko.observable(contasReceber.nomeUnidadeNegocio || '');
    self.nomeCentroCusto = ko.observable(contasReceber.nomeCentroCusto || '');
    self.dataPagamento = ko.observable(contasReceber.dataPagamento || '');
    self.valor = ko.observable(contasReceber.valor || '');

}


function ContasReceberViewModel() {
    var self = this;
    var baseUri = "/api/ContasReceber";
    self.ContasReceber = ko.observableArray([]);

    self.listar = function () {
        self.ContasReceber.removeAll();

        $.getJSON(baseUri, function (allData) {
            $.each(allData, function (key, contasReceber) {
                self.ContasReceber.push(new ContasReceber(contasReceber));
            });
        });
    };

    self.filtrar = function (contasReceber) {
        $.ajax({
            url: baseUri + contasReceber.Id(),
            type: 'delete',
            contentType: 'application/json',
            success: function () {
                self.students.remove(contasReceber);
            }
        });
    };

    self.requisicao = new App.Requisicao();

    self.requisicao.novoFiltro({ nome: "Nome1", tipo: Filtro.Tipos.CARACTERES, valoresIniciais: ["TESTE 1", "TESTE 2", "TESTE 2", "TESTE 2", "TESTE 2", "TESTE 2", "TESTE 2"] });
     //requisicao.novoFiltro({ nome: "Nome2", valoresIniciais: ["TESTE 3", "TESTE 4"] });
    self.requisicao.novoFiltro({ nome: "Periodo", tipo: Filtro.Tipos.PERIODO, valoresIniciais: "Teste 3" });
}

$(document).ready(function () {
    var viewModel = new ContasReceberViewModel();
    ko.applyBindings(viewModel);
    viewModel.listar();
})
