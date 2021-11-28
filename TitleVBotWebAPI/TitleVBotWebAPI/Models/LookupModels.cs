namespace TitleVBotWebAPI.LookupModels
{
    public class Use
    {
        public int useId { get; set; }
        public int establishmentTypeId { get; set; }
        public string description { get; set; }
        public int primaryFlowRate { get; set; }
        public int? secondaryFlowRate { get; set; }
        public string primaryUnit { get; set; }
        public string? secondaryUnit { get; set; }
        public int? minDesignFlow { get; set; }

    }

    public class InsertUsesParams
    {
        public List<Use> uses { get; set; }
    }
}
