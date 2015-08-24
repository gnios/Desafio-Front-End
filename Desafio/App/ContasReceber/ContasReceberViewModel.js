function ContasReceber(contasReceber) {
    var self = this;
    self.codigo = ko.observable(contasReceber.Codigo || '');
    self.numeroRPS = ko.observable(contasReceber.NumeroRPS || '');
    self.nomeCliente = ko.observable(contasReceber.NomeCliente || '');
    self.nomeRazaoSocial = ko.observable(contasReceber.NomeRazaoSocial || '');
    self.nomeUnidadeNegocio = ko.observable(contasReceber.NomeUnidadeNegocio || '');
    self.nomeCentroCusto = ko.observable(contasReceber.NomeCentroCusto || '');
    self.dataPagamento = ko.observable(contasReceber.DataPagamento || '');
    self.valor = ko.observable(contasReceber.Valor || '');

}


function ContasReceberViewModel() {
    var self = this;
    var baseUri = "/api/ContasReceber";
    self.contasReceber = ko.observableArray();

    self.listar = function () {
        self.contasReceber.removeAll();

        $.getJSON(baseUri, function (contas) {
            $.each(contas, function (key, conta) {
                self.contasReceber.push(new ContasReceber(conta));
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

    self.requisicao.novoFiltro({
        nome: "Nome1",
        tipo: Filtro.Tipos.CARACTERES,
        valoresIniciais: ["TESTE 1", "TESTE 2", "TESTE 2", "TESTE 2", "TESTE 2", "TESTE 2", "TESTE 2"]
    });

    self.requisicao.novoFiltro({
        nome: "Periodo",
        tipo: Filtro.Tipos.PERIODO,
        valoresIniciais: "Teste 3"
    });
}

$(document).ready(function () {
    var viewModel = new ContasReceberViewModel();
    ko.applyBindings(viewModel);
    viewModel.listar();
})
