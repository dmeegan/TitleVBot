namespace TitleVBotWebAPI.UserModels
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName { get; set; } = "";

        public DateTime CreatedOn { get; set; }
    }
}
