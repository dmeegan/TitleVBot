using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using TitleVBotWebAPI.Models;

namespace TitleVBotWebAPI.Controllers
{
    [Route("api/[controller]/{userId}")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult GetUserInfo(int userId)
        {
            string proc = "dbo.PGetUserInfo";

            string sqlDataSource = _configuration.GetConnectionString("TitleVBotCon");
            using var connection = new SqlConnection(sqlDataSource);

            var queryParamaters = new DynamicParameters();
            queryParamaters.Add("@UserId", userId);

            var user = connection.Query<User>(proc, queryParamaters, commandType: CommandType.StoredProcedure).FirstOrDefault();

            return new JsonResult(user);

        }
    }
}
