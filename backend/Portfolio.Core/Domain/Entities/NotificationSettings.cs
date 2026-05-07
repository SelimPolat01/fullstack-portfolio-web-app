namespace Portfolio.Core.Domain.Entities
{
    public class NotificationSettings
    {
        public int Id { get; set; }
        public Guid UserId { get; set; }
        public bool NewMessageAlerts { get; set; }
        public bool LoginAlerts { get; set; }
        public bool DailyDigest { get; set; }
    }
}
