using Dapper;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TitleVBotWebAPI.UseModels;
using DapperParameters;

namespace TitleVBotWebAPI.Controllers
{
    [ApiController]
    public class UseController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UseController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]/list")]
        [HttpGet]
        public JsonResult GetUses()
        {
            string proc = "dbo.PUseLookup";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var data = connection.Query<Use>(proc, null, commandType: CommandType.StoredProcedure).AsEnumerable().ToList();

            return new JsonResult(new {data});

        }


        [Route("api/[controller]/insert")]
        [HttpPost]
        public void InsertUses([FromBody] InsertUsesParams insertUsesParams)
        {
            string proc = "dbo.PUseInsert";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var queryParameters = new DynamicParameters();
            if (insertUsesParams.uses.Count > 0 && insertUsesParams.uses != null)
            {
                queryParameters.AddTable("@Uses", "T_Use", insertUsesParams.uses);
            }

            connection.Query(proc, queryParameters, commandType: CommandType.StoredProcedure);

        }

    }
}
