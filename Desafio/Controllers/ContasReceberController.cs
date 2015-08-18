using Desafio.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Desafio.Controllers
{
    public class ContasReceberController : ApiController
    {
        // GET api/contasReceber
        public IEnumerable<ContasReceber> Get()
        {
            IList<ContasReceber> listaContas = new List<ContasReceber>();

            for (int i = 0; i < 20; i++)
            {
                var conta = new ContasReceber
                {
                    Codigo = i,
                    DataPagamento = DateTime.Now.AddMonths(1),
                    NomeCentroCusto = "NomeCentroCusto" + i,
                    NomeCliente = "NomeCentroCusto" + i,
                    NomeRazaoSocial = "NomeCentroCusto" + i,
                    NomeUnidadeNegocio = "NomeCentroCusto" + i,
                    NumeroRPS = i,
                    Valor = 100 * i
                };
                listaContas.Add(conta);
            }

            return listaContas;
        }

        // GET api/contasReceber/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/contasReceber
        public void Post([FromBody]string value)
        {
        }

        // PUT api/contasReceber/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/contasReceber/5
        public void Delete(int id)
        {
        }
    }
}
