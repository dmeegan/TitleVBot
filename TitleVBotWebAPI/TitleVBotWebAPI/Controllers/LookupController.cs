using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TitleVBotWebAPI.LookupModels;
using TitleVBotWebAPI.Models;
using DapperParameters;
using Microsoft.AspNetCore.Cors;

namespace TitleVBotWebAPI.Controllers
{
    [ApiController]
    public class LookupController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public LookupController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [Route("api/[controller]/uses")]
        [HttpGet]
        public JsonResult GetUses()
        {
            string proc = "dbo.PLookupUses";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var data = connection.Query<Use>(proc, null, commandType: CommandType.StoredProcedure).AsEnumerable().ToList();

            return new JsonResult(new {data});

        } 
        
        [Route("api/[controller]/uses/insert")]
        [HttpPost]
        public void InsertUses([FromBody] InsertUsesParams insertUsesParams)
        {
            string proc = "dbo.PUseInsert";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var queryParameters = new DynamicParameters();
            if(insertUsesParams.uses.Count > 0 && insertUsesParams.uses != null)
            {
                queryParameters.AddTable("@Uses", "T_Use", insertUsesParams.uses);
            }

            connection.Query(proc, queryParameters, commandType: CommandType.StoredProcedure);

        }
    }
}
