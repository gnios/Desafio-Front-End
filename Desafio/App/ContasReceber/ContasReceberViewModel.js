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
            $.each(allData, function (key, ContasReceber) {
                self.ContasReceber.push(new ContasReceber(ContasReceber));
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

    //self.excluir = function (ContasReceber) {
    //    $.ajax({
    //        url: baseUri + ContasReceber.Id(),
    //        type: 'delete',
    //        contentType: 'application/json',
    //        success: function () {
    //            self.students.remove(ContasReceber);
    //        }
    //    });
    //};

    //self.incluir = function (formElement) {
    //    $.post(baseUri, $(formElement).serialize(), null, "json")
    //        .done(function (ContasReceber) {
    //            self.ContasReceber.push(ContasReceber);
    //        });
    //}
}

$(document).ready(function () {
    var viewModel = new ContasReceberViewModel();
    ko.applyBindings(viewModel);
    viewModel.listar();
})
