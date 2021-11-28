namespace TitleVBotWebAPI.EstablishmentModels
{
    public class Establishment
    {
        public int EstablishmentTypeId { get; set; }
        public string Description { get; set; } = "";

    }

    public class InsertEstablishmentsParams
    {
        public List<Establishment> Establishments { get; set; }
    }
}
