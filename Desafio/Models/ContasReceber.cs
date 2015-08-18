using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Desafio.Models
{
    public class ContasReceber
    {
        public int Codigo { get; set; }
        public int NumeroRPS { get; set; }
        public string NomeCliente { get; set; }
        public string NomeRazaoSocial { get; set; }
        public string NomeUnidadeNegocio { get; set; }
        public string NomeCentroCusto { get; set; }
        public DateTime DataPagamento { get; set; }
        public decimal Valor { get; set; }

    }
}