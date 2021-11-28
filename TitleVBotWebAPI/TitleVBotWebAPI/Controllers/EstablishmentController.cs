using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using DapperParameters;
using TitleVBotWebAPI.EstablishmentModels;
using Microsoft.AspNetCore.Cors;

namespace TitleVBotWebAPI.Controllers
{
    [ApiController]
    public class EstablishmentController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public EstablishmentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]/list")]
        [HttpGet]
        public JsonResult GetEstablishmentTypes()
        {
            string proc = "dbo.PEstablishmentTypeLookup";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var data = connection.Query<Establishment>(proc, null, commandType: CommandType.StoredProcedure).AsEnumerable().ToList();

            return new JsonResult(new { data });

        }

        [Route("api/[controller]/insert")]
        [HttpPost]
        public void InsertEstablishments([FromBody] InsertEstablishmentsParams insertEstablishmentsParams)
        {
            string proc = "dbo.PEstablishmentInsert";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var queryParameters = new DynamicParameters();
            if(insertEstablishmentsParams.Establishments.Count > 0 && insertEstablishmentsParams.Establishments != null)
            {
                queryParameters.AddTable("@Establishments", "T_Establishment", insertEstablishmentsParams.Establishments);
            }

            connection.Query(proc, queryParameters, commandType: CommandType.StoredProcedure);

        }
    }
}
